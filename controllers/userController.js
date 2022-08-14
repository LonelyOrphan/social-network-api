const { User, Thought } = require("../models");

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select("-__v")
      .lean()
      .then(async (User) =>
        !User
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json({
              User,
              grade: await grade(req.params.UserId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.UserId })
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No such User exists" })
          : Course.findOneAndUpdate(
              { Users: req.params.UserId },
              { $pull: { Users: req.params.UserId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: "User deleted, but no courses found",
            })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a User
  addAssignment(req, res) {
    console.log("You are adding an assignment");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No User found with that ID :(" })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a User
  removeAssignment(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No User found with that ID :(" })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
};
