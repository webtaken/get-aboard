"use client";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage, useIsClient } from "@uidotdev/usehooks";

function Alert() {
  const [open, setOpen] = useState(true);
  const [tutorial, setTutorial] = useLocalStorage<{
    state: boolean;
    dontShowAgain: boolean;
  }>("tutorial", { state: true, dontShowAgain: false });

  return (
    <AlertDialog open={tutorial.state && open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>First time using Get-Aboard?</AlertDialogTitle>
          <AlertDialogDescription>
            Watch a 1 min guided tour to learn the basic features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            onCheckedChange={(checked) => {
              if (checked) {
                setTutorial({ ...tutorial, dontShowAgain: true });
              } else {
                setTutorial({ ...tutorial, dontShowAgain: false });
              }
            }}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Don&apos;t show again
          </label>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
              if (tutorial.dontShowAgain)
                setTutorial({ ...tutorial, state: false });
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpen(false);
              if (tutorial.dontShowAgain)
                setTutorial({ ...tutorial, state: false });
              window.open(
                "https://gray-lettuce-c86.notion.site/Get-Aboard-Guide-c8b49121676e4c4099b09f13a1b1b83e?pvs=4",
                "_blank"
              );
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function TutorialAlert() {
  const isClient = useIsClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isClient === false) {
    return null;
  }
  if (!mounted) return null;
  return <Alert />;
}
