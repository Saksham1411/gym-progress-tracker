import React, { createContext, ReactNode, useContext, useState } from "react";

interface ExerciseContextProviderProps {
  children: ReactNode;
}
interface ExerciseContextType {
  exerciseList: object[];
  setExerciseList: (exerciseList: object[]) => void;
}

export const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const useExerciseContext = (): ExerciseContextType | null =>
  useContext(ExerciseContext);

export const ExerciseContextProvider: React.FC<
  ExerciseContextProviderProps
> = ({ children }) => {
  const [exerciseList, setExerciseList] = useState<object[]>([]);
  return (
    <ExerciseContext.Provider value={{ exerciseList, setExerciseList }}>
      {children}
    </ExerciseContext.Provider>
  );
};
