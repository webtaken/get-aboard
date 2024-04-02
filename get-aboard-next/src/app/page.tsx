import EmailForm from "@/components/Marketing/EmailForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        <span className="text-transparent gradient-text bg-gradient-to-r from-fuchsia-500 via-teal-600 to-fuchsia-500 bg-clip-text">
          On-Boarding
        </span>{" "}
        process
      </h1>
      <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        doesn&apos;t have to be painful
      </h1>
      <p className="text-xl text-center mt-10 text-muted-foreground">
        Avoid tricky 🫠 on-boardings with{" "}
        <span className="font-semibold">Get-Aboard</span>
      </p>
      <div className="flex flex-col justify-center mt-5 gap-y-2">
        <Button className="mx-auto w-32 text-base" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <p className="text-md text-center font-bold">
          We&apos;ve launched our first version 🚀
          <br /> Try it now!
        </p>
      </div>
    </main>
  );
}
