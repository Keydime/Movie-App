import { Spinner } from "flowbite-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-20">
      <Spinner aria-label="Loading..." size="sm" color="gray" />
      <span className="pl-3 text-white">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;