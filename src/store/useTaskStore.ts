import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'Highest' | 'High' | 'Medium' | 'Low';
export type QuadrantId = 'q1' | 'q2' | 'q3' | 'q4';

export interface Task {
  id: string;
  title: string;
  quadrant: QuadrantId;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  deadline?: number; // timestamp
  estimatedTime?: number; // in minutes
  category?: string;
  notes?: string;
}

interface TaskState {
  tasks: Task[];
  isAddModalOpen: boolean;
  setAddModalOpen: (isOpen: boolean) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  moveTask: (id: string, newQuadrant: QuadrantId) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      isAddModalOpen: false,
      setAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
              completed: false,
            },
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      toggleTaskCompletion: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),
      moveTask: (id, newQuadrant) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, quadrant: newQuadrant } : t
          ),
        })),
    }),
    {
      name: 'quadrant-storage',
    }
  )
);
