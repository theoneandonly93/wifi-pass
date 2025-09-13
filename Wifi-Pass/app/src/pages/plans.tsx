import { NextPage } from "next";

const Plans: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#181a1b] text-white">
      <h1 className="text-4xl font-bold mb-6">Available Plans</h1>
      <p className="text-lg">This is the plans page. Add your plans here!</p>
    </div>
  );
};

export default Plans;
