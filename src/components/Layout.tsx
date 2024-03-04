import { ImAirplane } from "react-icons/im";
import { Outlet, useNavigate } from "react-router-dom";
const Layout = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-blue-950 w-full h-16 flex items-center justify-center">
        <div className="max-w-4xl w-full p-2 lg:p-0">
          <ImAirplane
            onClick={() => navigate("/")}
            className="text-white text-4xl cursor-pointer"
          />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
