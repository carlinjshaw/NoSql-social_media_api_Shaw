const { User } = require('../models');

const userController = {
  // get all pizzas
  getAllUsers(req, res) {
    User.find({})
      // .populate({
      //   path: 'users',
      //   select: '-__v'
      // })
      // .select('-__v')
      // .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })

      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createPizza
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

// update pizza by id
updateUser({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

//update by adding friend
addFriendToUser({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.userId }, {$addToSet: {friends: params.friendId}}, { new: true, runValidators: true})
.then(dbUserData => {
  if (!dbUserData) {
    res.status(404).json({ message: 'No user found with this id!' });
    return;
  }
  User.findOneAndUpdate({ _id: params.friendId}, {$addToSet: {friends: params.userId}}, { new: true, runValidators: true})
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
  res.json(dbUserData);
})
})
.catch(err => res.status(400).json(err));
},

deleteFriend({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.userId }, {$pull: {friends: params.friendId}}, { new: true, runValidators: true})
.then(dbUserData => {
  if (!dbUserData) {
    res.status(404).json({ message: 'No user found with this id!' });
    return;
  }
  User.findOneAndUpdate({ _id: params.friendId }, {$pull: {friends: params.userId}}, { new: true, runValidators: true})
.then(dbUserData => {
  if (!dbUserData) {
    res.status(404).json({ message: 'No user found with this id!' });
    return;
  }
  res.json(dbUserData);
})
})
.catch(err => res.status(400).json(err));
},

  // delete pizza
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;
