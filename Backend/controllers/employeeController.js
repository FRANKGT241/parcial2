import Employee from '../models/employeeModel.js';

const createEmployee = async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: 'Campos invalidos' });
        }
        const employee = await Employee.create({ ...req.body, is_active: 1 });
        res.status(201).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en creacion' });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (employee) {
            await employee.update(req.body);
            const updatedEmployee = await Employee.findByPk(id);
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating employee' });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id);

        if (employee) {
            await employee.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting employee' });
    }
};

export { createEmployee, getEmployees, updateEmployee, deleteEmployee };
