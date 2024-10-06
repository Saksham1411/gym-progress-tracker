"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
interface Props {
  exercise: any;
}
export const AddNewEntryModal: React.FC<Props> = ({ exercise }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  function formatDate(date: Date): string {
    const day: string = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
    const year: number = date.getFullYear(); // Get full year

    return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
}

  const submitHandler = () => {
    console.log(reps, weight);
    const gymTracker = localStorage.getItem("gym-tracker");
    if (gymTracker != null) {
      const exerciseList = JSON.parse(gymTracker);
      const remainingArray = exerciseList.filter(
        (ex: any) => ex.exercise != exercise.exercise
      );
      console.log(exercise.data);
      const today = new Date();
      const date = formatDate(today);
      console.log(date);
      
      const changedValue = {
        exercise: exercise.exercise,
        data:[ ...exercise.data ,{ date, reps, weight }],
      };
      console.log(changedValue);
      
      const value = [changedValue, ...remainingArray];
      localStorage.setItem("gym-tracker", JSON.stringify(value));
    }
    setReps("");
    setWeight("");
    location.reload()
  };
  return (
    <div className="">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center">
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
      </Modal>
    </div>
  );
};
