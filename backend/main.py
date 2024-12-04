from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from typing import List

app = FastAPI()

class JobData(BaseModel):
    company_name: str
    job_title: str

# In-memory store for scraped data (not ideal for production)
job_data_list: List[JobData] = []

def scrape_wellfound(keywords: str):
    global job_data_list
    url = f"https://www.wellfound.com/jobs?q={keywords}"
    response = requests.get(url)
    if response.status_code != 200:
        return  # Handle errors or log them appropriately

    soup = BeautifulSoup(response.text, 'html.parser')

    # Clear previous results
    job_data_list.clear()

    # Extract job data (adjust the selectors based on the website)
    job_listings = soup.find_all('div', class_='job-listing')  # Adjusting the class names
    for job_listing in job_listings:
        company_name = job_listing.find('a', class_='company-name').text.strip() if job_listing.find('a', class_='company-name') else "N/A"
        job_title = job_listing.find('h3', class_='job-title').text.strip() if job_listing.find('h3', class_='job-title') else "N/A"

        job_data = JobData(
            company_name=company_name,
            job_title=job_title
        )
        job_data_list.append(job_data)

@app.post("/scrape")
async def scrape_jobs(keywords: str, background_tasks: BackgroundTasks):
    """
    Start the scraping process in the background.
    """
    background_tasks.add_task(scrape_wellfound, keywords)
    return {"message": "Scraping started. Fetch results from /jobs endpoint."}

@app.get("/jobs", response_model=List[JobData])
async def get_jobs():
    """
    Retrieve the scraped job data.
    """
    if not job_data_list:
        return {"message": "No jobs found. Try scraping first."}
    return job_data_list
