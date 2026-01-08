


const SendButton = ({onSend,loading}:any) => {
  return (
    <div className="flex justify-center items-center">
      <button className="bg-purple-800 w-20 h-12 rounded-2xl cursor-pointer"
      onClick={onSend}
      disabled={loading}
      >
        <div className="flex justify-center items-center text-white">
         <h1 className="text-whit font-[Share_Tech] ">Run Flow</h1> 
        </div>
      </button>
    </div>
  );
};

export default SendButton;
