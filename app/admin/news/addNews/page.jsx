import { Suspense } from "react";
import AddNewsClient from "./AddNewsClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddNewsClient />
    </Suspense>
  );
}
