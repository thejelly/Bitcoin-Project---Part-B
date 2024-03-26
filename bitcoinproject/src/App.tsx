import React, { useEffect, useState } from 'react';
import './App.css';

import { Chart } from "react-google-charts";
import { title } from 'process';
type NodeStatistic = { IPv4: number } | { IPv6: number } | { TOR: number };

function App() {
  const [data, setData] = useState<NodeStatistic[]>([]);
  const url = 'https://api.bitaps.com/btc/v1/nodes/statistic';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data.data.network);
        console.log(data.data.network);
      });
  }, []);
  let ipv4 = 0;
  let ipv6 = 0;
  let tor = 0;
 
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  else{
   ipv4 = data && 'IPv4' in data[0] ? data[0].IPv4 : 0;
   ipv6 = data && 'IPv6' in data[1] ? data[1].IPv6 : 0;
   tor = data && 'TOR' in data[2] ? data[2].TOR : 0;
   }
   const coldata = [
    ["Element", "Density", { role: "style" }],
    ["IPV4", ipv4, "#b87333"], // RGB value
    ["IPV6", ipv6, "silver"], // English color name
    ["TOR", tor, "gold"],
    
  ];
  
  return (
    <div >
      {data && data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nodes discovered</th>
              <th>{ipv4 + ipv6 + tor}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IPV4</td>
              <td>{ipv4}</td>
            </tr>
            <tr>
              <td>IPV6</td>
              <td>{ipv6}</td>
            </tr>
            <tr>
              <td>TOR</td>
              <td>{tor}</td>
            </tr>
            <tr>
            
            </tr>
          </tbody>
          <tfoot><Chart chartType="ColumnChart" width="100%" height="140px" data={coldata} /></tfoot>
        </table>
        
      )}
      
    </div>
      
  );
}

export default App;
