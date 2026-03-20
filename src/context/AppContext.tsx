import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Propuesta } from '../types';
import { mockPropuestas } from '../data/mockData';

export type { Propuesta };
export interface AppUser { nombre: string; email: string; rol: string; }

interface Ctx {
  user: AppUser | null;
  setUser: (u: AppUser | null) => void;
  propuestas: Propuesta[];
  setPropuestas: (p: Propuesta[]) => void;
  addPropuesta: (p: Propuesta) => void;
}

const AppContext = createContext<Ctx>({} as Ctx);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [propuestas, setPropuestas] = useState<Propuesta[]>(mockPropuestas);
  const addPropuesta = (p: Propuesta) => setPropuestas(prev => [...prev, p]);
  return (
    <AppContext.Provider value={{ user, setUser, propuestas, setPropuestas, addPropuesta }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);