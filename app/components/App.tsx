import React, { useState } from "react";
import axios from "axios";
// import data from '../Design1';
const App: React.FC = () => {
  // const [data, setData] = useState([]);
  const [companyType, setCompanyType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  // const apiUrl = "https://jsonplaceholder.typicode.com/todos/1";
  const handleGenerate = () => {
    // parent.postMessage({ pluginMessage: { type: 'generate', data } }, '*');
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "https://prompt2ui-rn6x.onrender.com/post",
          {
            variable1: companyType,
            variable2: companyName,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("--data--", data);
        try {
          const { data } = await axios.get(
            "https://prompt2ui-rn6x.onrender.com/get_data"
          );
          console.log("-- get data--", data);
          parent.postMessage(
            { pluginMessage: { type: "generate", data } },
            "*"
          );
        } catch (error) {
          console.log("--get error--", error);
        }
      } catch (error) {
        console.log("--error--", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };
  const handleCompanyType = (e: any) => {
    setCompanyType(e.target.value);
    console.log("--company type--", companyType);
  };
  const handleCompanyName = (e: any) => {
    setCompanyName(e.target.value);
    console.log("--company name--", companyName);
  };
  // console.log("--data--", data);
  return (
    <div>
      <h1>Click to generate design</h1>
      <input
        onChange={handleCompanyType}
        placeholder="Enter the company type"
      ></input>
      <input
        onChange={handleCompanyName}
        placeholder="Enter the company name"
      ></input>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
};

export default App;
