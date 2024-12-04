from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API is running"}

@app.post("/scrape")
def scrape_jobs(keyword: str):
    url = f"https://wellfound.com/jobs?q={keyword}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    jobs = []

    # Update selectors as per Wellfound's structure
    for job in soup.select(".job-card"):
        title = job.select_one(".job-title").text
        company = job.select_one(".company-name").text
        location = job.select_one(".location").text
        jobs.append({"title": title, "company": company, "location": location})

    return {"jobs": jobs}
