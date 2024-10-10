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

const Accordian = () => {
  const [exerciseList, setExerciseList] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const gymTracker = localStorage.getItem("gym-tracker");
    if (gymTracker != null) {
      const prevExercise = JSON.parse(gymTracker);
      setExerciseList([...prevExercise]);
    }
  }, []);

  const filteredList = useMemo(
    () =>
      search === ""
        ? exerciseList
        : exerciseList.filter((exercise) =>
            exercise.exercise.toLowerCase().includes(search.toLowerCase())
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
        {filteredList.map((exercise, idx) => (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger>{exercise.exercise}</AccordionTrigger>

            <AccordionContent className="flex flex-col items-center">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Date</TableHead>
                    <TableHead>Reps</TableHead>
                    <TableHead>Weight</TableHead>
                  </TableRow>
                </TableHeader>
                {exercise.data.map((data: any, idx: number) => (
                  <TableBody key={idx}>
                    <TableRow>
                      <TableCell className="font-medium">{data.date}</TableCell>
                      <TableCell>{data.reps}</TableCell>
                      <TableCell>{data.weight}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
              <AddNewEntryModal exercise={exercise} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Accordian;
