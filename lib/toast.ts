import { toast } from "sonner";

export function showErrorToast(message: string, description?: string, duration?: number) {
  toast.error(message, {
    classNames: { icon: "text-destructive" },
    description,
    position: "top-right",
    duration: duration || 5000,
  });
}

export function showInfoToast(message: string, description?: string, duration?: number) {
  toast.success(message, {
    classNames: { icon: "text-success" },
    description,
    position: "top-right",
    duration: duration || 5000,
  });
}