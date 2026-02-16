"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Что-то пошло не так!</h2>
          <p className="text-muted-foreground mb-8">
            Произошла критическая ошибка. Мы уже работаем над её исправлением.
          </p>
          <Button onClick={() => reset()}>Попробовать снова</Button>
        </div>
      </body>
    </html>
  );
}
