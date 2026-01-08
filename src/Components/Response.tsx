import axios from "axios";
import React, { useState } from "react";
import { Server } from "../Server";

type ResponseProps = {
  prompt: string;
  result: string;
  loading: boolean;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  storePrompt: string;
};

const Response: React.FC<ResponseProps> = ({
  result,
  loading,
  setSaving,
  saving,
  storePrompt,
}) => {
  const [expanded, setExpanded] = useState(false);

  const saveToDB = async () => {
    try {
      setSaving(true);
      await axios.post(`${Server}/savePrompt`, {
        prompt: storePrompt,
        response: result,
      });
      alert("Saved to DB");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4 p-3 sm:p-4">
  
      {storePrompt && (
        <div
          className="
            text-xs sm:text-sm
            text-gray-400
            bg-gray-900
            p-3
            rounded-lg
            wrap-break-word
          "
        >
          {storePrompt}
        </div>
      )}

   
      <div
        className={`
          text-white
          bg-gray-800
          p-3 sm:p-4
          rounded-lg
          overflow-y-auto
         wrap-break-word
          text-sm sm:text-base
          leading-relaxed
          transition-all duration-300
          ${
            expanded
              ? "max-h-[60vh] sm:max-h-125"
              : "max-h-35 sm:max-h-45"
          }
        `}
      >
        {loading ? "Thinking..." : result || "No response yet"}
      </div>

   
      <div className="flex items-center justify-between gap-3">
        {result && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="
              text-xs sm:text-sm
              text-purple-400
              hover:underline
              transition
            "
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}

        <button
          onClick={saveToDB}
          disabled={loading || saving || !result}
          className="
            px-3 sm:px-4
            py-1.5 sm:py-2
            rounded-xl
            bg-purple-700
            text-white
            text-sm sm:text-base
            cursor-pointer
            font-semibold
            hover:bg-purple-600
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Response;
