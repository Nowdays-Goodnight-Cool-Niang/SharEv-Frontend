const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <span className="animate-bounce-delay-1 h-2 w-2 rounded-full bg-orange-500" />
      <span className="animate-bounce-delay-2 h-2 w-2 rounded-full bg-orange-500" />
      <span className="animate-bounce-delay-3 h-2 w-2 rounded-full bg-orange-500" />
    </div>
  );
};

export default LoadingSpinner;
