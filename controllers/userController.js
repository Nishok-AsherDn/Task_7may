const users = require('../data/users');

exports.getUsers = (req,res) =>{
    res.status(200).json({
        success: true,
        data: users
    });
};
exports.getUserById = (req,res) =>{
    const id= parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message:'User not found'});
    }
    res.status(200).json({
        success: true,
        data: user
    });
};
exports.createUser = (req,res) => {
    const { name, role } = req.body;

    if(!name || !role){
        return res.status(400).json({
            success: false,
            message: 'Name and Role are required!!'});
    }
    const newUser ={
        id: users.length ? users[users.length - 1].id +1:1,
        name,
        role
    };
    users.push(newUser);
    res.status(201).json({
        success: true,
        data:newUser
    });
};
exports.updateUser = (req,res) => {
    const id = parseInt(req.params.id);
    const { name, role } = req.body;

    const user= users.find(u => u.id === id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found!'});
    }
    if(name) user.name = name;
    if(role) user.role = role;
    res.status(200).json({
        success: true,
        data: user
    });
};
exports.deleteUser = (req,res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if(index === -1){
        return res.status(404).json({
            success: false,
            message: 'User not found!'});
    }
    users.splice(index, 1);
    res.status(200).json({
        success: true,
        data: 'User deleted successfully'});
};
exports.searchUsers= (req,res) => {
    const name= req.query.name;
    if(!name) {
        return res.status(400).json({
            success: false,
            message: 'Name query is required'});
    }
    const result = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    res.status(200).json({
        success: true,
        data: result});
};