import Image from "next/image";
import { Button } from "./ui/button";

import googleIcon from "@/media/googleIcon.svg";

// Main Component
export default function GoogleSignInButton() {
  return (
    <Button variant="outline" className="w-full flex gap-2">
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
