import type { Band, BandResult, EqScore } from './types';

/**
 * Score an EQ matching attempt with improved accuracy and efficiency
 * 
 * @param userBands - User's EQ settings
 * @param targetBands - Target EQ settings to match
 * @param tolDb - Tolerance in dB for perfect score (default: 3)
 * @param tolFreq - Frequency tolerance in Hz (default: 50) - only used for enhanced mode
 * @param tolQ - Q factor tolerance (default: 0.5) - only used for enhanced mode
 * @returns EqScore with total and per-band results
 */
export function scoreEqMatch(
  userBands: Band[], 
  targetBands: Band[], 
  tolDb: number = 3,
  tolFreq: number = 50,
  tolQ: number = 0.5
): EqScore {
  // Input validation
  if (!Array.isArray(userBands) || !Array.isArray(targetBands)) {
    throw new Error('Invalid input: userBands and targetBands must be arrays');
  }

  if (targetBands.length === 0) {
    return { total: 0, perBand: [] };
  }

  // Check if this is enhanced mode (with Q and frequency matching) or simple mode (gain only)
  const isEnhancedMode = targetBands.some(band => 
    band.q !== undefined || band.id !== undefined || band.type !== undefined
  );

  const perBand: BandResult[] = [];
  const penaltyPerDb = 10; // Points lost per dB outside tolerance
  
  if (isEnhancedMode) {
    // Enhanced mode: Match by frequency proximity with Q and type consideration
    for (const targetBand of targetBands) {
      const bestMatch = findBestFrequencyMatch(userBands, targetBand, tolFreq);
      
      if (!bestMatch) {
        // No suitable match found
        perBand.push({
          id: targetBand.id,
          freq: targetBand.freq,
          deltaDb: NaN,
          deltaFreq: NaN,
          deltaQ: NaN,
          score: 0
        });
        continue;
      }

      // Calculate component scores
      const deltaDb = bestMatch.gainDb - targetBand.gainDb;
      const deltaFreq = bestMatch.freq - targetBand.freq;
      const deltaQ = (bestMatch.q ?? 1.0) - (targetBand.q ?? 1.0);
      
      const dbScore = calculateComponentScore(Math.abs(deltaDb), tolDb, penaltyPerDb);
      const freqScore = calculateComponentScore(Math.abs(deltaFreq), tolFreq, penaltyPerDb / 10);
      const qScore = calculateComponentScore(Math.abs(deltaQ), tolQ, penaltyPerDb * 10);
      
      // Weighted combination: 50% gain, 30% frequency, 20% Q
      const combinedScore = dbScore * 0.5 + freqScore * 0.3 + qScore * 0.2;
      
      perBand.push({
        id: targetBand.id,
        freq: targetBand.freq,
        deltaDb,
        deltaFreq,
        deltaQ,
        score: Math.round(Math.max(0, Math.min(100, combinedScore)))
      });
    }
  } else {
    // Simple mode: Direct frequency matching for backwards compatibility
    for (const targetBand of targetBands) {
      const matchingBand = userBands.find(band => band.freq === targetBand.freq);
      
      if (!matchingBand) {
        perBand.push({
          freq: targetBand.freq,
          deltaDb: NaN,
          score: 0
        });
        continue;
      }

      const deltaDb = matchingBand.gainDb - targetBand.gainDb;
      const score = calculateComponentScore(Math.abs(deltaDb), tolDb, penaltyPerDb);
      
      perBand.push({
        freq: targetBand.freq,
        deltaDb,
        score: Math.round(Math.max(0, Math.min(100, score)))
      });
    }
  }
  
  // Calculate total as average, handling edge cases
  const totalScore = perBand.length > 0 
    ? perBand.reduce((sum, band) => sum + band.score, 0) / perBand.length
    : 0;
  
  return {
    total: Math.round(Math.max(0, Math.min(100, totalScore))),
    perBand
  };
}

/**
 * Find the best matching band by frequency proximity
 * @param userBands - Available user bands
 * @param targetBand - Target band to match
 * @param maxFreqDiff - Maximum allowed frequency difference
 * @returns Best matching band or null if none found within tolerance
 */
function findBestFrequencyMatch(
  userBands: Band[], 
  targetBand: Band, 
  maxFreqDiff: number
): Band | null {
  let bestMatch: Band | null = null;
  let minFreqDiff = Infinity;
  
  for (const userBand of userBands) {
    const freqDiff = Math.abs(userBand.freq - targetBand.freq);
    if (freqDiff < minFreqDiff && freqDiff <= maxFreqDiff * 3) {
      minFreqDiff = freqDiff;
      bestMatch = userBand;
    }
  }
  
  return bestMatch;
}

/**
 * Calculate component score with linear penalty outside tolerance
 * @param error - Absolute error value
 * @param tolerance - Tolerance threshold
 * @param penaltyRate - Points lost per unit outside tolerance
 * @returns Score from 0 to 100
 */
function calculateComponentScore(
  error: number, 
  tolerance: number, 
  penaltyRate: number
): number {
  if (error <= tolerance) {
    return 100; // Perfect score within tolerance
  }
  
  const excessError = error - tolerance;
  return Math.max(0, 100 - penaltyRate * excessError);
}
