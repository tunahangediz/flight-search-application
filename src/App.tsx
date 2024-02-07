
import { Outlet } from "react-router-dom";
import SearchForm from "./components/SearchForm";

export type Airport = {
  code: string;
  city: string;
};

const App: React.FC = () => {
  return (
    <div className="bg-blue-950  py-16 h-[100vh] ">
      <div className="max-w-4xl w-full  mx-auto">
        <h1 className="text-4xl text-white mb-8">Find your next destination</h1>
      </div>
      <div className="px-4 py-8 max-w-4xl w-full mx-auto shadow-lg bg-white rounded-md">
        <SearchForm />
      </div>
      <Outlet />
    </div>
  );
};

export default App;
