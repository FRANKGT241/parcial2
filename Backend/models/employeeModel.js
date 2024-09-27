import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Employee = sequelize.define('Employee', {
    employee_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone_number: DataTypes.STRING(15),
    hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    job_title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    department:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    salary:{
         type: DataTypes.DECIMAL(10,5),
         allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    tableName: 'employees',
});

export default Employee;
