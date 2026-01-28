import { useState, useCallback } from "react";
import ReactFlow, { Background, Controls,  } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

import Prompt from "./Components/Prompt";
import SideBar from "./Components/SideBar";

import { useSelector, useDispatch } from "react-redux";

import { setResult, setLoading, ClearAll } from "./PromptSlice/PromptSlice";
import Thinking from "./Components/Loading/Thinking";
import { Server } from "./Server";

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
  const [edges, setEdges] = useState(initialEdges);
  const [nodeId, setNodeId] = useState(2);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [storePrompt, setStorePrompt] = useState("");
  
const runFlow = useCallback(async () => {
  if (!prompt.trim()) return;

  dispatch(setLoading(true));

  try {
    const res = await axios.post(Server, { prompt });
    const answer = res.data.answer;

    const promptId = `${nodeId + 1}`;
    const responseId = `${nodeId + 2}`;
    console.log(promptId, nodeId);
    

    const y = 150 + nodeId * 80;

    const promptNode = {
      id: promptId,
      position: { x: 100, y },
      data: { label: prompt },
    };

    const responseNode = {
      id: responseId,
      position: { x: 450, y },
      data: { label: answer },
    };

    const newEdges = [
     
      {
        id: `e${nodeId}-${promptId}`,
        source: `${nodeId}`,
        target: promptId,
      },
     
      {
        id: `e${promptId}-${responseId}`,
        source: promptId,
        target: responseId,
      },
    ];

    setNodes((prev) => [...prev, promptNode, responseNode]);
    setEdges((prev) => [...prev, ...newEdges]);
    setNodeId((prev) => prev + 2);
 setStorePrompt(prompt);
    dispatch(setResult(answer));
    dispatch(ClearAll());

  } catch (err) {
    console.error(err);
    alert("AI request failed");
  } finally {
    dispatch(setLoading(false));
  }
}, [prompt, nodeId, dispatch]);

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
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default App;
