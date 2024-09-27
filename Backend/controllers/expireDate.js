import Expire  from '../models/expirationModel';
const updateExpire = async (req, res) => {
    try {
        const { id } = req.params;
        const { Expire_name, start_date, end_date, project_id } = req.body;

        // Update the expire record
        const [updatedRows] = await Expire.update(
            { Expire_name, start_date, end_date, project_id },
            { where: { id } }
        );

        if (updatedRows === 0) {
            return res.status(500).json({ error: 'Expire not found' });
        }

        // Fetch the updated record
        const updatedExpire = await Expire.findOne({ where: { id } });
        if (!updatedExpire) {
            return res.status(500).json({ error: 'Expire not found' });
        }
        // Return the updated record
        res.json(updatedExpire);
    } catch (error) {
        console.error('Error updating Expire:', error);
        res.status(500).json({ error: 'Error updating Expire' });
    }
};


const deleteExpire = async (req, res) => {
    try {
        const { project_id } = req.params;

        // Find the expire record by project_id
        const expire = await Expire.findOne({ where: { project_id } });
        if (!expire) {
            return res.status(500).json({ error: 'Expire not found' });
        }

        await expire.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting Expire' });
    }
};


export { updateExpire, deleteExpire };
