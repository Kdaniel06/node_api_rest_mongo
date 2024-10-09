# Book API REST with NodeJS, MongoDB, Express, and Docker

This project is a simple RESTful API built using NodeJS, Express, MongoDB, and Docker. It allows you to manage a collection of books with basic CRUD (Create, Read, Update, Delete) operations.

## Features

- **CRUD Operations**: Create, Read, Update, Delete books in the database.
- **Express**: Framework for building the REST API.
- **MongoDB**: NoSQL database for storing book data.
- **Docker**: Containerization for easy deployment.

## Book Schema

Each book in the database has the following properties:

- `title`: String - The title of the book.
- `author`: String - The author of the book.
- `genre`: String - The genre of the book.
- `publication_date`: Date - The publication date of the book.

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- Docker and Docker Compose installed

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-api.git
cd book-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the environment
Create a .env file in the root directory following the .env.template content:

```bash
PORT=

MONGO_URL=mongodb://[USER]:[PASSWORD]@[HOST]:[PORT]
MONGO_USER=
MONGO_PASS=
MONGO_DB_NAME=books
```

### 4. Run the application with Docker
To run the app using Docker, make sure Docker is running, and then use Docker Compose to start the containers:

```bash
docker-compose up
```

This command will set up both the MongoDB container and the Node.js API server.

### 5. Running the app locally (without Docker)
To run the API without Docker, make sure MongoDB is running locally, and update the MONGO_URI in .env to point to your local MongoDB instance.

```bash
npm run dev
```

The API will be available at http://localhost:3000.

## API Endpoints

### 1. Get all books
* URL: /api/books
* Method: GET
* Response: Returns a list of all books.

```json
[
  {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Genre",
    "publication_date": "DATE"
  }
]
```

### 2. Get a book by ID
* URL: /api/books/:id
* Method: GET
* Response: Returns the details of a single book.

### 3. Create a new book
* URL: /api/books
* Method: POST
* Body: JSON object containing title, author, genre, and publication_date.

```json
{
  "title": "New Book",
  "author": "Author Name",
  "genre": "Fiction",
  "publication_date": "2024-01-01"
}
```

### 4. Update a book by ID
* URL: /api/books/:id
* Method: PUT and PATCH
* Body: JSON object with updated fields (title, author, genre, publication_date).

### 5. Delete a book by ID
* URL: /api/books/:id
* Method: DELETE

## Project Structure
``` bash
book-api/
│
├── src/
│   ├── models/
│   ├── routes/
│   └── app.js
├── .env
├── .env.template
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

## Built With
* Node.js - JavaScript runtime
* Express - Web framework for Node.js
* MongoDB - NoSQL database
* Docker - Container platform