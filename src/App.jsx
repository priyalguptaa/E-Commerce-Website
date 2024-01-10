// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet } from "react-router-dom";
import "./App.css";
import Navitems from "./component/Navitems";
import Footer from "./home/Footer";

function App() {
  return (
    <>
      <Navitems />
      <div className="min-vh-100">
      <Outlet />
      </div>
      <Footer />
      {/* outlet is used to render the child routes */}
    </>
  );
}

export default App;
