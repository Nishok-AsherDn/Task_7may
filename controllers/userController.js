const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.createUser = async (req, res) => {
    try {
        const { name, role } = req.body;

        // validation
        if (!name || !role) {
            return res.status(400).json({
                success: false,
                message: "Name and role are required"
            });
        }

        // save to MongoDB
        const user = await User.create({ name, role });

        res.status(201).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const { name, role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.searchUsers = async (req, res) => {
    try {

        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name query is required"
            });
        }

        const users = await User.find({
            name: { $regex: name, $options: 'i' }
        });

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};