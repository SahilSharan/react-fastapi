import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleScrape = async () => {
    try {
      const response = await axios.post("http://localhost:8000/scrape", { keyword });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div>
      <h1>Job Scraper</h1>
      <input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleScrape}>Scrape Jobs</button>

      {jobs.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
