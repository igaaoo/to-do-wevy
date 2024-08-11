'use client';
import { ReactNode, useState } from 'react';
import DataContext, { DataContextType } from './DataContext';
import { useAuthContext } from './AuthContext';
import { Tasks } from '@/types/tasks';
import axios from 'axios';

interface DataContextProviderProps {
  children: ReactNode;
}

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const { token } = useAuthContext();


  const [data, setData] = useState<Tasks[]>([]);

  function updateData() {
    axios.get<Tasks[]>('/api/data/task', { headers: { token } })
      .then(async (response) => {
        const tasks = await response.data.map((item: any) => {

          return {
            id: item.id,
            title: item.title,
            description: item.description,
            priority: item.priority,
            user: item.user,
            isOpen: item.isOpen,
          };
        });


        setData(tasks);
      });
  }



  const contextValue: DataContextType = {
    data,
    setData,
    updateData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
