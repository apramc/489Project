# 489Project

Project Repository for **CptS 489**

## Project Overview

This project is designed as part of the **CptS 489** course. It includes a backend built with FastAPI and a frontend built with modern JavaScript frameworks.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Python** (version 3.9 or higher)
- **Node.js** (version 16 or higher)

## Install the required dependencies

```bash
pip install -r requirements.txt
```

```bash
npm install vite
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Start the backend server:

   ```bash
   uvicorn main:app --reload
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Material-UI and Emotion dependencies:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
