import React, { useEffect, useRef } from "react";
import CandleStickStockScaleChart from "./components/CandleStickStockScaleChart";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Logout from "./components/Logout";

export default function App() {

 

  return (
    <div>
   
      <Logout />
      <Login />
      <Register />
     
    <CandleStickStockScaleChart />

    </div>
  );
}


