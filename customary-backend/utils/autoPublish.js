const Marriage = require('../models/marriage'); // Adjust the path if needed

async function autoPublish() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await Marriage.updateMany(
      {
        status: 'pending',
        createdAt: { $lte: thirtyDaysAgo },
      },
      { $set: { status: 'published' } }
    );

    console.log(`Auto-publish: Updated ${result.modifiedCount} marriages.`);
  } catch (error) {
    console.error('Auto-publish error:', error);
  }
}

module.exports = autoPublish;
