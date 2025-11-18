import { Suspense } from "react";
import BookServicePage from "./BookServicePage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookServicePage />
    </Suspense>
  );
}
