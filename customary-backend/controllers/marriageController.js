const Marriage = require('../models/Marriage');

// POST /api/marriages/register
const registerMarriage = async (req, res) => {
  try {


    const {
      husbandName,
      wifeName,
      marriageDate,
      location,
      witnesses,
      councilType,
      councilName
    } = req.body;

  if (!councilType || !['residence', 'birth'].includes(councilType)) {
  return res.status(400).json({ error: "Invalid or missing 'councilType'. Must be 'residence' or 'birth'." });
}


    if (!councilName || typeof councilName !== 'string') {
      return res.status(400).json({ error: "'councilName' is required and must be a string." });
    }

    // Parse witnesses JSON
    let parsedWitnesses = [];
    try {
      parsedWitnesses = JSON.parse(witnesses);
    } catch (err) {
      parsedWitnesses = witnesses; // if already parsed (e.g. from Postman)
    }

    // Add witness ID cards 
    if (req.files.witnessIdCards) {
      parsedWitnesses = parsedWitnesses.map((witness, index) => ({
        ...witness,
        idCard: req.files.witnessIdCards[index]?.path || ''
      }));
    }

    const marriage = new Marriage({
      husbandName,
      wifeName,
      marriageDate,
      location,
      councilType,
      councilName,
      witnesses: parsedWitnesses,
      couplePhoto: req.files?.couplePhoto?.[0]?.path || '',
      husbandIdCard: req.files?.husbandIdCard?.[0]?.path || '',
      wifeIdCard: req.files?.wifeIdCard?.[0]?.path || ''
    });

    const savedMarriage = await marriage.save();
    res.status(201).json(savedMarriage);
  } catch (error) {
    console.error('Error registering marriage:', error);
    res.status(400).json({ error: error.message });
  }
};

// GET /api/marriages
const getAllMarriages = async (req, res) => {
  try {
    const { status, location, startDate, endDate, page = 1, limit = 10, sort } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (startDate || endDate) {
      filter.marriageDate = {};
      if (startDate) filter.marriageDate.$gte = new Date(startDate);
      if (endDate) filter.marriageDate.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOption = sort
      ? { [sort.replace('-', '')]: sort.startsWith('-') ? -1 : 1 }
      : { createdAt: -1 };

    const marriages = await Marriage.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Marriage.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: marriages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/marriages/:marriageId/objection
const fileObjection = async (req, res) => {
  const { marriageId } = req.params;
  const { reason, objectorName, objectorContact } = req.body;

  try {
    const marriage = await Marriage.findById(marriageId);
    if (!marriage) {
      return res.status(404).json({ error: 'Marriage not found' });
    }

    if (marriage.status !== 'pending') {
      return res.status(400).json({ error: 'Objections can only be filed on pending marriages' });
    }

    marriage.objections.push({ reason, objectorName, objectorContact });
    marriage.status = 'objected';
    await marriage.save();

    res.json({ message: 'Objection filed successfully', marriage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/marriages/:id
const getMarriageById = async (req, res) => {
  try {
    const marriage = await Marriage.findById(req.params.id);

    if (!marriage) {
      return res.status(404).json({ error: 'Marriage not found' });
    }

    res.json(marriage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// POST /api/marriages/:id/like
const likeMarriage = async (req, res) => {
  try {
    const marriage = await Marriage.findById(req.params.id);
    if (!marriage) return res.status(404).json({ error: 'Marriage not found' });
    marriage.likes = (marriage.likes || 0) + 1;
    await marriage.save();
    res.json({ likes: marriage.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/marriages/:id/object-count
const objectMarriage = async (req, res) => {
  try {
    const marriage = await Marriage.findById(req.params.id);
    if (!marriage) return res.status(404).json({ error: 'Marriage not found' });
    marriage.objectionsCount = (marriage.objectionsCount || 0) + 1;
    await marriage.save();
    res.json({ objections: marriage.objectionsCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerMarriage,
  getAllMarriages,
  fileObjection,
  getMarriageById,
  likeMarriage,
  objectMarriage
};
