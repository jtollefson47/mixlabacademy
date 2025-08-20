"use client";

import { Button } from '@/components/ui/button';
import type { Band } from '@/lib/eq/types';

interface ControlsProps {
  userBands: Band[];
  onBandsChange: (bands: Band[]) => void;
  onSubmit?: () => void;
}

export default function Controls({ userBands, onBandsChange, onSubmit }: ControlsProps) {
  const handleBandChange = (bandId: string, updates: Partial<Band>) => {
    const newBands = userBands.map(band => {
      const currentId = band.id ?? `user-${userBands.indexOf(band)}`;
      return currentId === bandId ? { ...band, ...updates } : band;
    });
    onBandsChange(newBands);
  };

  const handleSubmit = () => {
    onSubmit?.();
  };

  return (
    <div className="space-y-6">
      {/* EQ Band Controls */}
      <div className="grid gap-6">
        {userBands.map((band, index) => (
          <div key={band.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-lg">Band {index + 1}</h4>
              <div className="text-sm text-muted-foreground">
                {band.freq >= 1000 ? `${(band.freq/1000).toFixed(1)}kHz` : `${band.freq.toFixed(0)}Hz`} • 
                {band.gainDb > 0 ? '+' : ''}{band.gainDb.toFixed(1)}dB • 
                Q: {(band.q ?? 1.0).toFixed(1)}
              </div>
            </div>

            {/* Frequency Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Frequency</label>
                <span className="text-sm text-muted-foreground">
                  {band.freq >= 1000 ? `${(band.freq/1000).toFixed(1)}kHz` : `${band.freq.toFixed(0)}Hz`}
                </span>
              </div>
              <input
                type="range"
                min={Math.log10(20)}
                max={Math.log10(20000)}
                step="0.01"
                value={Math.log10(band.freq)}
                onChange={(e) => {
                  const logFreq = parseFloat(e.target.value);
                  const freq = Math.pow(10, logFreq);
                  handleBandChange(band.id ?? `user-${userBands.indexOf(band)}`, { freq });
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>20Hz</span>
                <span>1kHz</span>
                <span>20kHz</span>
              </div>
            </div>

            {/* Gain Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Gain</label>
                <span className="text-sm text-muted-foreground">
                  {band.gainDb > 0 ? '+' : ''}{band.gainDb.toFixed(1)}dB
                </span>
              </div>
              <input
                type="range"
                min="-12"
                max="12"
                step="0.1"
                value={band.gainDb}
                onChange={(e) => {
                  const gainDb = parseFloat(e.target.value);
                  handleBandChange(band.id ?? `user-${userBands.indexOf(band)}`, { gainDb });
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-12dB</span>
                <span>0dB</span>
                <span>+12dB</span>
              </div>
            </div>

            {/* Q Factor Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Q Factor</label>
                                      <span className="text-sm text-muted-foreground">
                        {(band.q ?? 1.0).toFixed(1)}
                      </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={band.q ?? 1.0}
                onChange={(e) => {
                  const q = parseFloat(e.target.value);
                  handleBandChange(band.id ?? `user-${userBands.indexOf(band)}`, { q });
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.1 (wide)</span>
                <span>1.0</span>
                <span>10.0 (narrow)</span>
              </div>
            </div>

            {/* EQ Type Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <select
                value={band.type ?? 'peak'}
                onChange={(e) => {
                  const type = e.target.value as Band['type'];
                  handleBandChange(band.id ?? `user-${userBands.indexOf(band)}`, { type });
                }}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="peak">Peak/Bell</option>
                <option value="highpass">High Pass</option>
                <option value="lowpass">Low Pass</option>
                <option value="highshelf">High Shelf</option>
                <option value="lowshelf">Low Shelf</option>
                <option value="notch">Notch</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {onSubmit && (
        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleSubmit}
            size="lg"
            className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
          >
            Check Score
          </Button>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1d4ed8;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1d4ed8;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider:focus {
          outline: none;
        }

        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}
