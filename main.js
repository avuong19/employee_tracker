const inquirer = require('inquirer');
const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'work'
}, console.log('Connected to the work database.'));

//require('dotenv').config();
const cTable = require('console.table');

db.connect(function(){
    console.log('Get Your Employees Information Here');
    promptUser()
});

const promptUser = () => {
    inquirer.prompt([{
            name: 'choices',
            type: 'list',
            message: 'Select an option',
            choices: [
                'View Employees',
                'View Department',
                'View all Role',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
                'Close'
            ]

        }]).then((answers) => {
        
        if (answers.choices === 'View Employees') {
            viewEmployee();
        }
        if (answers.choices === 'Close'){
            db.end();
        }
        if (answers.choices === 'View Department') {
            viewDepartment();
        }
        if (answers.choices === 'View all Role') {
            viewRole();
        }
        if (answers.choices === 'add a department') {
            addDept();
        }
        if (answers.choices === 'add a role') {
            addRole();
        }
        if (answers.choices === 'add an employee') {
            addEmployee();
        }
        if (answers.choices === 'update an employee role') {
            updateEmployeeRole();
        }

    })
}

const viewEmployee =() =>{
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, employee.mangager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.id = department.id;'

    db.query(sql,(err,res)=>{
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}
const viewDepartment =() =>{
    const sql = 'SELECT department.id, department.dept_name FROM department;'

    db.query(sql,(err,res)=>{
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}
const viewRole =() =>{
    const sql = 'SELECT role.id, role.title, role.salary, department.dept_name FROM role INNER JOIN department ON role.dept_id=department.id;'

    db.query(sql,(err,res)=>{
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}
const addDept =()=>{
    inquirer.prompt([{
        name: 'addDept',
        type: 'input',
        message: 'Please type in a new department (Require)',
        validate: addDeptInput => {
            if (addDeptInput) {
              return true;
            } else {
              console.log('Please enter a new department !');
              return false;
            }
          }

    }])
    .then (res =>{
        const sql ='insert into department (dept_name) values (?);';
        db.query(sql,res.addDept,(err,res)=>{
            if (err) throw err;
            console.table(res);
            viewDepartment();
            promptUser();
        })
    })
}
const addRole =()=>{
    inquirer.prompt([
        {
        name: 'addTitle',
        type: 'input',
        message: 'Please type in a new role title (Require)',
        validate: addTitleInput => {
            if (addTitleInput) {
              return true;
            } else {
              console.log('Please enter a new role title !');
              return false;
            }
          }

    },
    {
        name: 'addSalary',
        type: 'input',
        message: 'Please type in this new role salary (Require)',
        validate: addSalaryInput => {
            if (addSalaryInput) {
              return true;
            } else {
              console.log('Please enter this new role salary !');
              return false;
            }
          }

    },
    {
        name: 'addDeptId',
        type: 'input',
        message: 'What department does this role belonges to. Please enter its id',
        validate: addDeptId => {
            if (addDeptId) {
              return true;
            } else {
              console.log('Please enter a valid id !');
              return false;
            }
          }

    },
])
    .then (res =>{
        const sql ='INSERT INTO role (title, salary, dept_id) VALUES(?, ?, ?)';
        db.query(sql,[res.addTitle,res.addSalary,res.addDeptId],(err,res)=>{
            if (err) throw err;
            console.log('-----');
            console.table(res);
            viewRole();
            promptUser();
        })
    })
}
const addEmployee =()=>{
    inquirer.prompt([
        {
        name: 'addFirstName',
        type: 'input',
        message: 'Please type in employees first name (Required)',
        validate: addFirstNameInput => {
            if (addFirstNameInput) {
              return true;
            } else {
              console.log('Please enter employees first name !');
              return false;
            }
          }

    },
    {
        name: 'addLastName',
        type: 'input',
        message: 'Please type in employees last name (Require)',
        validate: addLastNameInput => {
            if (addLastNameInput) {
              return true;
            } else {
              console.log('Please enter employees last name !');
              return false;
            }
          }

    },
    
    {
        name: 'addRoleId',
        type: 'input',
        message: 'What is this employees role?. Please enter its id',
        validate: addRoleId => {
            if (addRoleId) {
              return true;
            } else {
              console.log('Please enter a valid id !');
              return false;
            }
          }

    },
    {
        name: 'addManagerId',
        type: 'input',
        message: ' Please enter this employees manager id',
        validate: addRoleId => {
            if (addRoleId) {
              return true;
            } else {
              console.log('Please enter a valid id !');
              return false;
            }
          }

    },
])
    .then (res =>{
        const sql ='INSERT INTO employee (first_name, last_name, role_id,  mangager_id) VALUES(?, ?, ?, ?)';
        db.query(sql,[res.addFirstName,res.addLastName,res.addRoleId,res.addManagerId],(err,res)=>{
            if (err) throw err;
            console.log('-----');
            console.table(res);
            viewEmployee();
            promptUser();
        })
    })
}
const updateEmployeeRole =() =>{
    
        inquirer.prompt([
            {
                name:'employeeId',
                type:'input',
                message:'Enter Employee ID',
                
            },
            {
                name:'pickedRole',
                type:'input',
                message:'Choose a new role',
                
            },
        ])
        .then (res =>{
            const sql ='Update employee set role_id = ? where id=?;'
            db.query(sql,[res.pickedRole,res.employeeId],(err,res)=>{
                if (err) throw err;
                console.log('-----');
                console.table(res);
                viewEmployee();
                promptUser();
            })
        })
    }








