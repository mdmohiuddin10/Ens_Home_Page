import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import AgentTranHistory from "../pages/AgentTranHistory/AgentTranHistory";
import U2ACashOutHistory from "../pages/U2ACashOutHistory/U2ACashOutHistory";
import A2UBalanceTransfer from "../pages/A2UBalanceTransfer/A2UBalanceTransfer";
import PrivateRouts from "./PrivateRouts";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Login></Login>,
    },
    {
      path: "/home",
      element: <PrivateRouts><Home></Home></PrivateRouts>,
    },
    {
      path: "/agentTranHistory",
      element: <PrivateRouts><AgentTranHistory></AgentTranHistory></PrivateRouts>,
    },
    {
      path: "/u2aCashOutHistory",
      element: <PrivateRouts><U2ACashOutHistory></U2ACashOutHistory></PrivateRouts>,
    },
    {
      path: "/a2uBalanceTransfer",
      element: <PrivateRouts><A2UBalanceTransfer></A2UBalanceTransfer></PrivateRouts>,
    },
    
  ]);

  export default router