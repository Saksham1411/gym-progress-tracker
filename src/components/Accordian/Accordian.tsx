import { useEffect, useState } from "react";
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
  useEffect(() => {
    const gymTracker = localStorage.getItem("gym-tracker");
    if (gymTracker != null) {
      const prevExercise = JSON.parse(gymTracker);
      setExerciseList([...prevExercise]);
    }
  }, []);
  return (
    <div>
      <Accordion type="single" collapsible className="sm:w-full px-4">
        {exerciseList.map((exercise, idx) => (
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
                {exercise.data.map((data:any,idx:number) => (
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
