const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
    return;
  }
  console.log('Connected to SQLite database');
  
  // Create table if it doesn't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      github_url TEXT,
      live_url TEXT,
      technologies TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table projects created or already exists');
    
    // Sample project data
    const projects = [
      {
        title: 'Just-Wash AI',
        description: 'A full-stack web app, to make washing hands more fun and engaging.',
        image_url: '/images/justwash.png',
        github_url: 'https://github.com/hiatus770/just_wash_backend',
        live_url: 'http://devpost.com/software/just-wash',
        technologies: 'Typescript,Next.js,MongoDB,Flask,OpenCV'
      },
      {
        title: 'Portfolio Website',
        description: 'My personal portfolio website built with React and SQLite backend.',
        image_url: '/images/portfolio.png',
        github_url: 'https://github.com/ConfusingDuck/portfolio',
        live_url: 'https://confusingduck.github.io/portfolio',
        technologies: 'React,Tailwind CSS,Framer Motion,SQLite,Express'
      },
      {
        title: 'Weather App',
        description: 'A simple weather application that shows forecasts for any location.',
        image_url: '/images/weather.png',
        github_url: 'https://github.com/ConfusingDuck/weather-app',
        live_url: 'https://weather-app-demo.example.com',
        technologies: 'JavaScript,React,CSS,Weather API'
      }
    ];
    
    // Drop existing table if you want to reset data
    db.run('DELETE FROM projects', (err) => {
      if (err) {
        console.error('Error deleting existing projects:', err);
        // Continue anyway since we can still insert projects
      } else {
        console.log('Existing projects deleted');
      }
      
      // Insert projects
      const stmt = db.prepare('INSERT INTO projects (title, description, image_url, github_url, live_url, technologies) VALUES (?, ?, ?, ?, ?, ?)');
      
      projects.forEach(project => {
        stmt.run(
          project.title,
          project.description,
          project.image_url,
          project.github_url,
          project.live_url,
          project.technologies
        );
      });
      
      stmt.finalize();
      
      console.log('Database seeded successfully');
      
      // Verify the data was inserted
      db.all('SELECT * FROM projects', [], (err, rows) => {
        if (err) {
          console.error('Error verifying data:', err);
          return;
        }
        console.log('Inserted projects:');
        console.log(rows);
        
        // Close the database connection
        db.close();
      });
    });
  });
}); 