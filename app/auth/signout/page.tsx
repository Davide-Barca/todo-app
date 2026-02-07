import { signOut } from "@/lib/auth/actions/signout";
import { redirect } from "next/navigation";

// Custom Types

export default async function SignoutPage() {
  await signOut();

  redirect("/auth/signin");
}
