import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { routines } from "@/data/routines";
import { Clock, BookMarked } from "lucide-react";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      <div className="space-y-3 mt-4">
        <h1 className="text-4xl font-serif font-medium leading-tight">
          매일 하나님과<br />깊어지는 시간
        </h1>
        <p className="text-ink-light text-sm leading-relaxed">
          팀 켈러의 기도를 따라, 하루의 시작과 끝을<br />
          하나님의 임재 안에서 머무르세요.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold tracking-widest text-accent uppercase mb-2">
          Daily Routines
        </h2>
        {routines.map((routine, i) => (
          <motion.div
            key={routine.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link to={`/routine/${routine.id}`}>
              <Card className="group hover:-translate-y-1 transition-transform duration-300">
                <CardHeader className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{routine.title}</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-accent bg-paper px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{routine.duration}</span>
                    </div>
                  </div>
                  <CardDescription>{routine.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: routines.length * 0.1 }}
          className="mt-4"
        >
          <h2 className="text-xs font-semibold tracking-widest text-accent uppercase mb-4">
            Classic Prayers
          </h2>
          <Link to="/calvin">
            <Card className="group hover:-translate-y-1 transition-transform duration-300 bg-paper/50 border-none">
              <CardHeader className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <BookMarked className="w-4 h-4 text-ink" />
                  </div>
                  <CardTitle className="text-lg">장 칼뱅의 기도</CardTitle>
                </div>
                <CardDescription>
                  종교개혁자 장 칼뱅이 제안하는 하루를 여닫는 본보기 기도문
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
