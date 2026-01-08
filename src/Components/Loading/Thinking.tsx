const Thinking = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 bg-gray-900 px-8 py-6 rounded-2xl shadow-xl max-w-sm text-center">
        <p className="text-white text-lg font-medium">
          Connecting to server
        </p>

        <p className="mt-2 text-sm text-gray-300">
          This app uses free hosting, so the server may take a few seconds to wake up.
        </p>

        {/* Dots animation */}
        <div className="mt-4 flex justify-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

export default Thinking;
