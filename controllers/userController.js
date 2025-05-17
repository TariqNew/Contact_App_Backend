//@desc Fetch All Users
//@route GET /api
//@access public
const getAllUsers = (req, res) => {
    res.status(200).json({ 'message': 'All the users' });
};

//@desc Fetch User with specific id
//@route GET /api/:id
//@access public
const getSingleUser = (req, res) => {
    res.status(200).json({ 'message': `The user with id ${req.params.id} is fetched` });
};

//@desc Create a user
//@route POST /api
//@access public
const createUser = (req, res) => {
    const { name, email, password } = req.body;
    res.status(200).json({ 'message': `${name}, ${email}, ${password}` });
};

//@desc Update a user
//@route PUT /api/:id
//@access public
const updateUser = (req, res) => {
    res.status(200).json({ 'message': `The user with id ${req.params.id} is updated` });
};

//@desc Delete User
//@route DELETE /api/:id
//@access public
const deleteUser = (req, res) => {
    res.status(200).json({ 'message': `The user with id ${req.params.id} is deleted` });
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
