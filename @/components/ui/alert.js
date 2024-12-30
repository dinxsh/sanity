import * as React from "react";
export function Alert({ children, className, variant, ...props }) {
  return (
    <div
      className={`${className} rounded-lg border p-4 ${
        variant === "destructive"
          ? "bg-destructive text-white"
          : "bg-primary text-white"
      }`}
      {...props}
    >
      {children}
    </div>
  );
}

Alert.displayName = "Alert";

export function AlertTitle({ children, className, ...props }) {
  return (
    <h3
      className={`${className} mb-1 text-lg font-medium text-center`}
      {...props}
    >
      {children}
    </h3>
  );
}

AlertTitle.displayName = "AlertTitle";

export function AlertDescription({ children, className, ...props }) {
  return (
    <p
      className={`${className} text-sm text-center text-muted-foreground`}
      {...props}
    >
      {children}
    </p>
  );
}

AlertDescription.displayName = "AlertDescription";
