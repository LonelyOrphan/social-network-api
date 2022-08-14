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

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/User/:UserId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//  /api/Users/:UserId/Friends POST new Friend
router.route("/:userId/friends").post(createFriend);

// /api/Users/:UserId/friends/:friendId DELETE Friend by ID
router.route("/:userId/friends/:friendId").delete(deleteFriend);

module.exports = router;
