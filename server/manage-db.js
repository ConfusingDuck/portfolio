const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');
const fs = require('fs');
const path = require('path');

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
  showMenu();
});

// Display menu
function showMenu() {
  console.log('\n===== Portfolio Database Manager =====');
  console.log('1. View all projects');
  console.log('2. Add a new project');
  console.log('3. Update a project');
  console.log('4. Delete a project');
  console.log('5. Run custom SQL query');
  console.log('6. Backup database');
  console.log('7. Exit');
  console.log('======================================\n');
  
  rl.question('Select an option (1-7): ', (answer) => {
    switch(answer) {
      case '1':
        viewAllProjects();
        break;
      case '2':
        addNewProject();
        break;
      case '3':
        updateProject();
        break;
      case '4':
        deleteProject();
        break;
      case '5':
        runCustomQuery();
        break;
      case '6':
        backupDatabase();
        break;
      case '7':
        console.log('Exiting...');
        db.close();
        rl.close();
        break;
      default:
        console.log('Invalid option!');
        showMenu();
    }
  });
}

// View all projects
function viewAllProjects() {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      console.error('Error fetching projects:', err);
    } else {
      console.log('\n===== All Projects =====');
      if (rows.length === 0) {
        console.log('No projects found');
      } else {
        rows.forEach(project => {
          console.log(`ID: ${project.id}`);
          console.log(`Title: ${project.title}`);
          console.log(`Description: ${project.description}`);
          console.log(`Image URL: ${project.image_url}`);
          console.log(`GitHub URL: ${project.github_url}`);
          console.log(`Live URL: ${project.live_url}`);
          console.log(`Technologies: ${project.technologies}`);
          console.log('-------------------------');
        });
      }
    }
    showMenu();
  });
}

// Add a new project
function addNewProject() {
  console.log('\n===== Add New Project =====');
  rl.question('Title: ', (title) => {
    rl.question('Description: ', (description) => {
      rl.question('Image URL: ', (image_url) => {
        rl.question('GitHub URL: ', (github_url) => {
          rl.question('Live URL: ', (live_url) => {
            rl.question('Technologies (comma-separated): ', (technologies) => {
              const sql = `INSERT INTO projects 
                (title, description, image_url, github_url, live_url, technologies) 
                VALUES (?, ?, ?, ?, ?, ?)`;
              
              db.run(sql, [title, description, image_url, github_url, live_url, technologies], function(err) {
                if (err) {
                  console.error('Error adding project:', err);
                } else {
                  console.log(`Project added successfully with ID: ${this.lastID}`);
                }
                showMenu();
              });
            });
          });
        });
      });
    });
  });
}

// Update a project
function updateProject() {
  console.log('\n===== Update Project =====');
  rl.question('Enter project ID to update: ', (id) => {
    db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
      if (err) {
        console.error('Error fetching project:', err);
        showMenu();
        return;
      }
      
      if (!project) {
        console.log(`No project found with ID: ${id}`);
        showMenu();
        return;
      }
      
      console.log(`Updating project: ${project.title}`);
      
      rl.question(`Title (${project.title}): `, (title) => {
        title = title || project.title;
        
        rl.question(`Description (${project.description}): `, (description) => {
          description = description || project.description;
          
          rl.question(`Image URL (${project.image_url}): `, (image_url) => {
            image_url = image_url || project.image_url;
            
            rl.question(`GitHub URL (${project.github_url}): `, (github_url) => {
              github_url = github_url || project.github_url;
              
              rl.question(`Live URL (${project.live_url}): `, (live_url) => {
                live_url = live_url || project.live_url;
                
                rl.question(`Technologies (${project.technologies}): `, (technologies) => {
                  technologies = technologies || project.technologies;
                  
                  const sql = `UPDATE projects 
                    SET title = ?, description = ?, image_url = ?, github_url = ?, live_url = ?, technologies = ? 
                    WHERE id = ?`;
                  
                  db.run(sql, [title, description, image_url, github_url, live_url, technologies, id], function(err) {
                    if (err) {
                      console.error('Error updating project:', err);
                    } else {
                      console.log(`Project updated successfully. Rows affected: ${this.changes}`);
                    }
                    showMenu();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

// Delete a project
function deleteProject() {
  console.log('\n===== Delete Project =====');
  rl.question('Enter project ID to delete: ', (id) => {
    db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting project:', err);
      } else {
        if (this.changes > 0) {
          console.log(`Project with ID ${id} deleted successfully`);
        } else {
          console.log(`No project found with ID: ${id}`);
        }
      }
      showMenu();
    });
  });
}

// Run custom SQL query
function runCustomQuery() {
  console.log('\n===== Run Custom SQL Query =====');
  console.log('Enter your SQL query (be careful, this executes directly on the database):');
  rl.question('> ', (query) => {
    if (query.trim().toLowerCase().startsWith('select')) {
      // For SELECT queries, use db.all to return results
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error('Error executing query:', err);
        } else {
          console.log('Query results:');
          console.log(rows);
        }
        showMenu();
      });
    } else {
      // For other queries (INSERT, UPDATE, DELETE), use db.run
      db.run(query, function(err) {
        if (err) {
          console.error('Error executing query:', err);
        } else {
          console.log(`Query executed successfully. Rows affected: ${this.changes}`);
        }
        showMenu();
      });
    }
  });
}

// Backup database
function backupDatabase() {
  console.log('\n===== Backup Database =====');
  const backupDir = path.join(__dirname, 'backups');
  
  // Create backups directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `portfolio-backup-${timestamp}.db`);
  
  // Create a read stream from the source database
  const source = fs.createReadStream('./portfolio.db');
  // Create a write stream to the backup file
  const dest = fs.createWriteStream(backupFile);
  
  // Pipe the source to the destination
  source.pipe(dest);
  
  source.on('error', (err) => {
    console.error('Error backing up database:', err);
    showMenu();
  });
  
  dest.on('finish', () => {
    console.log(`Database successfully backed up to: ${backupFile}`);
    showMenu();
  });
}

// Handle application exit
process.on('SIGINT', () => {
  console.log('\nClosing database connection...');
  db.close();
  rl.close();
  process.exit(0);
}); 