import { Tasks } from '@/types/tasks';
import { Dispatch, SetStateAction, createContext, useContext } from 'react';

export interface DataContextType {
  // Defina os tipos dos dados que você deseja compartilhar
  data: Tasks[];
  setData: Dispatch<SetStateAction<Tasks[]>>;
  updateData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('Data Context deve ser usado dentro de um provedor MyContext');
  }
  return context;
};

export default DataContext;
