//@ts-ignore
import init from 'dynamic-circuit/dynamic-circuit.js';
import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function CircuitCanvas() {
  useEffect(()=>{
    init(document.getElementById('circuit'), {strokeWidth: 1, "color": {"r": 230, "g": 230, "b": 240}})
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
