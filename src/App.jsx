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
    <div className="flex flex-col items-center p-4">
  <h1 className="text-xl font-semibold">Random Numbers</h1>

  <div className="mt-2 p-2  rounded w-48 text-center flex gap-1 flex-wrap">
    {numbers.length > 0 ? (
      numbers.map((number, index) => <div key={index}>{number}</div>)
    ) : (
      <p>Fetching numbers...</p>
    )}
  </div>

  <h2 className="mt-2 text-lg">
    Median: <span className="font-medium">{median !== null ? median : "Calculating..."}</span>
  </h2>
</div>

  );
};

export default App;