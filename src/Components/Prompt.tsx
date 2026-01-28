import React from "react";
import SendButton from "./SendButton";
import Response from "./Response";
import { useDispatch, useSelector } from "react-redux";
import { setPrompt } from "../PromptSlice/PromptSlice";

type PromptProps = {
  onSend: () => void;
  loading: boolean;
  result: string;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  storePrompt: string;
};

const Prompt: React.FC<PromptProps> = ({
  onSend,
  loading,
  result,
  setSaving,
  saving,
  storePrompt,
}) => {
  const dispatch = useDispatch();

  const prompt = useSelector((state: any) => state.prompt.prompt);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prompt.trim()) {
      onSend();
    }
  };

  return (
    <div className="w-full flex justify-center px-3 sm:px-6 py-4">
      <div className="w-full max-w-xl flex flex-col gap-5 sm:gap-6">
        {result ? (
          <Response
            result={result}
            prompt={prompt}
            loading={loading}
            setSaving={setSaving}
            saving={saving}
            storePrompt={storePrompt}
          />
        ) : (
          <div className="text-center space-y-2">
            <h1
              className="font-[Share_Tech] font-bold text-white
                           text-3xl sm:text-4xl md:text-5xl"
            >
              Welcome
            </h1>
            <p
              className="font-[Share_Tech] text-gray-400
                          text-xs sm:text-sm md:text-base"
            >
              Explore this Universe – Zero IQ AI
            </p>
          </div>
        )}

        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            placeholder="Enter your prompt..."
            className="
              flex-1 h-10 sm:h-11 md:h-12
              px-3 sm:px-4
              rounded-lg
              bg-white text-black text-sm sm:text-base
              outline-none
              focus:ring-2 focus:ring-amber-400
              transition
            "
            value={prompt}
            onChange={(e) => dispatch(setPrompt(e.target.value))}
            onKeyDown={handleKeyDown}
          />

          <SendButton onSend={onSend} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Prompt;
