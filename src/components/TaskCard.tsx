"use client";

import { useState } from "react";
import { Task, useTaskStore } from "@/store/useTaskStore";
import { Check, Clock, Calendar, Hash, MoreVertical, GripVertical } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TaskCard({ task }: { task: Task }) {
  const toggleTaskCompletion = useTaskStore((state) => state.toggleTaskCompletion);
  const [expanded, setExpanded] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    Highest: "text-[#F95C4B] bg-[#F95C4B]/10 border border-[#F95C4B]/20",
    High: "text-black bg-[#E4DED2] border border-black/10",
    Medium: "text-black/70 bg-[#F6F4F1] border border-black/5",
    Low: "text-black/40 bg-transparent border border-black/5",
  };

  return (
    <motion.div
      layout
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`group relative flex flex-col p-3 md:p-4 rounded-[16px] border border-white/80 bg-white/60 hover:bg-white/90 hover:shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all cursor-pointer backdrop-blur-xl ${
        task.completed ? "opacity-50 grayscale-[0.5]" : ""
      } ${isDragging ? "ring-2 ring-[#F95C4B]/50 border-[#F95C4B]/50 bg-white shadow-2xl" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-2 md:gap-3">
        <div
          {...attributes}
          {...listeners}
          className="mt-0.5 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-black/30 hover:text-black/70 transition-opacity mr-1"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4" />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(task.id);
          }}
          className={`mt-0.5 flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-md border flex items-center justify-center transition-colors ${
            task.completed
              ? "bg-[#000000] border-[#000000] text-white"
              : "border-black/20 hover:border-[#F95C4B] text-transparent"
          }`}
        >
          <Check className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />
        </button>
        
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-semibold leading-tight transition-colors ${
              task.completed ? "line-through text-black/40" : "text-black"
            }`}
          >
            {task.title}
          </h3>
          
          <div className="flex items-center flex-wrap gap-2 mt-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            
            {task.category && (
              <span className="flex items-center text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                <Hash className="w-3 h-3 mr-1" />
                {task.category}
              </span>
            )}
            
            {task.estimatedTime && (
              <span className="flex items-center text-[10px] md:text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {task.estimatedTime}m
              </span>
            )}
            
            {task.deadline && (
              <span className="flex items-center text-[10px] md:text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {format(task.deadline, "MMM d")}
              </span>
            )}
          </div>
        </div>
        
        <button 
          className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Edit/Delete menu
          }}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {expanded && task.notes && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 pl-6 md:pl-10 text-sm text-muted-foreground border-t border-border/50 pt-3"
        >
          {task.notes}
        </motion.div>
      )}
    </motion.div>
  );
}
