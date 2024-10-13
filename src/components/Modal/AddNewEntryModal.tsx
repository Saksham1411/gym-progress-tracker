"use client";
import React, { useState } from "react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import { useFirebase } from "../../context/Firebase";
import toast from "react-hot-toast";

interface Props {
  exercise: any;
}

export const AddNewEntryModal: React.FC<Props> = ({ exercise }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const firebase: any = useFirebase();
  const { setOpen } = useModal();

  function formatDate(date: Date): string {
    const day: string = String(date.getDate()).padStart(2, "0");
    const month: string = String(date.getMonth() + 1).padStart(2, "0");
    const year: number = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const submitHandler = async () => {
    if (reps === "" || weight === "") {
      toast.error("fields are empty");
      return;
    }
    try {
      const today = new Date();
      const date = formatDate(today);
      await firebase.handleExerciseDataUpdate(exercise.name, {
        date,
        reps,
        weight,
      });
      setOpen(false);
      setReps("");
      setWeight("");
    } catch (error) {
      toast.error("something went wrong try again");
    }
  };
  return (
    <>
      <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center mt-2">
        <span className="text-center">+</span>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-bold">Reps</label>
              <input
                type="number"
                placeholder="Enter your reps"
                className="border border-black rounded-md px-4 py-1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold">Weight</label>
              <input
                type="number"
                placeholder="Enter weight you lifting"
                className="border border-black rounded-md px-4 py-1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
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
};
