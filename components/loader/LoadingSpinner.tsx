const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-dark">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
