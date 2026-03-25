import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { routines } from "@/data/routines";
import { evocationVerses, psalm95, psalm103, lordsPrayer } from "@/data/verses";
import { psalms } from "@/data/psalms";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

const parseDuration = (durationStr: string) => {
  const match = durationStr.match(/(\d+)(?:-(\d+))?분/);
  if (match) {
    const min = parseInt(match[1], 10);
    const max = match[2] ? parseInt(match[2], 10) : min;
    const avg = (min + max) / 2;
    return avg * 60;
  }
  return 15 * 60;
};

const Timer = ({ totalSeconds }: { totalSeconds: number }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min((elapsed / totalSeconds) * 100, 100);
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="w-full h-1 bg-ink/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-ink/20"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>
      <div className="text-xs text-ink/40 font-mono tracking-widest">
        {formatTime(elapsed)}
      </div>
    </div>
  );
};

export default function PrayerRoutine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const routine = routines.find((r) => r.id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [randomVerse, setRandomVerse] = useState(evocationVerses[0]);
  const [selectedPsalmChapter, setSelectedPsalmChapter] = useState<number | null>(null);

  useEffect(() => {
    setRandomVerse(evocationVerses[Math.floor(Math.random() * evocationVerses.length)]);
  }, []);

  if (!routine) {
    return <div>Routine not found</div>;
  }

  const step = routine.steps[currentStep];
  const isLastStep = currentStep === routine.steps.length - 1;

  const nextStep = () => {
    if (isLastStep) {
      navigate("/");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/");
    }
  };

  const handleRandomPsalm = () => {
    const randomIndex = Math.floor(Math.random() * psalms.length);
    setSelectedPsalmChapter(psalms[randomIndex].chapter);
  };

  const renderContent = () => {
    if (step.type === 'evocation') {
      return (
        <div className="mt-8 p-6 bg-white rounded-3xl shadow-sm border border-ink/5">
          <p className="font-serif text-lg leading-relaxed mb-4">{randomVerse.text}</p>
          <p className="text-sm text-accent text-right">- {randomVerse.reference}</p>
        </div>
      );
    }

    if (step.type === 'meditation' && step.questions) {
      if (routine.id === 'morning' && step.id === 'm2') {
        return (
          <div className="mt-8 flex flex-col gap-6">
            <div className="space-y-4">
              {step.questions.map((q, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-ink/5">
                  <p className="text-sm leading-relaxed">{q}</p>
                </div>
              ))}
            </div>
            <div className="p-6 bg-white rounded-3xl shadow-sm border border-ink/5 max-h-[50vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg">{psalm95.reference}</h3>
                <span className="text-xs text-ink/40 bg-ink/5 px-2 py-1 rounded-full">추천 본문</span>
              </div>
              <div className="space-y-2">
                {psalm95.text.split('\n').map((line, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink/80">{line}</p>
                ))}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="mt-8 space-y-4">
          {step.questions.map((q, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-ink/5">
              <p className="text-sm leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      );
    }

    if (step.type === 'meditation' && routine.id === 'evening' && step.id === 'e2') {
      const selectedPsalm = psalms.find(p => p.chapter === selectedPsalmChapter);
      
      return (
        <div className="mt-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={handleRandomPsalm}
              className="shrink-0 px-4 py-2 rounded-full border border-ink/10 text-sm hover:bg-ink/5 transition-colors"
            >
              랜덤 시편
            </button>
            <select
              value={selectedPsalmChapter}
              onChange={(e) => setSelectedPsalmChapter(Number(e.target.value))}
              className="px-4 py-2 rounded-full border border-ink/10 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ink/20"
            >
              {psalms.map(p => (
                <option key={p.chapter} value={p.chapter}>
                  시편 {p.chapter}편
                </option>
              ))}
            </select>
          </div>
          
          {selectedPsalm ? (
            <div className="p-6 bg-white rounded-3xl shadow-sm border border-ink/5 flex-1 overflow-y-auto max-h-[50vh]">
              <h3 className="font-serif text-lg mb-4">시편 {selectedPsalm.chapter}편</h3>
              <div className="space-y-2">
                {selectedPsalm.text.split('\n').map((line, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink/80">{line}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-12 border border-dashed border-ink/20 rounded-3xl text-ink/40 text-sm">
              위에서 읽고 묵상할 시편을 선택해주세요.
            </div>
          )}
        </div>
      );
    }

    if (step.type === 'word-prayer' && routine.id === 'midday' && step.id === 'd2') {
      return (
        <div className="mt-8 p-6 bg-white rounded-3xl shadow-sm border border-ink/5 max-h-[50vh] overflow-y-auto">
          <h3 className="font-serif text-lg mb-4">{lordsPrayer.reference}</h3>
          <div className="space-y-2">
            {lordsPrayer.text.split('\n').map((line, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink/80">{line}</p>
            ))}
          </div>
        </div>
      );
    }

    if (step.type === 'self-check' && step.questions) {
      return (
        <div className="mt-8 space-y-4">
          {step.questions.map((q, i) => (
            <div key={i} className="p-4 bg-white rounded-2xl shadow-sm border border-ink/5">
              <p className="text-sm leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      );
    }

    if (step.type === 'reading') {
      const reading = routine.id === 'midday' ? psalm103 : psalm95;
      return (
        <div className="mt-8 p-6 bg-white rounded-3xl shadow-sm border border-ink/5 max-h-[50vh] overflow-y-auto">
          <h3 className="font-serif text-lg mb-4">{reading.reference}</h3>
          <div className="space-y-2">
            {reading.text.split('\n').map((line, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink/80">{line}</p>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <Timer totalSeconds={parseDuration(routine.duration)} />
      
      <div className="flex items-center justify-between mb-8">
        <button onClick={prevStep} className="p-2 -ml-2 text-ink/60 hover:text-ink transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-1.5">
          {routine.steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-ink' : i < currentStep ? 'w-1.5 bg-ink/40' : 'w-1.5 bg-ink/10'}`}
            />
          ))}
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1 flex flex-col"
        >
          <div className="mb-2">
            <span className="text-xs font-semibold tracking-widest text-accent uppercase">
              Step {currentStep + 1}
            </span>
          </div>
          <h2 className="text-3xl font-serif font-medium mb-4">{step.title}</h2>
          <p className="text-ink-light leading-relaxed">{step.description}</p>
          
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 pt-6 border-t border-ink/5">
        <Button 
          onClick={nextStep} 
          className="w-full h-14 text-base rounded-2xl"
        >
          {isLastStep ? (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" /> 기도 마치기
            </span>
          ) : (
            <span className="flex items-center gap-2">
              다음 단계 <ChevronRight className="w-5 h-5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
