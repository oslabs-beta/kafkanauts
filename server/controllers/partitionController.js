const axios = require('axios');
const partitionController = {};

partitionController.totalPartitionCount = async (req, res, next) => {
  try {
    const { data } = await axios.get(`http://localhost:${promPort}/api/v1/query?query=`);
    res.locals.totalPartitionCount = data;
    return next();
  } catch (err) {
    return next(err);
  }
}

partitionController.offlinePartitionCount = async (req, res, next) => {
    
}

module.exports = partitionController;