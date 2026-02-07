import Link from "next/link";

// Components
import { Label } from "../ui/label";
import { FieldError } from "../ui/field";
import { Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";

// Types
import { HTMLInputTypeAttribute, ReactNode } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

// Custom Types
type ControllerProps<TFormValues extends FieldValues> = {
  label: string;
  link?: {
    href: string;
    value: ReactNode | string;
  };
  placeholder?: string;
  name: Path<TFormValues>;
  required?: boolean;
  form: UseFormReturn<TFormValues>;
};

// Main Component
export default function TextareaController<TFormValues extends FieldValues>({
  label,
  link,
  placeholder,
  name,
  required,
  form,
}: ControllerProps<TFormValues>) {
  const id = `form-${name}`;

  // Define required dot component
  let requiredDot: ReactNode = null;
  if (required) {
    requiredDot = <span className="text-red-500">*</span>;
  }

  // Define label link component
  let labelLink: ReactNode = null;
  if (link) {
    labelLink = (
      <Link href={link.href} className="ml-auto inline-block text-xs underline-offset-4 hover:underline">
        {link.value}
      </Link>
    );
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div suppressHydrationWarning>
          <div className="flex items-center">
            <Label htmlFor={id}>
              {label}
              {requiredDot}
            </Label>
            {labelLink}
          </div>
          <Textarea {...field} id={id} placeholder={placeholder} className="mt-2 min-h-32 max-h-100" aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs mt-2" />}
        </div>
      )}
    />
  );
}
