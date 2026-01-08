

const Thinking = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative z-10 bg-gray-900 px-8 py-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 text-lg text-white">
          <span>Thinking</span>
          <span className="flex gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Thinking;
