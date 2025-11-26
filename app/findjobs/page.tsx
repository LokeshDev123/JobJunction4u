import FindJobs from "@/Components/FindJobs";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
    <FindJobs/>
    </Suspense>
  );
}
