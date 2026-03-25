import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background">
      <Loader />
    </div>
  );
}
