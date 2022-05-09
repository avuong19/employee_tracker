INSERT INTO department(dept_name)
VALUES
('Engineering'), 
('Legal'),
('Finance');

INSERT INTO role(title, salary, dept_id)
VALUES
('Civil Engineer', 124000 , 1), 
('Lawyer', 125000, 2),
('Accountant', 90000, 3);


INSERT INTO employee (first_name, last_name, role_id, mangager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 2, null),
  ('Piers', 'Gaveston', 3, 2),
  ('Charles', 'LeRoi', 1, 3),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 2),
  ('Edward', 'Bellamy', 3, 3),
  ('Montague', 'Summers', 2, 1),
  ('Octavia', 'Butler', 1, 2),
  ('Unica', 'Zurn', 2, null);