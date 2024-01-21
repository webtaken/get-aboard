import LoginForm from "@/components/Authentication/LoginForm";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <Card className="w-96 px-10 py-6 rounded-lg">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Good to have you back!</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p className="mx-auto text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
