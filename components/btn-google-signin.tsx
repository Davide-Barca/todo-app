"use client";

import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";

import googleIcon from "@/media/googleIcon.svg";
import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import { GoogleSignIn } from "@/lib/auth/actions/google-signin";
import { useSearchParams } from "next/navigation";

// Main Component
export default function GoogleSignInButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || undefined;

  async function handleClick() {
    await GoogleSignIn(callbackURL);
  }

  return (
    <Button onClick={handleClick} variant="outline" className="w-full flex gap-2" {...props}>
      <GoogleIcon />
      Login with Google
    </Button>
  );
}

// Unique component
function GoogleIcon() {
  return (
    <div className="size-5">
      <Image src={googleIcon} alt="Google Icon" width={20} height={20} />
    </div>
  );
}
