"use client";

export default function NewFeatureRadar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-block">
      {children}
      <div className="absolute top-0 right-0 -mt-1 -mr-1">
        <div className="relative h-3 w-3">
          <div className="absolute inset-0 rounded-full bg-purple-700 dark:bg-blue-500 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-purple-700 dark:bg-blue-500" />
        </div>
      </div>
    </div>
  );
}
