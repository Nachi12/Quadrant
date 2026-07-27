"use client";

import { useTaskStore, QuadrantId } from "@/store/useTaskStore";
import { Quadrant } from "@/components/Quadrant";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import { Target, Zap, Activity } from "lucide-react";

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore((state) => state.moveTask);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const overId = over.id as string;
      
      const task = tasks.find((t) => t.id === taskId);
      
      let newQuadrant: QuadrantId | null = null;
      if (['q1', 'q2', 'q3', 'q4'].includes(overId)) {
        newQuadrant = overId as QuadrantId;
      } else {
        const overTask = tasks.find((t) => t.id === overId);
        if (overTask) {
          newQuadrant = overTask.quadrant;
        }
      }

      if (newQuadrant && task && task.quadrant !== newQuadrant) {
        moveTask(taskId, newQuadrant);
      }
    }
  };

  const q1Tasks = tasks.filter((t) => t.quadrant === "q1");
  const q2Tasks = tasks.filter((t) => t.quadrant === "q2");
  const q3Tasks = tasks.filter((t) => t.quadrant === "q3");
  const q4Tasks = tasks.filter((t) => t.quadrant === "q4");

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-1 overflow-hidden flex flex-col p-4 md:p-6 gap-6">
        {/* Daily Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[20px] p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-black/60 font-medium mb-1">Productivity Score</p>
              <p className="text-2xl font-bold text-black">92<span className="text-sm text-black/40 ml-1">/ 100</span></p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#F95C4B]/10 flex items-center justify-center text-[#F95C4B]">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[20px] p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-black/60 font-medium mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-black">14<span className="text-sm text-black/40 ml-1">days</span></p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Zap className="w-6 h-6 fill-current" />
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[20px] p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-black/60 font-medium mb-1">Deep Work</p>
              <p className="text-2xl font-bold text-black">4<span className="text-sm text-black/40 ml-1">h</span> 30<span className="text-sm text-black/40 ml-1">m</span></p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Target className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-0 gap-4 md:gap-6">
          <Quadrant
            id="q1"
            title="IMPORTANT & URGENT"
            description="Immediate execution required."
            headerClass="border-t-[4px] border-t-[#F95C4B] bg-gradient-to-b from-[#F95C4B]/10 to-transparent"
            accentClass="bg-[#F95C4B]"
            tasks={q1Tasks}
          />
          <Quadrant
            id="q2"
            title="IMPORTANT, NOT URGENT"
            description="Long-term growth activities."
            headerClass="border-t-[4px] border-t-[#000000] bg-gradient-to-b from-black/5 to-transparent"
            accentClass="bg-[#000000]"
            tasks={q2Tasks}
          />
          <Quadrant
            id="q3"
            title="URGENT, NOT IMPORTANT"
            description="Tasks that can be delegated."
            headerClass="border-t-[4px] border-t-[#E4DED2] bg-gradient-to-b from-[#E4DED2]/50 to-transparent"
            accentClass="bg-black/40"
            tasks={q3Tasks}
          />
          <Quadrant
            id="q4"
            title="NOT IMPORTANT, NOT URGENT"
            description="Time wasters to eliminate."
            headerClass="border-t-[4px] border-t-black/10 bg-gradient-to-b from-black/5 to-transparent opacity-80"
            accentClass="bg-black/20"
            tasks={q4Tasks}
          />
        </div>
      </div>
    </DndContext>
  );
}
