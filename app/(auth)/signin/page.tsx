"use client";

import { useTransition } from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/feature/auth/components/LoginForm";
import GoogleSignInButton from "@/components/utils/GoogleSignInButton";
import { Spinner } from "@/components/ui/spinner";

// Main Component
export default function SignInPage() {
  const [isLoading, startLoading] = useTransition();

  return (
    <div className="w-full flex justify-center pt-10">
      <Card className="w-full max-w-sm" suppressHydrationWarning>
        {/* Header */}
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your username below to login to your activity</CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <LoginForm transitionFn={startLoading} />
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" disabled={isLoading} className="w-full">
            {isLoading && <Spinner />}
            Login
          </Button>
          <GoogleSignInButton disabled={isLoading} />

          {/* Register */}
          <CardDescription className="space-x-1">
            <span>Don't have an account?</span>
            <Button variant={"link"} className="px-0" asChild>
              <Link href={"/register"}>Register</Link>
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
