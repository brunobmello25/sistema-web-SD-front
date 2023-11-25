import React from "react";

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
    </div>
  );
}
