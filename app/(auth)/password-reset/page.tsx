// Components
import PasswordResetForm from "@/feature/auth/components/PasswordResetForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Main Component
export default function PasswordResetPage() {
  
  return (
    <div className="w-full flex justify-center pt-10">
      <Card className="w-full max-w-sm" suppressHydrationWarning>
        <CardHeader>
          <CardTitle>Password reset</CardTitle>
          <CardDescription>Enter your email to receive password reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordResetForm />
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login-form" className="w-full">
            Send reset link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
