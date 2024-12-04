# Wellfound Job Scraper App

This project is a full-stack application that allows users to search and scrape job listings from Wellfound (formerly AngelList). It uses **FastAPI** for the backend and **React** with **Vite** for the frontend. The app allows users to input keywords and retrieve a list of jobs matching those keywords. The job data is fetched from the backend and displayed dynamically in a responsive and visually appealing card layout.

![image alt](https://github.com/SahilSharan/react-fastapi/blob/383e4cf3eaefe9ab6710dfd711f834e1bbd6f06c/Screenshot%202024-12-04%20225708.png)

## Features
- Scrape job listings from Wellfound using FastAPI.
- Display scraped job data in a responsive, visually appealing grid layout.
- Search for jobs by keywords.
- Responsive design optimized for mobile, tablet, and desktop screens.
- Dynamic updates on button click, fetching real-time job data.

## Technologies Used
- **Frontend**: React, Vite, CSS (Responsive design)
- **Backend**: FastAPI, Python, BeautifulSoup (for web scraping)
- **Database**: Not required (all data fetched dynamically)
- **Web Scraping**: BeautifulSoup, Requests (for scraping Wellfound job listings)
- **Deployment**: Can be deployed on any platform (e.g., Heroku, Vercel, or AWS)

## Project Structure

### Backend (FastAPI)
- **main.py**: FastAPI application defining the scraping logic and API routes.
- **scraper.py**: Handles scraping of job listings from Wellfound.

### Frontend (React)
- **src/App.jsx**: React component that interacts with the FastAPI backend and displays job data.
- **src/app.css**: Styles for the frontend, including a responsive layout and card design.
- **public/index.html**: Basic HTML template for the app.

## Installation

### Prerequisites
- Python 3.x
- Node.js and npm (for frontend)

### Backend (FastAPI)
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/wellfound-job-scraper.git
    cd wellfound-job-scraper/backend
    ```

2. Set up a virtual environment (optional but recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate   # For Windows use 'venv\Scripts\activate'
    ```

3. Install the required Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```

    The backend API will be accessible at `http://localhost:8000`.

### Frontend (React)
1. Navigate to the frontend directory:
    ```bash
    cd wellfound-job-scraper/frontend
    ```

2. Install the required frontend dependencies:
    ```bash
    npm install
    ```

3. Run the React app:
    ```bash
    npm run dev
    ```

    The frontend will be accessible at `http://localhost:3000`.

## How to Use

1. Open the app in your browser 
2. Enter a keyword in the search input box (e.g., "developer", "designer").
3. Click the "Scrape Jobs" button to fetch job listings.
4. View the fetched job listings displayed in cards.
5. The app will dynamically update with new job listings when the button is clicked.

## API Endpoints

- **GET `/scrape?keywords=<keyword>`**: Triggers the job scraping process for the given keyword.
    - Example: `/scrape?keywords=developer`

- **GET `/jobs`**: Fetches the latest scraped job data.
    - Returns a list of jobs in JSON format.

## Styling
The app uses **CSS** for styling, with a **gradient background** and **responsive card layout**. The layout adapts to different screen sizes (mobile, tablet, desktop) using **media queries**.

## Deployment

To deploy the app:
- Host the **FastAPI** backend on a platform like **Heroku** or **AWS**.
- Deploy the **React** frontend on **Vercel**, **Netlify**, or another platform.

For a seamless deployment, consider using **Docker** to containerize the application.

## Contributing

1. Fork the repository.
2. Create a new branch 
3. Make your changes.
4. Commit your changes 
5. Push to the branch 
6. Create a pull request.


