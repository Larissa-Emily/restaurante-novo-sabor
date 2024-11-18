import "./styled.css";
import { Outlet } from "react-router-dom";
import SideMenu from "./Components/SideMenu/index.js";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <SideMenu />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
