const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
const promptUser = () => {
    inquirer.prompt([{
            name: 'choices',
            type: 'list',
            message: 'Select an option',
            choices: [
                'View Employees',
                'View Department ',
                'View all Role',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role'
            ]

        }]).then((answers) => {
        const {selection} = answers;
        if (selection === 'View Employees') {
            viewEmployee();
        }

    })
}

const viewEmployee =() =>{
    const sql = 'select employee.first_name, employee.last_name, role.title, role.salary, department.dept_name as 'department' from employee, role, department where  department.id=role.dept_id and role.id = employee.role_id;'

    console.table (sql);
}


promptUser();



