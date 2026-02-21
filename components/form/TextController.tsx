import Link from "next/link";

// Components
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldError } from "../ui/field";
import { Controller } from "react-hook-form";

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
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  form: UseFormReturn<TFormValues>;
};

// Main Component
export default function TextController<TFormValues extends FieldValues>({
  label,
  link,
  placeholder,
  name,
  type = "text",
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
          <Input {...field} id={id} type={type} placeholder={placeholder} className="mt-2" aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs mt-2" />}
        </div>
      )}
    />
  );
}
