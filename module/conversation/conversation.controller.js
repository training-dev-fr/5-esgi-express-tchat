const Conversation = require('./conversation.model.js');

exports.getAll = async (req, res) => {
    let conversationList = await Conversation.findAll();
    res.status(200).json(conversationList);
}

exports.getById = async (req, res) => {
    let conversation =Conversation.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(conversation);
}

exports.create = async (req, res) => {
    let conversation = await Conversation.create(req.body);
    res.status(201).json(conversation);
}

exports.send = async (req, res) => {

}
