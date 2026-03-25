import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { calvinPrayers } from "@/data/verses";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CalvinPrayers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const prayer = calvinPrayers[currentIndex];

  const nextPrayer = () => {
    if (currentIndex < calvinPrayers.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevPrayer = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate("/")} className="p-2 -ml-2 text-ink/60 hover:text-ink transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-serif text-sm tracking-widest uppercase text-accent">
          Calvin's Prayers
        </span>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-ink/5 relative"
          >
            <div className="absolute -top-4 -left-4 text-6xl text-paper font-serif opacity-50">"</div>
            <h2 className="text-2xl font-serif font-medium mb-6 text-center relative z-10">{prayer.title}</h2>
            <p className="text-ink/80 leading-loose text-justify relative z-10">
              {prayer.text}
            </p>
            <div className="absolute -bottom-8 -right-4 text-6xl text-paper font-serif opacity-50">"</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <button 
          onClick={prevPrayer}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-white shadow-sm border border-ink/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-paper transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {calvinPrayers.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-ink' : 'bg-ink/20'}`}
            />
          ))}
        </div>
        <button 
          onClick={nextPrayer}
          disabled={currentIndex === calvinPrayers.length - 1}
          className="p-3 rounded-full bg-white shadow-sm border border-ink/5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-paper transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
