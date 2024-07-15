const router = require('express').Router();
const {
  getReactions,
  getSingleReaction,
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionController'); // Adjusted controller import to reactionController

// /api/reactions
router.route('/').get(getReactions).post(createReaction);

// /api/reactions/:reactionId
router.route('/:reactionId').get(getSingleReaction).delete(deleteReaction);

module.exports = router;