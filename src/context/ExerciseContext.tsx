import React, { createContext, ReactNode, useContext, useState } from "react";

interface ExerciseContextProviderProps {
  children: ReactNode;
}
interface ExerciseContextType {
  exerciseList: object[];
  setExerciseList: (exerciseList: object[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const useExerciseContext = (): ExerciseContextType | null =>
  useContext(ExerciseContext);

export const ExerciseContextProvider: React.FC<
  ExerciseContextProviderProps
> = ({ children }) => {
  const [exerciseList, setExerciseList] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ExerciseContext.Provider
      value={{ exerciseList, setExerciseList, isLoading, setIsLoading }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
