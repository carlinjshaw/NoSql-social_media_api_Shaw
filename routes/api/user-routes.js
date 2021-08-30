const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUser,
  deleteFriend
} = require('../../controllers/user-controller');

// /api/pizzas
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//
router
.route('/:userId/:friendId')
.put(addFriendToUser)
.delete(deleteFriend)

module.exports = router;
