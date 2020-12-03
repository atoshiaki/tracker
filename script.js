const anime = `
                 ⠄⠄⠄⢀⣤⣾⣿⡟⠋⠄⠄⠄⣀⡿⠄⠊⠄⠄⠄⠄⠄⠄⢸⠇⠄⢀⠃⠙⣿⣿
                ⣤⠒⠛⠛⠛⠛⠛⠛⠉⠉⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠸⠄⢀⠊⠄⠄⠈⢿
                ⣿⣠⠤⠴⠶⠒⠶⠶⠤⠤⣤⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⠃⠄⠂⣀⣀⣀⡀⠄
                ⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠙⠂⠄⠄⠄⠄⠄⠄⢀⢎⠐⠛⠋⠉⠉⠉⠉⠛
                ⡇⠄⠄⠄⣀⡀⠄⠄⠄⢀⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠎⠁⠄⠄⠄⠄⠄⠄⠄⠄
                ⡧⠶⣿⣿⣿⣿⣿⣿⠲⠦⣭⡃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⡀⠄⠄⠄⠄⠄⠄
                ⡇⠄⣿⣿⣿⣿⣿⣿⡄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢰⣾⣿⣿⣿⡟⠛⠶⠄
                ⡇⠄⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣼⣿⣿⣿⣿⡇⠄⠄⢀
                ⡇⠄⢿⣿⣿⣿⣿⣷⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⡇⠄⠄⢊
                ⢠⠄⠈⠛⠛⠛⠛⠋⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢿⣿⣿⣿⡦⠁⠄⠄⣼
                ⢸⠄⠈⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠉⠉⠄⠄⠄⠄⢰⣿
                ⢸⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠁⠉⠄⢸⣿
                ⠄⣆⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣿
                ⠄⢿⣷⣶⣄⡀⠄⠄⠄⠄⠄⠄⠉⠉⠉⠉⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣴⣿⣿
                ⠄⢸⣿⣿⣿⣿⣷⣦⣤⣀⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣀⣠⣤⣶⣿⣿⣿⣿⣿
`
const roleObj = [];
const employeeObj = [];
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "trackerDB"
});

const employeeInfo = `SELECT id, CONCAT(first_name, ' ', last_name) AS 'name' FROM employee`;
const department = `SELECT id AS 'ID' ,department.name AS 'Department' FROM department`;

const selectRole = `
SELECT
  role.id AS 'ID',
  role.title AS 'Title',
  department.name AS 'Department',
  role.salary AS 'Salary'
FROM department
INNER JOIN role ON department.id = role.department_id`;

const selectEmployee = `
SELECT
  a1.id AS 'ID',
  a1.first_name AS 'FirstName',
  a1.last_name AS 'LastName',
  department.name AS 'Department',
  role.title AS 'Role',
  role.salary AS 'Salary',
  CONCAT(a2.first_name, ' ', a2.last_name) AS 'Manager'
FROM department
INNER JOIN role ON department.id = role.department_id
INNER JOIN employee a1 ON role.id = a1.role_id
LEFT JOIN employee a2 ON a1.manager_id = a2.id
`;

const selectBudget = `
SELECT
  department.name AS 'Department',
  SUM(role.salary) AS 'Budget'
FROM department
INNER JOIN role ON department.id = role.department_id
LEFT JOIN employee a1 ON role.id = a1.role_id
LEFT JOIN employee a2 ON a1.manager_id = a2.id
GROUP BY department.id;
`;

db.connect(function(err) {
    if(err) throw err;
    console.table(anime);
    console.table('Welcome to Employee Information Tracker System');
    mainOption();
});
const mainOption = () => {
  inquirer.prompt({
      name: 'main',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View', 'Add','Update' ,'Delete', 'End']
  })
  .then((chosen) => {
      switch(chosen.main) {
          case 'View':
              viewFunction();
          break;
          case 'Add':
              addFunction();
          break;
          case 'Update':
              updateFunction();
          break;
          case 'Delete':
              deleteFunction();
          break;
          default:
              console.log('End');
              db.end();
      }
  });
}

const viewFunction = () => {
  inquirer
      .prompt({
          name: 'view',
          type: 'list',
          message: 'What information would you like to view?',
          choices: ['Department' ,'Role' ,'Employee' ,'View employee by manager' ,'View department budget' ,'Back']
      })
      .then((chosen) => {
          switch(chosen.view) {
              case 'Department':
                  viewDepartment();
              break;
              case 'Role':
                  viewRole();
              break;
              case 'Employee':
                  viewEmployee();
              break;
              case 'View employee by manager':
                  chooseManager();
              break;
              case 'View department budget':
                  viewDepartmentBudget();
              break;
              default:
                  mainOption();
          }
      });
}

const viewDepartment = () => {
  db.query(department, function(err, res) {
      if(err) throw err;
      console.table(res);
      mainOption();
  });
}

const viewRole = () => {
  db.query(selectRole,function(err, res) {
      if(err) throw err;
      console.table(res);
      mainOption();
  });
}

const viewEmployee = () => {
  db.query(selectEmployee, function(err, res) {
      if(err) throw err;
      console.table(res);
      mainOption();
  });
}

const chooseManager = () => {
  db.query(employeeInfo,
      function(err, res) {
          if(err) throw err;
          inquirer
              .prompt({
                  name: 'manager',
                  type: 'rawlist',
                  message: 'choose manager',
                  choices: () => {
                      const list = [];
                      for(let i = 0; i < res.length; i++) {
                          list.push(res[i]);
                      }
                      return list;
                  }
              })
              .then((chosen) => {
                  const managerId = findId(chosen.manager, res);
                  db.query(`SELECT id FROM employee WHERE id = ?`, managerId , function(err, res) {
                      if(err) throw err;
                      viewEmployeeByManager(res);
                  });
              });
      });

}
const viewEmployeeByManager = (manager) => {
  db.query(`
  SELECT
      employee.id AS 'ID',
      employee.first_name AS 'First Name',
      employee.last_name AS 'Last Name',
      department.name AS 'Department',
      role.title AS 'Role',
      role.salary AS 'Salary'
  FROM department
  INNER JOIN role ON department.id = role.department_id
  INNER JOIN employee ON role.id = employee.role_id
  WHERE manager_id = ?;
  `,manager[0].id , function(err, res) {
      if(err) throw err;
      console.table(res);
      mainOption();
  })
}

const viewDepartmentBudget = () => {
  db.query(selectBudget,function (err, res) {
      if(err) throw err;
      console.table(res);
      mainOption();
  });
}

const addFunction = () => {
  inquirer
      .prompt({
          name: 'add',
          type: 'list',
          message: 'In what area would you like to add data?',
          choices: ['Department', 'Role', 'Employee', 'Back']
      })
      .then((chosen) => {
          switch(chosen.add) {
              case 'Department':
                  addDepartment();
              break;
              case 'Role':
                  addRole();
              break;
              case 'Employee':
                  addEmployee();
              break;
              default:
                  mainOption();
          }
      });
}
