const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="h-4 w-4 animate-bounce-delay-1 rounded-sm bg-orange-500" />
      <span className="h-4 w-4 animate-bounce-delay-2 rounded-sm bg-orange-500" />
      <span className="h-4 w-4 animate-bounce-delay-3 rounded-sm bg-orange-500" />
    </div>
  );
};

export default LoadingSpinner;
