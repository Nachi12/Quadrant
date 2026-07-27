"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Bell, User } from "lucide-react";
import { format } from "date-fns";
import { useTaskStore } from "@/store/useTaskStore";

export function TopNav() {
  const [time, setTime] = useState<Date | null>(null);
  const setAddModalOpen = useTaskStore((state) => state.setAddModalOpen);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setAddModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setAddModalOpen]);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/50 bg-white/40 backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#F95C4B] border border-[#F95C4B] flex items-center justify-center text-[#F6F4F1] font-bold text-lg shadow-sm">
          Q
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#000000]">Quadrant</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-xs font-semibold text-black/50 uppercase tracking-widest">
          {time ? format(time, "EEEE, MMMM do") : "..."}
        </div>
        <div className="text-lg font-bold tracking-tight text-[#000000]">
          {time ? format(time, "h:mm a") : "..."}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setAddModalOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#000000] text-[#F6F4F1] hover:bg-black/80 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button className="p-2 text-black/60 hover:text-[#000000] transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-black/60 hover:text-[#000000] transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F95C4B] border-[1.5px] border-[#F6F4F1] shadow-sm"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center border border-black/10 overflow-hidden cursor-pointer hover:bg-black/10 transition-colors">
          <User className="w-4 h-4 text-black/60" />
        </div>
      </div>
    </header>
  );
}
