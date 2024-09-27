// employeeController.test.js

import { createEmployee, getEmployees, updateEmployee, deleteEmployee } from './controllers/employeeController.js';
import Employee from './models/employeeModel.js';
import { jest } from '@jest/globals';

jest.mock('./models/employeeModel.js');

describe('Employee Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('createEmployee should return a 201 status and the created employee', async () => {
        const req = {
            body: {
                first_name: 'JuanitoPro',
                last_name: 'Doe',
                email: 'JuanitoPro@example.com',
                phone_number: '1234567890',
                hire_date: '2024-01-01',
                job_title: 'Software Engineer',
                department: 'Engineering',
                salary: 60000
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        const mockEmployee = { id: 1, ...req.body, is_active: 1 };
        Employee.create.mockResolvedValue(mockEmployee);
    
        await createEmployee(req, res);
    
        expect(Employee.create).toHaveBeenCalledWith({
            first_name: 'JuanitoPro',
            last_name: 'Doe',
            email: 'JuanitoPro@example.com',
            phone_number: '1234567890',
            hire_date: '2024-01-01',
            job_title: 'Software Engineer',
            department: 'Engineering',
            salary: 60000,
            is_active: 1 
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockEmployee);
    });
    
    

    test('Retonrar a todos los empleados', async () => {
        const req = {};
        const res = {
            json: jest.fn()
        };

        const mockEmployees = [{ id: 1, first_name: 'JuanitoPro', last_name: 'Doe', email: 'JuanitoPro.doe@example.com' }];
        Employee.findAll.mockResolvedValue(mockEmployees);

        await getEmployees(req, res);

        expect(Employee.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(mockEmployees);
    });


    test('Al actualizar debería dar un empleado actualizado', async () => {
        const req = {
            params: { id: 1 },  
            body: {  
                first_name: 'JuanitoPro',
                last_name: 'Smith',
                email: 'JuanitoPro.smith@example.com',
                phone_number: '1234567890',
                hire_date: '2024-01-01',
                job_title: 'Senior Engineer',
                department: 'Engineering',
                salary: 80000
            }
        };
        const res = {
            json: jest.fn(), 
            status: jest.fn().mockReturnThis()  
        };
    
        const mockEmployee = {
            id: 1,
            ...req.body,
            update: jest.fn().mockResolvedValue([1])
        };
    
        Employee.findByPk = jest.fn()
            .mockResolvedValueOnce(mockEmployee) 
            .mockResolvedValueOnce({             
                id: 1,
                ...req.body
            });
    
        await updateEmployee(req, res);
    
        expect(Employee.findByPk).toHaveBeenCalledTimes(2);
        expect(Employee.findByPk).toHaveBeenCalledWith(1);
        expect(mockEmployee.update).toHaveBeenCalledWith(req.body);
        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            ...req.body
        });
    });
    

    test('eliminar empleado deberia dar un 204', async () => {
        const req = {
            params: { id: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            end: jest.fn()
        };

        const mockEmployee = {
            id: 1,
            destroy: jest.fn().mockResolvedValue()
        };
        Employee.findByPk.mockResolvedValue(mockEmployee);

        await deleteEmployee(req, res);

        expect(Employee.findByPk).toHaveBeenCalledWith(1);
        expect(mockEmployee.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.end).toHaveBeenCalled();
    });

});
