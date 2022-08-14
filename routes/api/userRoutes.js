const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions POST new reaction
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId DELETE reaction by ID
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;