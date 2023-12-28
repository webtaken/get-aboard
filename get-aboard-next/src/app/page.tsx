import EmailForm from "@/components/Marketing/EmailForm";

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
        Employees on-boarding process in tech companies <br /> are often 🫠.
        Improve it with <span className="font-semibold">Get-Aboard</span>
      </p>
      <EmailForm />
    </main>
  );
}
