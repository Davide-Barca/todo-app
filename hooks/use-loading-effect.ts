import { useEffect, useState } from "react";

type LoadingStatus = null | "loading" | "completed" | "error";

type UseLoadingEffectOptions<T> = {
  effect: () => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  deps?: any[];
};

export function useLoadingEffect<T>({ effect, onSuccess, onError, deps = [] }: UseLoadingEffectOptions<T>) {
  const [status, setStatus] = useState<LoadingStatus>(null);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setStatus("loading");
        const result = await effect();
        if (cancelled) return;

        setData(result);
        setStatus("completed");
        onSuccess?.(result);
      } catch (err) {
        if (cancelled) return;

        setError(err);
        setStatus("error");
        onError?.(err);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    status,
    data,
    error,
    isLoading: status === "loading",
    isCompleted: status === "completed",
    isError: status === "error",
  };
}
