const express = require('express');
const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getAnalytics,
} = require('../controllers/leadController');
const auth = require('../middleware/auth');
const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/', getLeads);
router.post('/', createLead);

// Analytics route must come before :id route
router.get('/analytics', getAnalytics);

router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
