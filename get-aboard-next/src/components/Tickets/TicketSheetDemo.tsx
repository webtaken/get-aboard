import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { DataTicketNodeDemo } from "../Demos/TicketNodeDemo";
import EditorDemo from "../Editors/EditorDemo";

interface TicketSheetDemoProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: DataTicketNodeDemo;
}

export default function TicketSheetDemo({
  open,
  setOpen,
  data,
}: TicketSheetDemoProps) {
  const { title, description } = data;

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-1/2 sm:max-w-none" side="right">
        <SheetHeader className="pr-6 pt-6">
          <SheetTitle className="my-2">
            <Input
              defaultValue={title}
              autoFocus={false}
              onChange={changeTitleHandler}
              className="text-4xl"
            />
          </SheetTitle>
          <EditorDemo content={description} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
