const db = require("../database/models")

const Users = db.Users;

const index = async (req, res) => {
    try {
        const result = await Users.findAndCountAll()
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const show = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Users.findOne({
            where: {
                id: id
            }
        });
        const result = data ? data : `${id} not found in db`
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'An error occurred while deleting user' });
  }
}

module.exports = { index, show, destroy };
