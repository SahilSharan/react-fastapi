import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [keyword, setKeyword] = useState(""); // For the search input
  const [jobs, setJobs] = useState([]);      // Store job data
  const [loading, setLoading] = useState(false); // Loading state

  // Trigger the scraping process
  const startScraping = async () => {
    if (!keyword) {
      alert("Please enter a keyword.");
      return;
    }
    setLoading(true); // Set loading state
    try {
      await axios.post("http://localhost:8000/scrape", { keywords: keyword }); // Call the backend /scrape endpoint
      alert("Scraping started. Please refresh to get data.");
    } catch (error) {
      console.error("Error starting scrape:", error);
      alert("Error starting scraping process.");
    }
    setLoading(false); // Clear loading state
  };

  // Fetch scraped jobs
  const fetchJobs = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await axios.get("http://localhost:8000/jobs"); // Call the backend /jobs endpoint
      setJobs(response.data); // Store the data
    } catch (error) {
      console.error("Error fetching jobs:", error);
      alert("Error fetching jobs.");
    }
    setLoading(false); // Clear loading state
  };

  return (
    <div style={{ fontFamily: "Arial", margin: "2rem" }}>
      <h1>Job Scraper</h1>
      <input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ marginRight: "1rem", padding: "0.5rem", fontSize: "1rem" }}
      />
      <button onClick={startScraping} style={{ padding: "0.5rem 1rem" }}>
        Scrape Jobs
      </button>
      <button onClick={fetchJobs} style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}>
        Refresh Jobs
      </button>

      {loading && <p>Loading...</p>}

      <table border="1" style={{ marginTop: "2rem", width: "100%" }}>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.company_name}</td>
                <td>{job.job_title}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No jobs available. Start scraping!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
