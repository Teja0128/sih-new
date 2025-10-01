
import { Suspense } from "react";
import LoginForm from "./login-form";
import { Skeleton } from "@/components/ui/skeleton";

function LoginSkeleton() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[380px] gap-8">
          <div className="grid gap-4 text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              <Skeleton className="size-9 rounded-full" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}


export default function LoginPageContainer() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
