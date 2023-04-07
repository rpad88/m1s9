const Task = require("../../../src/models/Task")

async function findTasks (req, res) {
    const allTasks = await Task.findAll({where: {
       user_id: req.body.user_id
    }})
    console.log(allTasks)
    res.status(200).json(allTasks)
 }
 module.exports = findTasks