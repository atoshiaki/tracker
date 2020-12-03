SELECT * FROM department;

INSERT INTO department (name)
VALUES ('Boss'), ('Marketing'), ('Engineering');
SELECT * FROM role;

INSERT INTO role (title, salary, department_id)
VALUES('Boss', 0, 1),  ('Marketing Lead', 100,a2),  ('Lead Engineer',a200, 3);

SELECT
    CONCAT(first_name, ' ', last_name) AS 'name'
    FROM employee;
SELECT * FROM employee;

INSERT INTO employee (first_name, last_name, role_id)
VALUES('Anthony', 'Di Leonardo', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Robbie', 'Castillo',a2 , 1), ('Ashley', 'Tolbertson', 3, 1);

SELECT
	department.name AS 'Department',
	id
FROM department;

SELECT
	role.id,
	role.title AS 'Title',
	department.name AS 'Department',
    role.salary AS 'Salary'
FROM department
INNER JOIN role ON department.id = role.department_id;

SELECT
	a1.id AS 'ID',
	a1.first_name AS 'First Name',
    a1.last_name AS 'Last Name',
    CONCAT(a2.first_name, ' ', a2.last_name) AS 'Manager'
FROM employee a1
INNER JOIN employee a2 ON a1.manager_id = a2.id;

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
WHERE manager_id = 1;

SELECT id
    FROM employee
    WHERE id = 1;

SELECT
	a1.id AS 'ID',
	a1.first_name AS 'First Name',
    a1.last_name AS 'Last Name',
	department.name AS 'Department',
    role.title AS 'Role',
    role.salary AS 'Salary',
	CONCAT(a2.first_name, ' ', a2.last_name) AS 'Manager'
FROM department
INNER JOIN role ON department.id = role.department_id
INNER JOIN employee a1 ON role.id = a1.role_id
LEFT JOIN employee a2 ON a1.manager_id = a2.id;

SELECT
	*
FROM employee
GROUP BY id;

SELECT * FROM role;
DELETE FROM role WHERE id = 9;

SELECT
	a1.id AS 'ID',
	a1.first_name AS 'First Name',
    a1.last_name AS 'Last Name',
	department.name AS 'Department',
    role.title AS 'Role',
    role.salary AS 'Salary',
	CONCAT(a2.first_name, ' ', a2.last_name) AS 'Manager'
FROM department
INNER JOIN role ON department.id = role.department_id
LEFT JOIN employee a1 ON role.id = a1.role_id
LEFT JOIN employee a2 ON a1.manager_id = a2.id
WHERE department.id =a2;

SELECT SUM(role.salary) FROM role;

SELECT
	department.name,
    SUM(role.salary) AS 'Department Budget'
FROM department
INNER JOIN role ON department.id = role.department_id
LEFT JOIN employee a1 ON role.id = a1.role_id
LEFT JOIN employee a2 ON a1.manager_id = a2.id
GROUP BY department.id;

SELECT
	SUM(role.salary)
FROM role
INNER JOIN department ON department.id = role.department_id
LEFT JOIN employee ON role.id = employee.role_id;

UPDATE employee
SET role_id =a2,
	manager_id = 1
WHERE id =a2;

DELETE FROM employee WHERE id =a2;
DELETE FROM role WHERE id =a2;
DELETE FROM department WHERE id =a2;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

SELECT id, title FROM role;
SELECT id,
    CONCAT(first_name, ' ', last_name) AS 'name'
    FROM employee;