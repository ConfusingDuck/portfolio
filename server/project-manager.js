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
  
  // Make sure the table exists
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
      process.exit(1);
    }
    showMenu();
  });
});

// Clear the screen for better readability
function clearScreen() {
  console.clear();
  console.log('=== PORTFOLIO PROJECT MANAGER ===\n');
}

// Display menu
function showMenu() {
  clearScreen();
  console.log('What would you like to do?\n');
  console.log('1) View all projects');
  console.log('2) Add a new project');
  console.log('3) Edit a project');
  console.log('4) Delete a project');
  console.log('5) Exit\n');
  
  rl.question('Enter your choice (1-5): ', (answer) => {
    switch(answer) {
      case '1':
        viewAllProjects();
        break;
      case '2':
        addNewProject();
        break;
      case '3':
        chooseProjectToEdit();
        break;
      case '4':
        chooseProjectToDelete();
        break;
      case '5':
        console.log('\nGoodbye! Don\'t forget to restart your server if it\'s running.\n');
        db.close();
        rl.close();
        break;
      default:
        console.log('\nInvalid option! Press Enter to continue...');
        rl.question('', () => showMenu());
    }
  });
}

// View all projects
function viewAllProjects() {
  clearScreen();
  console.log('=== ALL PROJECTS ===\n');
  
  db.all('SELECT * FROM projects', [], (err, projects) => {
    if (err) {
      console.error('Error fetching projects:', err);
      pressEnterToContinue();
      return;
    }
    
    if (projects.length === 0) {
      console.log('No projects found in the database.\n');
    } else {
      projects.forEach((project, index) => {
        console.log(`[${project.id}] ${project.title}`);
        console.log(`    Description: ${project.description || 'N/A'}`);
        console.log(`    Image: ${project.image_url || 'N/A'}`);
        console.log(`    GitHub: ${project.github_url || 'N/A'}`);
        console.log(`    Demo: ${project.live_url || 'N/A'}`);
        console.log(`    Technologies: ${project.technologies || 'N/A'}`);
        console.log('');
      });
    }
    
    pressEnterToContinue();
  });
}

// Helper for "press enter to continue"
function pressEnterToContinue() {
  rl.question('\nPress Enter to return to the menu...', () => showMenu());
}

// Add a new project with a guided form
function addNewProject() {
  clearScreen();
  console.log('=== ADD NEW PROJECT ===\n');
  console.log('Please enter the project details (press Enter to skip optional fields):\n');
  
  rl.question('Title: ', (title) => {
    if (!title.trim()) {
      console.log('\nTitle is required!');
      setTimeout(addNewProject, 1500);
      return;
    }
    
    rl.question('Description: ', (description) => {
      rl.question('Image URL (e.g., /images/project.png): ', (image_url) => {
        rl.question('GitHub URL: ', (github_url) => {
          rl.question('Demo URL: ', (live_url) => {
            rl.question('Technologies (comma-separated, e.g., React,Node.js,CSS): ', (technologies) => {
              
              const sql = `INSERT INTO projects 
                (title, description, image_url, github_url, live_url, technologies) 
                VALUES (?, ?, ?, ?, ?, ?)`;
              
              db.run(sql, [title, description, image_url, github_url, live_url, technologies], function(err) {
                clearScreen();
                
                if (err) {
                  console.error('Error adding project:', err);
                } else {
                  console.log(`✅ Project "${title}" added successfully!\n`);
                  console.log('Project details:');
                  console.log(`ID: ${this.lastID}`);
                  console.log(`Title: ${title}`);
                  console.log(`Description: ${description || 'N/A'}`);
                  console.log(`Image: ${image_url || 'N/A'}`);
                  console.log(`GitHub: ${github_url || 'N/A'}`);
                  console.log(`Demo: ${live_url || 'N/A'}`);
                  console.log(`Technologies: ${technologies || 'N/A'}`);
                }
                
                setTimeout(() => {
                  rl.question('\nAdd another project? (y/n): ', (answer) => {
                    if (answer.toLowerCase() === 'y') {
                      addNewProject();
                    } else {
                      showMenu();
                    }
                  });
                }, 500);
              });
            });
          });
        });
      });
    });
  });
}

// Choose a project to edit
function chooseProjectToEdit() {
  clearScreen();
  console.log('=== EDIT PROJECT ===\n');
  
  db.all('SELECT id, title FROM projects ORDER BY id', [], (err, projects) => {
    if (err) {
      console.error('Error fetching projects:', err);
      pressEnterToContinue();
      return;
    }
    
    if (projects.length === 0) {
      console.log('No projects found to edit.');
      pressEnterToContinue();
      return;
    }
    
    console.log('Select a project to edit:\n');
    projects.forEach(project => {
      console.log(`[${project.id}] ${project.title}`);
    });
    console.log('');
    
    rl.question('Enter project ID (or 0 to cancel): ', (id) => {
      id = parseInt(id);
      
      if (id === 0) {
        showMenu();
        return;
      }
      
      const project = projects.find(p => p.id === id);
      if (!project) {
        console.log('\nInvalid project ID!');
        setTimeout(chooseProjectToEdit, 1500);
        return;
      }
      
      editProject(id);
    });
  });
}

// Edit a specific project
function editProject(id) {
  db.get('SELECT * FROM projects WHERE id = ?', [id], (err, project) => {
    if (err) {
      console.error('Error fetching project:', err);
      pressEnterToContinue();
      return;
    }
    
    if (!project) {
      console.log(`No project found with ID: ${id}`);
      pressEnterToContinue();
      return;
    }
    
    clearScreen();
    console.log(`=== EDITING PROJECT: ${project.title} ===\n`);
    console.log('Enter new values (or press Enter to keep current values):\n');
    
    rl.question(`Title [${project.title}]: `, (title) => {
      title = title.trim() || project.title;
      
      rl.question(`Description [${project.description || 'N/A'}]: `, (description) => {
        description = description.trim() || project.description;
        
        rl.question(`Image URL [${project.image_url || 'N/A'}]: `, (image_url) => {
          image_url = image_url.trim() || project.image_url;
          
          rl.question(`GitHub URL [${project.github_url || 'N/A'}]: `, (github_url) => {
            github_url = github_url.trim() || project.github_url;
            
            rl.question(`Demo URL [${project.live_url || 'N/A'}]: `, (live_url) => {
              live_url = live_url.trim() || project.live_url;
              
              rl.question(`Technologies [${project.technologies || 'N/A'}]: `, (technologies) => {
                technologies = technologies.trim() || project.technologies;
                
                const sql = `UPDATE projects 
                  SET title = ?, description = ?, image_url = ?, github_url = ?, live_url = ?, technologies = ? 
                  WHERE id = ?`;
                
                db.run(sql, [title, description, image_url, github_url, live_url, technologies, id], function(err) {
                  clearScreen();
                  
                  if (err) {
                    console.error('Error updating project:', err);
                  } else {
                    console.log(`✅ Project updated successfully!\n`);
                    console.log('New project details:');
                    console.log(`ID: ${id}`);
                    console.log(`Title: ${title}`);
                    console.log(`Description: ${description || 'N/A'}`);
                    console.log(`Image: ${image_url || 'N/A'}`);
                    console.log(`GitHub: ${github_url || 'N/A'}`);
                    console.log(`Demo: ${live_url || 'N/A'}`);
                    console.log(`Technologies: ${technologies || 'N/A'}`);
                  }
                  
                  pressEnterToContinue();
                });
              });
            });
          });
        });
      });
    });
  });
}

// Choose a project to delete
function chooseProjectToDelete() {
  clearScreen();
  console.log('=== DELETE PROJECT ===\n');
  
  db.all('SELECT id, title FROM projects ORDER BY id', [], (err, projects) => {
    if (err) {
      console.error('Error fetching projects:', err);
      pressEnterToContinue();
      return;
    }
    
    if (projects.length === 0) {
      console.log('No projects found to delete.');
      pressEnterToContinue();
      return;
    }
    
    console.log('Select a project to delete:\n');
    projects.forEach(project => {
      console.log(`[${project.id}] ${project.title}`);
    });
    console.log('');
    
    rl.question('Enter project ID (or 0 to cancel): ', (id) => {
      id = parseInt(id);
      
      if (id === 0) {
        showMenu();
        return;
      }
      
      const project = projects.find(p => p.id === id);
      if (!project) {
        console.log('\nInvalid project ID!');
        setTimeout(chooseProjectToDelete, 1500);
        return;
      }
      
      confirmDelete(id, project.title);
    });
  });
}

// Confirm project deletion
function confirmDelete(id, title) {
  clearScreen();
  console.log(`=== DELETE PROJECT: ${title} ===\n`);
  
  rl.question(`Are you sure you want to delete "${title}"? (yes/no): `, (answer) => {
    if (answer.toLowerCase() === 'yes') {
      db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
        clearScreen();
        
        if (err) {
          console.error('Error deleting project:', err);
        } else {
          console.log(`✅ Project "${title}" deleted successfully!`);
        }
        
        pressEnterToContinue();
      });
    } else {
      console.log('\nDeletion cancelled.');
      pressEnterToContinue();
    }
  });
}

// Handle application exit
process.on('SIGINT', () => {
  console.log('\nClosing database connection...');
  db.close();
  rl.close();
  process.exit(0);
}); 