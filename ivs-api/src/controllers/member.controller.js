const { Member } = require('../models');
const { param, body, validationResult } = require('express-validator');

const get = async (req, res) => {
    try {
        await param('email').isEmail().run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send('invalid email');
        }

        const { email } = req.params;
        const member = await Member.findOne({ where: { email } });
        if (!member) {
            return res.status(404).send('member not found');
        }

        res.status(200).json(member.toJSON());
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal server error');
    }
};

const getList = async (req, res) => {
    try {
        const members = await Member.findAll();
        res.status(200).json(members.map(m => m.name));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal server error');
    }
};

const create = async (req, res) => {
    try {
        await body('name').trim().notEmpty().run(req);
        await body('email').isEmail().run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send('some inputs are invalid');
        }

        const { name, email } = req.body;
        const member = await Member.create({ name, email });
        res.status(201).json(member.toJSON());
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal server error');
    }
};

module.exports = {
    get,
    getList,
    create
};