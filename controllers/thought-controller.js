const { Thought } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    //   .populate({
    //     path: 'users',
    //     select: '-__v'
    //   })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

// update thought by id
updateThought({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

//add reaction to thought
addReaction({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.thoughtId }, 
    {$addToSet: {reactions: body}}, { new: true, runValidators: true})
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => res.status(400).json(err));
  },

//delete a reaction
deleteReaction({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.thoughtId }, {$pull: {reaction: params.reactionId}}, { new: true, runValidators: true})
.then(dbUserData => {
  if (!dbUserData) {
    res.status(404).json({ message: 'No user found with this id!' });
    return;
  }
  res.json(dbUserData);
})
.catch(err => res.status(400).json(err));
},

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
