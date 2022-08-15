const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//  /api/Users/:UserId/friends POST new Friend
router.route("/:userId/friends/:friendId").post(createFriend);

// /api/users/:UserId/friends/:friendId DELETE Friend by ID
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
