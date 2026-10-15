import React, { useState } from 'react';
import { MapPin, Navigation, X, Check, AlertCircle, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PLATEAU_STATE, requestBrowserLocation } from '../../services/locationService';

interface LocationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelected?: (stateName: string, lga?: string) => void;
}

export const LocationRequestModal: React.FC<LocationRequestModalProps> = ({
  isOpen,
  onClose,
  onLocationSelected
}) => {
  const { activeLga, setActiveState, setUserLocation, user, setUser } = useAppStore();
  const [isDetecting, setIsDetecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const [selectedLga, setSelectedLga] = useState<string>(() =>
    PLATEAU_STATE.lgas.includes(activeLga || '') ? activeLga || '' : ''
  );

  if (!isOpen) return null;

  const handleAutoDetectGPS = async () => {
    setIsDetecting(true);
    setErrorMsg(null);
    setSuccessInfo(null);

    try {
      const result = await requestBrowserLocation();
      setUserLocation(result);
      const lga = selectedLga;
      setActiveState(PLATEAU_STATE.state, lga);

      if (user) {
        setUser({
          ...user,
          farmState: PLATEAU_STATE.state,
          farmLga: lga
        });
      }

      setSuccessInfo('GPS coordinates captured. Choose the Plateau LGA that contains your farm.');

      if (onLocationSelected) {
        onLocationSelected(PLATEAU_STATE.state, lga);
      }
    } catch (err: unknown) {
      console.warn('Geolocation detection error:', err);
      setErrorMsg('Could not detect GPS coordinates automatically. Please select your LGA below.');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleConfirmManual = () => {
    if (!selectedLga) return;
    setActiveState(PLATEAU_STATE.state, selectedLga);

    if (user) {
      setUser({
        ...user,
        farmState: PLATEAU_STATE.state,
        farmLga: selectedLga
      });
    }

    if (onLocationSelected) {
      onLocationSelected(PLATEAU_STATE.state, selectedLga);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#132E1E]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#D5EEDC] p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7EE] text-[#132E1E] flex items-center justify-center border border-[#D5EEDC]">
              <MapPin className="w-6 h-6 text-[#2D6A4F]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#132E1E] font-serif">
                Select Your Farm Location
              </h3>
              <p className="text-xs text-[#526056]">
                Plateau State weather & pest warnings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Auto Detect Button (Golden Button matching Figma) */}
        <button
          type="button"
          disabled={isDetecting}
          onClick={handleAutoDetectGPS}
          className="w-full btn-golden py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold shadow-md cursor-pointer hover:bg-[#E59828] active:scale-[0.99] transition"
        >
          {isDetecting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#161513] border-t-transparent rounded-full animate-spin" />
              <span>Detecting GPS Coordinates...</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 text-[#161513]" />
              <span>Use My Current Farm Location (GPS)</span>
            </>
          )}
        </button>

        {successInfo && (
          <div className="p-3 rounded-2xl bg-[#EAF7EE] border border-[#BDE3C8] text-xs font-semibold text-[#1B4332] flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-[#2D6A4F] shrink-0" />
            <span>{successInfo}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="relative flex items-center justify-center">
          <div className="border-t border-stone-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold text-stone-400 uppercase tracking-wider absolute">
            Plateau State
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 rounded-xl bg-[#EAF7EE] px-3 py-2.5 text-xs font-bold text-[#132E1E]">
            <MapPin className="w-4 h-4 text-[#2D6A4F]" />
            <span>Plateau State</span>
          </div>
          <div className="space-y-1 pt-1">
            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Local Government Area (LGA)
            </label>
            <select
              value={selectedLga}
              onChange={(e) => setSelectedLga(e.target.value)}
              className="w-full p-2.5 bg-[#F4FAF5] rounded-xl border border-[#D5EEDC] text-xs text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            >
              <option value="" disabled>Select LGA</option>
              {PLATEAU_STATE.lgas.map((lga) => (
                <option key={lga} value={lga}>{lga}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Benefits notice */}
        <div className="p-3 bg-[#EAF7EE] rounded-2xl border border-[#D5EEDC] text-xs text-[#1B4332] space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#EFA131]" />
            <span>Why NomaAi requests location:</span>
          </div>
          <p className="text-[11px] text-[#2D6A4F] leading-relaxed">
            Advice is tailored to Plateau State crops and conditions. Select your LGA to localize your farm profile.
          </p>
        </div>

        {/* Modal actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmManual}
            disabled={!selectedLga}
            className="flex-1 btn-golden py-3 px-4 rounded-xl text-xs font-bold cursor-pointer"
          >
            Save Location
          </button>
        </div>
      </div>
    </div>
  );
};
