//@ts-ignore
import init from 'dynamic-circuit/dynamic-circuit.js';
import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function CircuitCanvas() {
  useEffect(()=>{
    //224, 251, 255
    init(document.getElementById('circuit'), {strokeWidth: 1, "color": {"r": 204, "g": 251, "b": 255}})
  },[])
  return (
    <div style={{position: "relative", minHeight:"100vh"}}>
        <canvas id="circuit"></canvas>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Outlet/>
        </LocalizationProvider>
        <footer style={
          {
            position: 'relative',
            bottom: '0px',
            left: '0px',
            width: '100%',
            textAlign: 'center',
            fontSize: '0.9em',
          }
        }>
          <p style={{color: 'black'}}>Background Image Attribution: <a target="_blank" rel="noopener noreferrer" href="https://dynamiccircuit.kihtrak.com/">Dynamic Circuit by Karthik Sankar</a></p>
        </footer>
    </div>
    )
}
