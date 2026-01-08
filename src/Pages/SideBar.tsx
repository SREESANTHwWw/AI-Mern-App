import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

type PromptItem = {
  _id: string;
  prompt: string;
};

type PropsItem = {
  saving: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: React.FC<PropsItem> = ({
  saving,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [promptData, setPromptData] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:3000/api/ask-ai/getAll"
        );
        setPromptData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch prompts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [saving]);

  return (
    <>
     
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-black border-r border-gray-800
          z-50 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
       
        <button
          className="md:hidden absolute top-4 right-4 text-white text-xl"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>


        <div className="p-4 border-b border-gray-800">
          <img src={logo} alt="Logo" className="w-32 mx-auto" />
        </div>

        <div className="p-2 space-y-1 overflow-y-auto ">
          {loading && (
            <p className="text-gray-500 text-sm text-center">
              Loading...
            </p>
          )}

          {!loading && promptData.length === 0 && (
            <p className="text-gray-500 text-sm text-center">
              No history found
            </p>
          )}

          {promptData.map((item) => (
            <div
              key={item._id}
              className="p-2 rounded text-sm text-gray-300
                         hover:bg-gray-700  transition"
              onClick={() => setSidebarOpen(false)} 
            >
              {item.prompt}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
