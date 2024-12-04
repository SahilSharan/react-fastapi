import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState([
    { job_title: "Frontend Developer", company_name: "Amazon" },
    { job_title: "Backend Developer", company_name: "Google" },
    { job_title: "Fullstack Engineer", company_name: "DexyAI" },
  ]); // Initial dummy data
  const [loading, setLoading] = useState(false);

  const startScraping = async () => {
    if (!keyword) {
      alert("Please enter a keyword.");
      return;
    }
    setLoading(true);
    try {
      await axios.get(`http://localhost:8000/scrape?keywords=${keyword}`);
      const interval = setInterval(async () => {
        const response = await axios.get("http://localhost:8000/jobs");
        if (response.data.length > 0) {
          setJobs(response.data);
          clearInterval(interval);
        }
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      alert("Error starting scraping process.");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      {/* Header Section */}
      <header className="header">
        <h1>Wellfound Jobs</h1>
        <p>Find your dream job with just one click!</p>
      </header>

      {/* Main Content */}
      <div className="main-container">
        <div className="form-container">
          <input
            className="input-keyword"
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="button-scrape" onClick={startScraping}>
            Scrape Jobs
          </button>
        </div>
        {loading ? (
          <div className="spinner"></div>
        ) : jobs.length > 0 ? (
          <div className="card-container">
            {jobs.map((job, index) => (
              <div key={index} className="card">
                <h3>{job.job_title}</h3>
                <p>{job.company_name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-jobs-text">No jobs found yet. Start scraping to view results.</p>
        )}
        <div className="footer">Made with ❤️ </div>
      </div>
    </div>
  );
};

export default App;
