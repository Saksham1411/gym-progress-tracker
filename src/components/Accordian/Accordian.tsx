import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { AddNewEntryModal } from "../Modal/AddNewEntryModal";
import { useFirebase } from "../../context/Firebase";
import { useExerciseContext } from "../../context/ExerciseContext";
import { Modal } from "../ui/animated-modal";

const Accordian = () => {
  const [search, setSearch] = useState("");
  const firebase: any = useFirebase();
  const { exerciseList, setExerciseList }: any = useExerciseContext();

  useEffect(() => {
    const getData = async () => {
      const result = await firebase.handleGetUserData();
      setExerciseList(result);
    };
    if (firebase.isLoggedin) getData();
  }, [firebase]);

  const filteredList = useMemo(
    () =>
      search === ""
        ? exerciseList
        : exerciseList.filter((exercise:any) =>
            exercise.name.toLowerCase().includes(search.toLowerCase())
          ),
    [search, exerciseList]
  );
  return (
    <div className="px-3">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search here"
          className="border border-gray-900 w-full px-2 py-1 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass absolute right-6"></i>
      </div>
      <Accordion type="single" collapsible className="sm:w-full">
        {filteredList.map((exercise:any, idx:number) => (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger>{exercise.name}</AccordionTrigger>

            <AccordionContent className="flex flex-col items-center">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Date</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>Weight</TableHead>
                  </TableRow>
                </TableHeader>
                {exercise.data?.map((data: any, idx: number) => (
                  <TableBody key={idx}>
                    <TableRow>
                      <TableCell className="font-medium">{data.date}</TableCell>
                      <TableCell>{data.reps}</TableCell>
                      <TableCell>{data.weight}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
              <Modal>
                <AddNewEntryModal exercise={exercise} />
              </Modal>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Accordian;
