import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Download, RefreshCcw } from "lucide-react";
import { FilterType, StripStyle } from "./CameraScreen";

interface ResultScreenProps {
  images: string[];
  filter: FilterType;
  stripStyle: StripStyle;
  onRetake: () => void;
}

export const ResultScreen = ({ images, filter, stripStyle, onRetake }: ResultScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loadImages = async () => {
        const loadedImages = await Promise.all(
            images.map(src => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            })
        );
        return loadedImages;
    };

    loadImages().then(imgs => {
        if (imgs.length === 0) return;

        // Settings for the strip - scaled for web display
        const photoWidth = 400; // Smaller for better web performance
        const aspectRatio = imgs[0].height / imgs[0].width;
        const photoHeight = photoWidth * aspectRatio;
        
        const padding = 24; 
        const topHeaderHeight = 0;
        const bottomFooterHeight = 140; // Smaller footer for web
        
        const stripWidth = photoWidth + (padding * 2);
        const stripHeight = (padding * 5) + (photoHeight * 4) + bottomFooterHeight + topHeaderHeight;

        canvas.width = stripWidth;
        canvas.height = stripHeight;

        // Fill background based on style
        if (stripStyle === "black") {
            ctx.fillStyle = "#1a1a1a";
        } else if (stripStyle === "gray") {
            ctx.fillStyle = "#e5e7eb";
        } else {
            ctx.fillStyle = "#fdfdfd";
        }
        ctx.fillRect(0, 0, stripWidth, stripHeight);

        // Draw Filter Logic
        let filterString = "none";
        switch (filter) {
            case "grayscale": filterString = "grayscale(100%)"; break;
            case "sepia": filterString = "sepia(0.5) contrast(1.1)"; break;
            case "soft": filterString = "contrast(0.95) brightness(1.05) saturate(1.1)"; break;
            case "vintage": filterString = "sepia(0.3) contrast(1.1) brightness(0.9) hue-rotate(-5deg)"; break;
        }
        ctx.filter = filterString;

        // Draw each photo
        imgs.forEach((img, index) => {
            const y = padding + topHeaderHeight + (index * (photoHeight + padding));
            ctx.drawImage(img, padding, y, photoWidth, photoHeight);
        });

        // Reset filter
        ctx.filter = "none";

        // Draw Typography
        ctx.textAlign = "center";
        
        const textColor = stripStyle === "black" ? "#ffffff" : "#1a1a1a";
        const metaColor = stripStyle === "black" ? "#888888" : "#666666";
        const lineColor = stripStyle === "black" ? "#333333" : "#e5e5e5";

        // "PHOTO BOOTH" Title
        ctx.font = "700 24px 'Courier New', monospace"; 
        ctx.fillStyle = textColor;
        ctx.letterSpacing = "4px";
        const footerStartY = stripHeight - bottomFooterHeight + 30;
        
        ctx.fillText("HAPPY VALENTINE'S DAY 💌", stripWidth / 2, footerStartY);
        
        ctx.font = "400 10px 'Courier New', monospace";
        ctx.fillStyle = metaColor;
        ctx.fillText("© waveeeh", stripWidth / 2, footerStartY + 70);

        // Date
        const date = new Date();
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        ctx.font = "400 16px 'Courier New', monospace";
        ctx.fillStyle = metaColor;
        ctx.letterSpacing = "2px";
        ctx.fillText(`${dateStr} • ${timeStr}`, stripWidth / 2, footerStartY + 30);

        // Decorative line
        const lineY = footerStartY + 50;
        ctx.beginPath();
        ctx.moveTo(stripWidth/2 - 40, lineY);
        ctx.lineTo(stripWidth/2 + 40, lineY);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        try {
            const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
            setDownloadUrl(dataUrl);
        } catch (e) {
            console.error("Canvas export failed", e);
        }
    });

  }, [images, filter, stripStyle]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {/* Main Content - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col items-center px-4 py-6 md:py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 font-['Poppins']">
                Your Photostrip
            </h2>

            {/* The Result Display - Responsive sizing */}
            <div className="relative shadow-xl mb-6 transform transition-transform duration-300">
                {downloadUrl ? (
                    <img 
                        src={downloadUrl} 
                        alt="Photostrip" 
                        className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] h-auto rounded-sm shadow-lg" 
                    />
                ) : (
                    <div className="w-[240px] sm:w-[280px] md:w-[320px] h-[600px] sm:h-[700px] md:h-[800px] bg-gray-100 animate-pulse rounded-sm flex items-center justify-center text-gray-400 text-sm">
                        Generating your strip...
                    </div>
                )}
            </div>

            {/* Filter & Style Info
            <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-gray-500 mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                    Filter: {filter === "none" ? "Normal" : filter}
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                    Strip: {stripStyle}
                </span>
            </div> */}
          </motion.div>
        </div>
      </div>

      {/* Fixed Bottom Buttons - Always visible */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
        <div className="flex gap-3 justify-center items-center max-w-md mx-auto">
            <motion.button 
                whileTap={{ scale: 0.97 }}
                onClick={onRetake}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-full bg-gray-100 text-gray-700 text-sm sm:text-base font-medium hover:bg-gray-200 transition-colors"
            >
                <RefreshCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Retake</span>
            </motion.button>
            
            {!downloadUrl ? (
                <button disabled className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-8 py-3 rounded-full bg-gray-400 text-white text-sm sm:text-base font-medium cursor-not-allowed">
                     <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                     <span>Processing</span>
                </button>
            ) : (
                <motion.a 
                    whileTap={{ scale: 0.97 }}
                    href={downloadUrl}
                    download={`photobooth-${new Date().toISOString().slice(0,10)}.jpg`}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-8 py-3 rounded-full bg-gray-900 text-white text-sm sm:text-base font-medium hover:bg-black transition-colors shadow-md"
                >
                    <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span>Download</span>
                </motion.a>
            )}
        </div>
      </div>

      {/* Hidden Canvas for Processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};