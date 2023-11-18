import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("");

  const getMessage = async () => {
    const response = await fetch("http://localhost:3000");
    const data = await response.json();
    console.log(data);
    setMessage(data.message);
  };

  useEffect(() => {
    getMessage();
  },[]);

  return (
    <div className="flex justify-center items-center h-full text-green-500">
      <h1 className="text-3xl font-bold">
        {message}
      </h1>
    </div>
  )
}

export default App
