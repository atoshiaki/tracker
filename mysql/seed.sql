SELECT * FROM department;

INSERT INTO department (name)
VALUES ('Boss'), ('Marketing'), ('Engineering');
SELECT * FROM role;

INSERT INTO role (title, salary, department_id)
VALUES('Boss', 0, 1),  ('Marketing Lead', 100,c2),  ('Lead Engineer',c200, 3);

SELECT
    CONCAT(first_name, ' ', last_name) AS 'name'
    FROM employee;
SELECT * FROM employee;

INSERT INTO employee (first_name, last_name, role_id)
VALUES('Anthony', 'Di Leonardo', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Robbie', 'Castillo',c2 , 1), ('Ashley', 'Tolbertson', 3, 1);

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
	c1.id AS 'ID',
	c1.first_name AS 'First Name',
    c1.last_name AS 'Last Name',
    CONCAT(c2.first_name, ' ', c2.last_name) AS 'Manager'
FROM employee c1
INNER JOIN employee c2 ON c1.manager_id = c2.id;

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
	c1.id AS 'ID',
	c1.first_name AS 'First Name',
    c1.last_name AS 'Last Name',
	department.name AS 'Department',
    role.title AS 'Role',
    role.salary AS 'Salary',
	CONCAT(c2.first_name, ' ', c2.last_name) AS 'Manager'
FROM department
INNER JOIN role ON department.id = role.department_id
INNER JOIN employee c1 ON role.id = c1.role_id
LEFT JOIN employee c2 ON c1.manager_id = c2.id;

SELECT
	*
FROM employee
GROUP BY id;

SELECT * FROM role;
DELETE FROM role WHERE id = 9;

SELECT
	c1.id AS 'ID',
	c1.first_name AS 'First Name',
    c1.last_name AS 'Last Name',
	department.name AS 'Department',
    role.title AS 'Role',
    role.salary AS 'Salary',
	CONCAT(c2.first_name, ' ', c2.last_name) AS 'Manager'
FROM department
INNER JOIN role ON department.id = role.department_id
LEFT JOIN employee c1 ON role.id = c1.role_id
LEFT JOIN employee c2 ON c1.manager_id = c2.id
WHERE department.id =c2;

SELECT SUM(role.salary) FROM role;

SELECT
	department.name,
    SUM(role.salary) AS 'Department Budget'
FROM department
INNER JOIN role ON department.id = role.department_id
LEFT JOIN employee c1 ON role.id = c1.role_id
LEFT JOIN employee c2 ON c1.manager_id = c2.id
GROUP BY department.id;

SELECT
	SUM(role.salary)
FROM role
INNER JOIN department ON department.id = role.department_id
LEFT JOIN employee ON role.id = employee.role_id;

UPDATE employee
SET role_id =c2,
	manager_id = 1
WHERE id =c2;

DELETE FROM employee WHERE id =c2;
DELETE FROM role WHERE id =c2;
DELETE FROM department WHERE id =c2;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

SELECT id, title FROM role;
SELECT id,
    CONCAT(first_name, ' ', last_name) AS 'name'
    FROM employee;