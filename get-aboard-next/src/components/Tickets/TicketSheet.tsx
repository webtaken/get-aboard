import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Editor from "../Editors/Editor";
import { Input } from "../ui/input";
import { DataTicketNode } from "../Demos/Nodes";

interface TicketSheetProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: DataTicketNode;
}

export default function TicketSheet({ open, setOpen, data }: TicketSheetProps) {
  const { title, description } = data;

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-1/2 sm:max-w-none" side="right">
        <SheetHeader className="pr-5 pt-5">
          <SheetTitle className="w-11/12">
            <Input
              defaultValue={title}
              autoFocus={false}
              onChange={changeTitleHandler}
              className="text-4xl"
            />
          </SheetTitle>
          <SheetDescription asChild className="w-11/12 mx-auto">
            <Editor content={description} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
