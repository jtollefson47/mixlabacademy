import { describe, it, expect } from 'vitest';
import { scoreEqMatch } from '@/lib/eq/scoring';
import type { Band } from '@/lib/eq/types';

describe('scoreEqMatch', () => {
  const targetBands: Band[] = [
    { freq: 100, gainDb: 2 },
    { freq: 1000, gainDb: -3 },
    { freq: 8000, gainDb: 4 }
  ];

  it('should return perfect score for exact match', () => {
    const userBands: Band[] = [
      { freq: 100, gainDb: 2 },
      { freq: 1000, gainDb: -3 },
      { freq: 8000, gainDb: 4 }
    ];

    const result = scoreEqMatch(userBands, targetBands);

    expect(result.total).toBe(100);
    expect(result.perBand).toHaveLength(3);
    result.perBand.forEach(band => {
      expect(band.score).toBe(100);
      expect(band.deltaDb).toBe(0);
    });
  });

  it('should return 100 points for bands within tolerance (±3 dB)', () => {
    const userBands: Band[] = [
      { freq: 100, gainDb: 5 },    // +3 dB from target (2)
      { freq: 1000, gainDb: 0 },   // +3 dB from target (-3)
      { freq: 8000, gainDb: 1 }    // -3 dB from target (4)
    ];

    const result = scoreEqMatch(userBands, targetBands);

    expect(result.total).toBe(100);
    expect(result.perBand[0].score).toBe(100); // Within tolerance
    expect(result.perBand[1].score).toBe(100); // Within tolerance
    expect(result.perBand[2].score).toBe(100); // Within tolerance
  });

  it('should penalize bands outside tolerance with linear decay', () => {
    const userBands: Band[] = [
      { freq: 100, gainDb: 7 },    // 5 dB from target (2), 2 dB outside tolerance
      { freq: 1000, gainDb: -3 },  // Exact match
      { freq: 8000, gainDb: 4 }    // Exact match
    ];

    const result = scoreEqMatch(userBands, targetBands);

    // First band: 5 dB error, 2 dB outside tolerance -> 100 - 10*2 = 80
    expect(result.perBand[0].score).toBe(80);
    expect(result.perBand[1].score).toBe(100);
    expect(result.perBand[2].score).toBe(100);
    
    // Total: (80 + 100 + 100) / 3 = 93.33... -> 93
    expect(result.total).toBe(93);
  });

  it('should handle missing user bands with score 0 and NaN delta', () => {
    const userBands: Band[] = [
      { freq: 100, gainDb: 2 },    // Perfect match
      { freq: 1000, gainDb: -3 }   // Perfect match, missing 8000 Hz
      // Missing 8000 Hz band
    ];

    const result = scoreEqMatch(userBands, targetBands);

    expect(result.perBand).toHaveLength(3);
    expect(result.perBand[0].score).toBe(100);
    expect(result.perBand[1].score).toBe(100);
    expect(result.perBand[2].score).toBe(0);
    expect(result.perBand[2].freq).toBe(8000);
    expect(isNaN(result.perBand[2].deltaDb)).toBe(true);
    
    // Total: (100 + 100 + 0) / 3 = 66.67... -> 67
    expect(result.total).toBe(67);
  });

  it('should clamp scores to minimum 0', () => {
    const userBands: Band[] = [
      { freq: 100, gainDb: 15 },   // 13 dB from target (2), 10 dB outside tolerance
      { freq: 1000, gainDb: -3 },  // Perfect match
      { freq: 8000, gainDb: 4 }    // Perfect match
    ];

    const result = scoreEqMatch(userBands, targetBands);

    // First band: 13 dB error, 10 dB outside tolerance -> 100 - 10*10 = 0
    expect(result.perBand[0].score).toBe(0);
    expect(result.perBand[1].score).toBe(100);
    expect(result.perBand[2].score).toBe(100);
    
    // Total: (0 + 100 + 100) / 3 = 66.67... -> 67
    expect(result.total).toBe(67);
  });

  it('should handle custom tolerance parameter', () => {
    const userBands: Band[] = [
      { freq: 100, gainDb: 4 },    // 2 dB from target (2)
      { freq: 1000, gainDb: -1 },  // 2 dB from target (-3)
      { freq: 8000, gainDb: 6 }    // 2 dB from target (4)
    ];

    // With tolerance of 1 dB, all bands are 1 dB outside tolerance
    const result = scoreEqMatch(userBands, targetBands, 1);

    // Each band: 2 dB error, 1 dB outside tolerance -> 100 - 10*1 = 90
    expect(result.perBand[0].score).toBe(90);
    expect(result.perBand[1].score).toBe(90);
    expect(result.perBand[2].score).toBe(90);
    expect(result.total).toBe(90);
  });

  it('should handle empty user bands', () => {
    const userBands: Band[] = [];

    const result = scoreEqMatch(userBands, targetBands);

    expect(result.total).toBe(0);
    expect(result.perBand).toHaveLength(3);
    result.perBand.forEach(band => {
      expect(band.score).toBe(0);
      expect(isNaN(band.deltaDb)).toBe(true);
    });
  });

  it('should handle empty target bands', () => {
    const userBands: Band[] = [
      { freq: 100, gainDb: 2 }
    ];
    const emptyTargets: Band[] = [];

    const result = scoreEqMatch(userBands, emptyTargets);

    expect(result.total).toBe(0);
    expect(result.perBand).toHaveLength(0);
  });

  it('should round scores to nearest integer', () => {
    const userBands: Band[] = [
      { freq: 100, gainDb: 2.1 },  // 0.1 dB error, perfect score
      { freq: 1000, gainDb: -2.9 }, // 0.1 dB error, perfect score  
      { freq: 8000, gainDb: 8.5 }   // 4.5 dB error, 1.5 dB outside tolerance -> 85
    ];

    const result = scoreEqMatch(userBands, targetBands);

    expect(result.perBand[0].score).toBe(100);
    expect(result.perBand[1].score).toBe(100);
    expect(result.perBand[2].score).toBe(85); // 100 - 10*1.5 = 85
    
    // Total: (100 + 100 + 85) / 3 = 95
    expect(result.total).toBe(95);
  });
});
