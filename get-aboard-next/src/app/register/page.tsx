import RegisterForm from "@/components/Authentication/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <Card className="w-96 px-10 py-6 rounded-lg">
        <CardHeader className="text-center">
          <CardTitle>Get started for free</CardTitle>
          <CardDescription>No credit card required!</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p className="mx-auto text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
