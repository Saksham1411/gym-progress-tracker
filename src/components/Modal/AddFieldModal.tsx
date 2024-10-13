"use client";
import { useState } from "react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { useFirebase } from "../../context/Firebase";
import { useExerciseContext } from "../../context/ExerciseContext";
import { useModal } from "../ui/animated-modal";
import toast from "react-hot-toast";

export function AddFieldModal() {
  const [exerciseName, setExerciseName] = useState<string>("");

  const firebase: any = useFirebase();
  const {exerciseList}:any = useExerciseContext();
  const { setOpen } = useModal();

  const validateDuplicacyOfName = (name:string)=>{
    const validationArray = exerciseList.filter((exercise:any) => exercise.name.toLowerCase() === name.toLowerCase())
    return validationArray.length>0
  }
  
  const submitHandler = async () => {
    if(exerciseName==="") {
      toast.error("fields are empty")
      return;
    }
    if(validateDuplicacyOfName(exerciseName)){
      toast.error("exercise already exist")
      return;
    }
    try {
      await firebase.handleCreateNewExercise(exerciseName);
      setOpen(false);
      setExerciseName("");
    } catch (error) {
      toast.error("something went wrong try again");
    }
  };
  return (
    <>
      <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center px-2 py-1 text-sm rounded">
        <span className="text-center">Add new exercise</span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-bold">Exercise Name</label>
              <input
                type="text"
                placeholder="exercise"
                className="border border-black rounded-md px-4 py-1"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
              />
            </div>
          </form>
        </ModalContent>
        <ModalFooter className="gap-4">
          <button
            onClick={submitHandler}
            className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
          >
            Add
          </button>
        </ModalFooter>
      </ModalBody>
    </>
  );
}
