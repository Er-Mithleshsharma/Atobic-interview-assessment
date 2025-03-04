import React, { useEffect, useState } from "react";
import { calculateMedian } from "./utils/calculateMedian";
const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [timerStop, setTimerStop] = useState(1);
  const [intervalId, setIntervalID] = useState(null);
  const [median, setMedian] = useState(null);
 

  async function getRandomNumber() {
    try {
      if (timerStop >= 1000) {
        clearInterval(intervalId);
        return;
      }

      const res = await fetch("http://www.randomnumberapi.com/api/v1.0/random");
      const data = await res.json();

      setNumbers((prev) => {
        const newNumbers = [...prev, data[0]];
        const median = calculateMedian(newNumbers) 
        setMedian(median)
        return newNumbers;
      });

      setTimerStop((prev) => prev + 1);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      getRandomNumber();
    }, 1000);
    setIntervalID(id);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h1>Random Numbers</h1>
      <div>
      {numbers.map((number, index) => (
        <div key={index}>{number}</div>
      ))}</div>
      <h2>Median: {median !== null ? median : "Calculating"}</h2>
    </div>
  );
};

export default App;