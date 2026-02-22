import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export type LayoutType = 2 | 3 | 4;

interface LayoutSelectionScreenProps {
  onContinue: (layout: LayoutType) => void;
  onBack: () => void;
}

export const LayoutSelectionScreen = ({ onContinue, onBack }: LayoutSelectionScreenProps) => {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>(4);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 py-8 sm:py-12 relative z-10">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 p-2 rounded-full bg-white/80 text-gray-700 shadow-sm hover:bg-white transition-colors z-20"
        aria-label="Go back"
      >
        <ChevronLeft size={window.innerWidth < 640 ? 20 : 24} />
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center w-full max-w-md px-2"
      >
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Choose Your Layout
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Select how many photos you'd like in your strip
          </p>
        </div>

        {/* Layout Options */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10 w-full">
          {/* 2 Strips */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLayout(2)}
            className={`group relative flex flex-col items-center p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl transition-all ${
              selectedLayout === 2 
                ? "bg-gray-900 text-white shadow-2xl scale-105" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg"
            }`}
          >
            <div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-3">
              <div className={`w-12 sm:w-14 md:w-16 h-8 sm:h-9 md:h-10 rounded-lg ${selectedLayout === 2 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
              <div className={`w-12 sm:w-14 md:w-16 h-8 sm:h-9 md:h-10 rounded-lg ${selectedLayout === 2 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
            </div>
            <span className="text-xs sm:text-sm md:text-base font-semibold">2 Photos</span>
            <span className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${selectedLayout === 2 ? "text-white/70" : "text-gray-500"}`}>
              Duo
            </span>
            {selectedLayout === 2 && (
              <motion.div
                layoutId="selected"
                className="absolute -inset-1 border-2 sm:border-4 border-pink-400 rounded-2xl sm:rounded-3xl"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </motion.button>

          {/* 3 Strips */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLayout(3)}
            className={`group relative flex flex-col items-center p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl transition-all ${
              selectedLayout === 3 
                ? "bg-gray-900 text-white shadow-2xl scale-105" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg"
            }`}
          >
            <div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-3">
              <div className={`w-12 sm:w-14 md:w-16 h-5 sm:h-6 md:h-7 rounded-lg ${selectedLayout === 3 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
              <div className={`w-12 sm:w-14 md:w-16 h-5 sm:h-6 md:h-7 rounded-lg ${selectedLayout === 3 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
              <div className={`w-12 sm:w-14 md:w-16 h-5 sm:h-6 md:h-7 rounded-lg ${selectedLayout === 3 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
            </div>
            <span className="text-xs sm:text-sm md:text-base font-semibold">3 Photos</span>
            <span className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${selectedLayout === 3 ? "text-white/70" : "text-gray-500"}`}>
              Trio
            </span>
            {selectedLayout === 3 && (
              <motion.div
                layoutId="selected"
                className="absolute -inset-1 border-2 sm:border-4 border-pink-400 rounded-2xl sm:rounded-3xl"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </motion.button>

          {/* 4 Strips */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedLayout(4)}
            className={`group relative flex flex-col items-center p-3 sm:p-4 md:p-6 rounded-2xl sm:rounded-3xl transition-all ${
              selectedLayout === 4 
                ? "bg-gray-900 text-white shadow-2xl scale-105" 
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-lg"
            }`}
          >
            <div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-3">
              <div className={`w-12 sm:w-14 md:w-16 h-4 sm:h-4 md:h-5 rounded-lg ${selectedLayout === 4 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
              <div className={`w-12 sm:w-14 md:w-16 h-4 sm:h-4 md:h-5 rounded-lg ${selectedLayout === 4 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
              <div className={`w-12 sm:w-14 md:w-16 h-4 sm:h-4 md:h-5 rounded-lg ${selectedLayout === 4 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
              <div className={`w-12 sm:w-14 md:w-16 h-4 sm:h-4 md:h-5 rounded-lg ${selectedLayout === 4 ? "bg-white/20" : "bg-gray-200"} transition-colors`} />
            </div>
            <span className="text-xs sm:text-sm md:text-base font-semibold">4 Photos</span>
            <span className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${selectedLayout === 4 ? "text-white/70" : "text-gray-500"}`}>
              Classic
            </span>
            {selectedLayout === 4 && (
              <motion.div
                layoutId="selected"
                className="absolute -inset-1 border-2 sm:border-4 border-pink-400 rounded-2xl sm:rounded-3xl"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </motion.button>
        </div>

        {/* Continue Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onContinue(selectedLayout)}
          className="w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gray-900 text-white text-sm sm:text-base font-semibold hover:bg-black transition-colors shadow-lg hover:shadow-xl"
        >
          Continue to Camera
          <ChevronRight size={window.innerWidth < 640 ? 16 : 20} />
        </motion.button>
      </motion.div>
    </div>
  );
};