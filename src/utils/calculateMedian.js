// utils.js
export const calculateMedian = (numbers) => {
    if (numbers.length === 0) return null;
  
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sortedNumbers.length / 2);
  
    return sortedNumbers.length % 2 === 0
      ? (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2
      : sortedNumbers[middle];
  };
  