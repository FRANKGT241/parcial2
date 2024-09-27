import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
const Project = sequelize.define('Project', {
    project_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    project_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end_date: DataTypes.DATEONLY,
    completion_percentage: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.00
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    tableName: 'projects',
});


export default Project;
