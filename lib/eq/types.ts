/**
 * EQ Match game type definitions
 */

/**
 * EQ Match game type definitions
 */

// Represents a single EQ band with frequency, gain, and Q factor
export type Band = {
  id?: string;     // Unique identifier for the band (optional for backwards compatibility)
  freq: number;    // Frequency in Hz (20 - 20000)
  gainDb: number;  // Gain in dB, typically -12 to +12
  q?: number;      // Q factor (0.1 - 10), controls bandwidth (optional, defaults to 1.0)
  type?: 'peak' | 'highpass' | 'lowpass' | 'highshelf' | 'lowshelf' | 'notch'; // EQ type (optional, defaults to 'peak')
};

// Result for a single band comparison
export type BandResult = {
  id?: string;      // Band identifier (optional)
  freq: number;     // Frequency in Hz
  deltaDb: number;  // Difference between user and target (NaN if missing)
  deltaFreq?: number; // Frequency difference in Hz (optional for backwards compatibility)
  deltaQ?: number;   // Q factor difference (optional for backwards compatibility)
  score: number;    // Score for this band (0-100)
};

// Overall EQ matching score
export type EqScore = {
  total: number;           // Total score (0-100), rounded to nearest integer
  perBand: BandResult[];   // Individual band results
};
