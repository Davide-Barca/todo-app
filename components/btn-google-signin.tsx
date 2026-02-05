import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";

import googleIcon from "@/media/googleIcon.svg";
import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

// Main Component
export default function GoogleSignInButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return (
    <Button variant="outline" className="w-full flex gap-2" {...props}>
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
