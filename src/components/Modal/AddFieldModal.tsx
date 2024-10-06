"use client";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";

export function AddFieldModal() {
  const [exercise, setExercise] = useState("");

  const submitHandler = () => {
    const gymTracker = localStorage.getItem("gym-tracker");
    if (!gymTracker) {
      const value = [{ exercise, data: [] }];
      localStorage.setItem("gym-tracker", JSON.stringify(value));
    } else {
      const prevExercise = JSON.parse(gymTracker);
      const value = [...prevExercise, { exercise, data: [] }];
      localStorage.setItem("gym-tracker", JSON.stringify(value));
    }
    location.reload();
    setExercise("");
  };
  return (
    <div className="">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center">
          <span className="text-center">Add new field</span>
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
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
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
}
