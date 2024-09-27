import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Employee from './employeeModel.js';
import Project from './projectModel.js';

const Assignment = sequelize.define('Assignment', {
    assignment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'employee_id'
        }
    },
    project_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key: 'project_id'
        }
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: DataTypes.DATEONLY
}, {
    timestamps: false
});

Employee.hasMany(Assignment, { foreignKey: 'employee_id' });
Project.hasMany(Assignment, { foreignKey: 'project_id' });
Assignment.belongsTo(Employee, { foreignKey: 'employee_id' });
Assignment.belongsTo(Project, { foreignKey: 'project_id' });

export default Assignment;
