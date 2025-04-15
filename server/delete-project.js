const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

// Create interface for command line input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to the database
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
  listProjects();
});

// List all projects
function listProjects() {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      console.error('Error fetching projects:', err);
      closeAndExit();
      return;
    }
    
    console.log('\n===== All Projects =====');
    if (rows.length === 0) {
      console.log('No projects found in database');
      askToExit();
      return;
    }
    
    // Display projects in a table-like format
    rows.forEach(project => {
      console.log(`ID: ${project.id}`);
      console.log(`Title: ${project.title}`);
      console.log(`Description: ${project.description ? project.description.substring(0, 50) + '...' : 'N/A'}`);
      console.log(`Technologies: ${project.technologies || 'N/A'}`);
      console.log('-------------------------');
    });
    
    askToDeleteProject();
  });
}

// Ask if user wants to delete a project
function askToDeleteProject() {
  rl.question('\nDo you want to delete a project? (yes/no): ', (answer) => {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
      rl.question('Enter the ID of the project to delete: ', (id) => {
        deleteProject(id);
      });
    } else {
      askToExit();
    }
  });
}

// Delete a project by ID
function deleteProject(id) {
  // First check if project exists
  db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error checking project:', err);
      askToDeleteProject();
      return;
    }
    
    if (!row) {
      console.log(`No project found with ID: ${id}`);
      askToDeleteProject();
      return;
    }
    
    // Confirm deletion
    rl.question(`Are you sure you want to delete "${row.title}"? (yes/no): `, (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        // Delete the project
        db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
          if (err) {
            console.error('Error deleting project:', err);
          } else {
            console.log(`Project "${row.title}" (ID: ${id}) deleted successfully`);
          }
          
          // Ask if user wants to delete another project
          askToDeleteAnotherProject();
        });
      } else {
        askToDeleteProject();
      }
    });
  });
}

// Ask if user wants to delete another project
function askToDeleteAnotherProject() {
  rl.question('Do you want to delete another project? (yes/no): ', (answer) => {
    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
      listProjects();
    } else {
      askToExit();
    }
  });
}

// Ask if user wants to exit
function askToExit() {
  rl.question('Press Enter to exit...', () => {
    closeAndExit();
  });
}

// Close database connection and exit
function closeAndExit() {
  db.close();
  rl.close();
  console.log('Database connection closed. Exiting...');
} 