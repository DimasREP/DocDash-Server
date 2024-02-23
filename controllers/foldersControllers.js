const db = require("../database/models")
const Folders = db.Folders;

const store = async (req, res) => {
    try {
        const save = await Folders.create(req.body)
        res.json(save).status(200)
    } catch (error) {       
        res.json(error).status(422)
    }
}

const index = async (req, res) => {
    try {
        const result = await Folders.findAndCountAll()
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const show = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Folders.findByPk(id)
        const result = data ? data : `${id} not found in db`
        res.json(result).status(200)
    } catch (error) {
        res.json(error).status(422)
    }
}

const update = (req, res) => {
    Folders.findByPk(req.params.id).then((emp) => {
        if(emp){
            emp.update(req.body)
            msg = emp
        }else{
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ msg: err.message });
    });
}

const destroy = (req, res) => {
    let msg
    Folders.findByPk(req.params.id).then((row) => {
        if(row){
            row.destroy()
            msg = "success deleted"
        }else{
            msg = `${req.params.id} not found in db`
        }
        res.json({ message: msg })
    }).catch((err) => {
        res.json({ message: err.message })
    })
}

module.exports = {
    index, show, store,
    update, destroy
}