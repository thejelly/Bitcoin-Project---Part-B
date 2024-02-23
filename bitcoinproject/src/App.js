import './App.css';
import React, { useState,useEffect } from 'react';

function App() {
  const [data, setData] = useState([])
  const url = 'https://api.bitaps.com/btc/v1/nodes/statistic';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data.data.network);
        console.log(data.data.network);
      
      });
  },[]);
  return (
    <div >
      <p>Nodes discovered</p>
      <p>{data[0].IPv4+data[1].IPv6+data[2].TOR}</p>
      <p>IPv4      {data[0].IPv4}</p>
      <p>IPv6    {data[1].IPv6}</p>
      <p>Tor      {data[2].TOR}</p>
    </div>
  );
}

export default App;
