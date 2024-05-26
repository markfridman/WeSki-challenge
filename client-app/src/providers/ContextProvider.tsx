import React, { createContext, useContext, useState, ReactNode } from 'react';

type SharedState = {
  currentFilters: {
    destination: number,
    groupSize: number,
    startDate: string,
    endDate: string
  };
};

type ContextProps = {
  sharedState: SharedState;
  setSharedState: React.Dispatch<React.SetStateAction<SharedState>>;
  
};

const initialSharedState: SharedState = {
  currentFilters: { 
    destination: 1,
    groupSize: 4,
    startDate: '2025-03-04',
    endDate: '2025-03-11'
  },
};

const MyContext = createContext<ContextProps | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [sharedState, setSharedState] = useState<SharedState>(initialSharedState);

  return (
    <MyContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
