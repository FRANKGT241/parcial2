import express from 'express';
const router = express.Router();

import * as employeeController from '../controllers/employeeController.js';
import * as projectController from '../controllers/projectController.js';
import * as employeeProjectController from '../controllers/assignamentController.js';

// Rutas de empleados
router.post('/employee', employeeController.createEmployee);
router.get('/employees', employeeController.getEmployees);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

// Rutas de proyectos
router.post('/project', projectController.createProject);
router.get('/projects', projectController.getProjects);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// Rutas para asignar empleados a proyectos
router.post('/assignments', employeeProjectController.assignEmployeeToProject);

export default router;
