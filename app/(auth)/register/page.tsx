"use client";

import { useTransition } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/feature/form-register";
import { Spinner } from "@/components/ui/spinner";

// Main Component
export default function RegisterPage() {
  const [isLoading, startLoading] = useTransition();

  return (
    <div className="w-full flex justify-center pt-10">
      <Card className="w-full max-w-sm" suppressHydrationWarning>
        <CardHeader>
          <CardTitle>Register new account</CardTitle>
          <CardDescription>Enter your data below to register new account</CardDescription>
          <CardAction>
            <Button variant={"link"} asChild>
              <Link href={"/signin"}>Sign In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <RegisterForm transitionFn={startLoading} />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="register-form" disabled={isLoading} className="w-full">
            {isLoading && <Spinner />}
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
