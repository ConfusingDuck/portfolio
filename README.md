# Welcome to my Portfolio

Hey! I'm Ray, and this is my portfolio site where I keep all my projects and work. I built it with React and Tailwind CSS to keep things simple and clean while making sure it works great everywhere.

Check out my portfolio at: [confusingduck.github.io/portfolio](https://confusingduck.github.io/portfolio)

## What's Inside

Nothing too fancy, just:
- A dark mode that's easy on the eyes
- Some nice animations to make it feel alive
- Everything works on mobile (because that's important)
- All my favorite projects, from both software and hardware
- My contact info if you want to reach out
- Fast loading because nobody likes waiting
- SQL database backend for storing project data

## Built With

Here's what I used:
- React for the heavy lifting
- Tailwind CSS to make it look good
- Framer Motion for the animations
- React Router and React Icons for the extra bits
- Express and SQLite for the backend API

## Running the Application

This portfolio is a full-stack application with both frontend and backend components.

### Frontend (React)

1. Get the code:
```bash
git clone https://github.com/ConfusingDuck/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

That's it! You should see it running at [http://localhost:3000](http://localhost:3000)

### Backend (Express/SQLite)

The backend provides a REST API for storing and retrieving project data using SQLite.

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Seed the database with initial data:
```bash
npm run seed
```

4. Start the server:
```bash
npm run dev
```

The backend API will run at [http://localhost:3001](http://localhost:3001)

## API Endpoints

The backend provides the following REST API endpoints:

- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create a new project
- GET `/api/projects/:id` - Get a specific project
- PUT `/api/projects/:id` - Update a project
- DELETE `/api/projects/:id` - Delete a project

## Deployment

### Frontend
The frontend is deployed on GitHub Pages: [confusingduck.github.io/portfolio](https://confusingduck.github.io/portfolio)

### Backend
For the backend, you can deploy it to:
- [Render](https://render.com) (Free tier available for API hosting)
- [Railway](https://railway.app)
- [Heroku](https://heroku.com)

## How It's Organized

Pretty straightforward structure:
```
├── public/                # Static files
├── src/                   # Frontend React code
│   ├── components/        # React components
│   ├── context/           # Application context
│   └── App.js             # Main app component
└── server/                # Backend server
    ├── index.js           # Express API server
    ├── seed.js            # Database seed script
    └── portfolio.db       # SQLite database file
```

## See Something That Could Be Better?

If you spot any issues or have ideas for improvements, feel free to fork it and send a pull request. Always happy to make things better.

## License

It's open source with an MIT License - use it however you like for your own portfolio!
