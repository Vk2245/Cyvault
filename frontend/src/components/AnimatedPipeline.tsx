"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, LucideIcon, ShieldAlert, Zap } from "lucide-react";

export type PipelineStage = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
};

interface AnimatedPipelineProps {
  stages: PipelineStage[];
  progress: number; // 0 to 100
}

export default function AnimatedPipeline({ stages, progress }: AnimatedPipelineProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Calculate active stages
  const totalStages = stages.length;
  const activeStagesCount = Math.floor((progress / 100) * totalStages) + 1;

  return (
    <div className="w-full py-8 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[600px] px-8 relative">
        {stages.map((stage, i) => {
          const isActive = i < activeStagesCount;
          const isNextActive = i + 1 < activeStagesCount;
          const nextStage = stages[i + 1];

          // Compute colors dynamically for Tailwind inline styles
          const activeBg = `${stage.color}15`; // 15% opacity hex
          const activeShadow = `0 0 20px ${stage.color}40`; // Glow
          const activeBorder = stage.color;

          return (
            <React.Fragment key={stage.id}>
              {/* The Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.5, type: "spring" }}
                className="relative flex flex-col items-center justify-center z-10"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 ${
                    isActive ? "border-2" : "border border-white/10 bg-transparent"
                  }`}
                  style={{
                    backgroundColor: isActive ? activeBg : "transparent",
                    borderColor: isActive ? activeBorder : "rgba(255, 255, 255, 0.1)",
                    boxShadow: isActive ? activeShadow : "none",
                  }}
                >
                  <stage.icon
                    size={24}
                    style={{ color: isActive ? stage.color : "rgba(255,255,255,0.4)" }}
                  />
                </div>
                <span
                  className={`absolute -bottom-8 whitespace-nowrap text-xs font-label-mono tracking-widest uppercase transition-colors duration-500 ${
                    isActive ? "text-white" : "text-white/40"
                  }`}
                >
                  {stage.label}
                </span>
              </motion.div>

              {/* The Connecting Edge (Line) */}
              {i < stages.length - 1 && (
                <div className="flex-grow h-[2px] mx-4 relative overflow-hidden bg-white/5 rounded-full">
                  <motion.div
                    className="absolute inset-0 h-full w-full"
                    initial={{ x: "-100%" }}
                    animate={{ x: isNextActive ? "0%" : "-100%" }}
                    transition={{
                      delay: i * 0.15 + 0.2, // starts after node appears
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: `linear-gradient(90deg, transparent, ${stage.color}80, ${nextStage.color})`,
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
