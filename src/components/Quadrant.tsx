"use client";

import { Task } from "@/store/useTaskStore";
import { TaskCard } from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface QuadrantProps {
  id: string;
  title: string;
  description: string;
  headerClass: string;
  accentClass: string;
  tasks: Task[];
}

export function Quadrant({
  id,
  title,
  description,
  headerClass,
  accentClass,
  tasks,
}: QuadrantProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div
      className={`flex flex-col h-full rounded-[24px] border border-white/60 bg-white/40 backdrop-blur-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative group`}
    >
      <div className={`p-4 md:p-5 ${headerClass}`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-black">{title}</h2>
            <p className="text-xs md:text-sm font-medium text-black/60 mt-1">{description}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl md:text-2xl font-bold tracking-tighter text-black">
              {totalCount}
            </span>
            <span className="text-[10px] md:text-xs font-semibold uppercase text-black/40 tracking-[0.2em]">
              Tasks
            </span>
          </div>
        </div>

        {totalCount > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 bg-black/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${accentClass} transition-all duration-500 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-bold w-9 text-right text-black">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>

      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 relative">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground opacity-50 pointer-events-none">
              <div
                className={`w-12 h-12 rounded-full ${headerClass} mb-3 flex items-center justify-center`}
              >
                <span className="text-2xl font-light">+</span>
              </div>
              <p className="text-sm font-medium">No tasks yet</p>
            </div>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </SortableContext>
      </div>
    </div>
  );
}
