import { useState, useCallback } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

import Prompt from "./Pages/Prompt";
import SideBar from "./Pages/SideBar";

import { useSelector, useDispatch } from "react-redux";

import { setResult, setLoading, ClearAll } from "./PromptSlice/PromptSlice";
import Thinking from "./Pages/Loading/Thinking";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 150 },
    data: { label: "User Prompt" },
  },
  {
    id: "2",
    position: { x: 450, y: 150 },
    data: { label: "AI Response" },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

function App() {
  const dispatch = useDispatch();

  const { prompt, result, loading } = useSelector((state: any) => state.prompt);

  const [nodes, setNodes] = useState(initialNodes);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [saving, setSaving] = useState(false);
  const [storePrompt, setStorePrompt] = useState("");
  const runFlow = useCallback(async () => {
    if (!prompt.trim()) return;
    dispatch(setLoading(true));
    try {
      dispatch(setLoading(true));

      const res = await axios.post("http://localhost:3000/api/ask-ai", {
        prompt,
      });

      const answer = res.data.answer;

      dispatch(setResult(answer));

      setNodes((prev) =>
        prev.map((node) =>
          node.id === "2" ? { ...node, data: { label: answer } } : node
        )
      );
      setStorePrompt(prompt);
      dispatch(ClearAll(prompt));
    } catch (err) {
      console.error(err);
      dispatch(setLoading(false));
      alert("AI request failed");
      dispatch(ClearAll(prompt));
    } finally {
      dispatch(setLoading(false));
      dispatch(ClearAll(prompt));
    }
  }, [prompt, dispatch]);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-black">
      {loading && <Thinking />}

      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-black px-3 py-2 rounded"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      <SideBar
        saving={saving}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="w-full flex justify-center items-center  rounded-lg p-4">
          <Prompt
            loading={loading}
            result={result}
            onSend={runFlow}
            setSaving={setSaving}
            saving={saving}
            storePrompt={storePrompt}
          />
        </div>

        <div className="w-full  h-75 md:h-full  rounded-lg">
          <ReactFlow nodes={nodes} edges={initialEdges} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;
