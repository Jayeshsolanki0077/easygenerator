# Project Name

## Overview
Sign up and Sign in module with implementation of authentication mechanism

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Using Docker](#using-docker)
- [Usage](#usage)
- [Notes]
## Requirements
- Node.js (version X.X.X or later)
- npm (version X.X.X or later)
- Docker (version X.X.X or later) *(if using Docker)*

## Installation


### Running Locally

1. **Clone the repository:**
   ```bash
   git clone XXXX.git
   cd XXXXX
2. Install dependencies:
    For the Node backend:
    ```bash
    cd backend
    npm install

    For the React frontend:
    ```bash
    cd ../frontend
    npm install
3. Set up environment variables:
    Create a .env file in the backend directory and add your environment variables. An example .env file:
    makefile
    PORT=5000
    DB_URI=your_database_uri
4. Run the backend server:
    ```bash
    cd backend
    nest start
5. Run the frontend development server:
    ```bash
    cd ../frontend
    npm start


### Using Docker
1.  Create a .env file in the backend directory and add your environment variables. An example .env file:
    makefile
    PORT=5000
    DB_URI=your_database_uri
2. Run docker compose command. 
    ```bash 
    docker compose up -d
    Backend should be running in 5000 and frontend should run in 3000 
    