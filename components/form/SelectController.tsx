import Link from "next/link";

// Components
import { Label } from "../ui/label";
import { FieldError } from "../ui/field";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

// Types
import { ReactNode } from "react";
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
  items: { value: string; label: string }[];
  required?: boolean;
  form: UseFormReturn<TFormValues>;
};

// Main Component
export default function SelectController<TFormValues extends FieldValues>({
  label,
  link,
  placeholder,
  name,
  items,
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
          <Select name={field.name} value={field.value} onValueChange={field.onChange}>
            <SelectItems placeholder={placeholder} items={items} isInvalid={fieldState.invalid} />
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs mt-2" />}
        </div>
      )}
    />
  );
}

// Unique component
function SelectItems({
  placeholder,
  items,
  isInvalid,
}: {
  placeholder?: string;
  items: { value: string; label: string }[];
  isInvalid?: boolean;
}) {
  return (
    <>
      <SelectTrigger className="mt-2 w-full" aria-invalid={isInvalid}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </>
  );
}
