
import { createSlice } from "@reduxjs/toolkit";

type PromptState = {
  prompt: string;
  result: string;
  loading: boolean;
};

const initialState: PromptState = {
  prompt: "",
  result: "",
  loading: false,
};

const Prompt = createSlice({
    name: "prompt",
    initialState,
    reducers: {
        setPrompt:(state,action)=>{
            state.prompt = action.payload
        },
        setResult:(state,action)=>{
            state.result = action.payload
        },
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
         ClearAll:(state)=>{
            state.prompt = ""
         }

    }
})

export const {setPrompt,setResult,setLoading,ClearAll} = Prompt.actions
export default Prompt.reducer