const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="h-3 w-3 animate-bounce-delay-1 rounded-md bg-orange-500" />
      <span className="h-3 w-3 animate-bounce-delay-2 rounded-md bg-orange-500" />
      <span className="h-3 w-3 animate-bounce-delay-3 rounded-md bg-orange-500" />
    </div>
  );
};

export default LoadingSpinner;
