import Project from '../models/projectModel.js';
import Expire from '../models/expirationModel.js'; // Import the Expire model

const createProject = async (req, res) => {
    try {
        const { project_name, start_date, end_date, completion_percentage } = req.body;

        // Basic validation check (you can add more complex validation as needed)
        if (!project_name || !start_date || !end_date || typeof completion_percentage !== 'number') {
            return res.status(400).json({ error: 'Validation error' });
        }

        // Create the project
        const project = await Project.create({
            project_name,
            start_date,
            end_date,
            completion_percentage,
            is_active: 1
        });

        // Create the expire record
        const expire = await Expire.create({
            expire_name: project_name,
            start_date,
            end_date,
            project_id: project.id,
            is_active: 1
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating project' });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching projects' });
    }
};

const updateProject = async (req, res) => {
    try {
        const { project_id } = req.params;
        const { project_name, start_date, end_date, completion_percentage } = req.body;

        const project = await Project.findByPk(project_id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update the project
        const updatedProject = await project.update({
            project_name,
            start_date,
            end_date,
            completion_percentage
        });

        res.json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating project' });
    }
};

const deleteProject = async (req, res) => {
    try {
        const { project_id } = req.params;
        const project = await Project.findByPk(project_id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Delete the project
        await project.destroy();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting project' });
    }
};

export { createProject, getProjects, updateProject, deleteProject };
