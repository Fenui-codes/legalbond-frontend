const express = require('express');
const router = express.Router();

const { getMarriageById } = require('../controllers/marriageController');


const upload = require('../middleware/upload'); // correct path
const {
  registerMarriage,
  getAllMarriages,
  fileObjection
} = require('../controllers/marriageController');

const { likeMarriage, objectMarriage } = require('../controllers/marriageController');

router.post('/:id/like', likeMarriage);
router.post('/:id/object-count', objectMarriage);

// Define the multer upload fields middleware
const uploadFields = upload.fields([
  { name: 'couplePhoto', maxCount: 1 },
  { name: 'husbandIdCard', maxCount: 1 },
  { name: 'wifeIdCard', maxCount: 1 },
  { name: 'witnessIdCards', maxCount: 10 }
]);

// POST /api/marriages/register — Register a marriage with file uploads
router.post('/register', uploadFields, registerMarriage);

// GET /api/marriages — Get all marriages
router.get('/', getAllMarriages);

// POST /api/marriages/:marriageId/objection — File an objection
router.post('/:marriageId/objection', fileObjection);

router.get('/:id', getMarriageById);

module.exports = router;
