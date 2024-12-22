"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      Configuration: "There is a problem with the server configuration.",
      AccessDenied:
        "Access denied. You do not have permission to access this resource.",
      Verification: "The verification token has expired or is invalid.",
      Default: "An unexpected authentication error occurred.",
    };
    return errorMessages[errorCode] || errorMessages.Default;
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription>
          {getErrorMessage(error)}
          {error && (
            <div className="mt-2 text-sm text-gray-500">
              Error code: {error}
            </div>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
