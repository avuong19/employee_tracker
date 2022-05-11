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
            promptUser();
        })
    })
}





