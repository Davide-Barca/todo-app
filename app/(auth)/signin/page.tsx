import React from "react";
import Link from "next/link";

// Components
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/feature/form-login";
import GoogleSignInButton from "@/components/btn-google-signin";

// Main Component
export default function SignInPage() {
  return (
    <div className="w-full flex justify-center pt-10">
      <Card className="w-full max-w-sm" suppressHydrationWarning>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your username below to login to your activity</CardDescription>
          <CardAction>
            <Button variant={"link"} asChild>
              <Link href={"/register"}>Register</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full">
            Login
          </Button>
          <GoogleSignInButton />
        </CardFooter>
      </Card>
    </div>
  );
}
