//@ts-ignore
import init from 'https://dynamiccircuit.kihtrak.com/dynamic-circuit.js';
import { useEffect } from 'react';
import { Outlet } from "react-router-dom";

export default function CircuitCanvas() {
  useEffect(()=>{
    init(document.getElementById('circuit'), {strokeWidth: 1, "color": {"r": 210, "g": 220, "b": 230}})
  },[])
  return (
    <div>
        <canvas id="circuit" ></canvas>
        <Outlet />
        <footer style={
          {
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '100%',
            textAlign: 'center',
            fontSize: '0.9em'
          }
        }>
          <p style={{color: 'black'}}>Background Image Attribution: <a target="_blank" rel="noopener noreferrer" href="https://dynamiccircuit.kihtrak.com/">Dynamic Circuit by Karthik Sankar</a></p>
        </footer>
    </div>
    )
}
