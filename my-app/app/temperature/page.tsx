"use client";
import { useState } from "react";

export default function TemperatureConverter() {
  const [fahrenheit, setFahrenheit] = useState("");
  const [celsius, setCelsius] = useState("");
  const [history, setHistory] = useState<{ f: string; c: string }[]>([]);

  // Convert Fahrenheit to Celsius
  const convertToCelsius = (f: string) => {
    const c = ((parseFloat(f) - 32) * 5) / 9;
    return isNaN(c) ? "" : c.toFixed(2);
  };

  // Convert Celsius to Fahrenheit
  const convertToFahrenheit = (c: string) => {
    const f = (parseFloat(c) * 9) / 5 + 32;
    return isNaN(f) ? "" : f.toFixed(2);
  };

  // Handle Fahrenheit Input Change
  const handleFahrenheitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFahrenheit(value);
    setCelsius(convertToCelsius(value));
  };

  // Handle Celsius Input Change
  const handleCelsiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCelsius(value);
    setFahrenheit(convertToFahrenheit(value));
  };

  // Add Conversion to History
  const handleConvert = () => {
    if (fahrenheit !== "" && celsius !== "") {
      setHistory([...history, { f: fahrenheit, c: celsius }]);
    }
  };

  // Remove a Specific History Item
  const removeHistoryItem = (index: number) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  // Clear All History
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
      <h2 className="text-center text-lg font-bold text-blue-500">
        Formula: (°F - 32) × 5/9 = °C
      </h2>

      {/* Input Fields */}
      <div className="mt-4">
        <label className="block font-semibold">Temperature (°F):</label>
        <input
          type="number"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mt-4">
        <label className="block font-semibold">Temperature (°C):</label>
        <input
          type="number"
          value={celsius}
          onChange={handleCelsiusChange}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
      >
        Convert
      </button>

      {/* History Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-500">History:</h3>
        {history.length === 0 ? (
          <p className="text-gray-500 text-sm">No history available.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {history.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md shadow-sm"
              >
                <span className="font-semibold">{item.f}°F = {item.c}°C</span>
                <button
                  onClick={() => removeHistoryItem(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition-all"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clear All Button */}
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-700 transition-all duration-200"
        >
          Clear History
        </button>
      )}
    </div>
  );
}
