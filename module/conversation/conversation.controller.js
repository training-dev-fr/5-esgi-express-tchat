const Conversation = require('./conversation.model.js');
const User = require('./../user/user.model.js');
const Message = require('./../message/message.model.js');


exports.getAll = async (req, res) => {
    let conversationList = await Conversation.findAll({
        include: [{
            model: User,
            through: {attributes : []},
            attributes: [],
            required: true,
            where: {
                id: req.token.userId
            },
            as: "filter"
        },{
            model: User,
            as: "users",
            attributes: {exclude: ["password"]},
            through: {attributes : []},
            required: false
        }]
    });
    res.status(200).json(conversationList);
}

exports.getById = async (req, res) => {
    let conversation = await Conversation.findOne({
        where: {
            id: req.params.id
        }, include: [{
            model: User,
            through: {attributes : []},
            attributes: [],
            required: true,
            where: {
                id: req.token.userId
            },
            as: "filter"
        },{
            model: Message
        }]
    });
    res.status(200).json(conversation);
}

exports.create = async (req, res) => {
    let conversation = await Conversation.create(req.body);
    let author = await User.findOne({
        where: {
            id: req.token.userId
        }
    });
    conversation.addUser(author);
    let recipient = await User.findOne({
        where: {
            id: req.body.userId
        }
    });
    conversation.addUser(recipient);

    res.status(201).json(conversation);
}

exports.send = async (req, res) => {

}
