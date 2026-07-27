"use client";

import { useForm } from "react-hook-form";
import { useTaskStore, Priority, QuadrantId } from "@/store/useTaskStore";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormValues {
  title: string;
  quadrant: QuadrantId;
  priority: Priority;
  estimatedTime?: number;
  category?: string;
  notes?: string;
}

export function QuickAddModal() {
  const { isAddModalOpen, setAddModalOpen, addTask } = useTaskStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      quadrant: "q1",
      priority: "Medium",
    },
  });

  if (!isAddModalOpen) return null;

  const onSubmit = (data: FormValues) => {
    addTask({
      title: data.title,
      quadrant: data.quadrant,
      priority: data.priority,
      estimatedTime: data.estimatedTime ? Number(data.estimatedTime) : undefined,
      category: data.category || undefined,
      notes: data.notes || undefined,
    });
    reset();
    setAddModalOpen(false);
  };

  return (
    <AnimatePresence>
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-md"
            onClick={() => setAddModalOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white/70 backdrop-blur-3xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[24px] overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/40">
              <h2 className="text-xl font-bold text-black">New Task</h2>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-2 -mr-2 text-black/40 hover:text-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
              <div>
                <input
                  {...register("title", { required: true })}
                  autoFocus
                  placeholder="Task title..."
                  className="w-full bg-transparent text-xl font-medium outline-none placeholder:text-black/30 text-black px-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Quadrant
                  </label>
                  <select
                    {...register("quadrant")}
                    className="w-full bg-white/50 border border-white/60 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#F95C4B] focus:ring-2 focus:ring-[#F95C4B]/20 transition-all text-black"
                  >
                    <option value="q1">Q1: Important & Urgent</option>
                    <option value="q2">Q2: Important, Not Urgent</option>
                    <option value="q3">Q3: Urgent, Not Important</option>
                    <option value="q4">Q4: Not Important & Not Urgent</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Priority
                  </label>
                  <select
                    {...register("priority")}
                    className="w-full bg-white/50 border border-white/60 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#F95C4B] focus:ring-2 focus:ring-[#F95C4B]/20 transition-all text-black"
                  >
                    <option value="Highest">Highest</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category (Optional)
                  </label>
                  <input
                    {...register("category")}
                    placeholder="e.g. Work"
                    className="w-full bg-white/50 border border-white/60 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#F95C4B] focus:ring-2 focus:ring-[#F95C4B]/20 transition-all text-black"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Est. Time (mins)
                  </label>
                  <input
                    type="number"
                    {...register("estimatedTime")}
                    placeholder="e.g. 30"
                    className="w-full bg-white/50 border border-white/60 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#F95C4B] focus:ring-2 focus:ring-[#F95C4B]/20 transition-all text-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Notes
                </label>
                <textarea
                  {...register("notes")}
                  placeholder="Add any extra details..."
                  className="w-full bg-white/50 border border-white/60 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#F95C4B] focus:ring-2 focus:ring-[#F95C4B]/20 transition-all min-h-[80px] resize-none text-black"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-black/60 hover:text-black transition-colors mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#F95C4B] text-white text-sm font-semibold rounded-xl hover:bg-[#F95C4B]/90 transition-colors shadow-md hover:shadow-lg"
                >
                  Save Task
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
