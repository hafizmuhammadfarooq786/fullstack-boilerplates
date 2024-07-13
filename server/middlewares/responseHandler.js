const responseHandler = (req, res, next) => {
    res.sendSuccess = (data, message = 'Success') => {
      res.status(200).json({ message, data });
    };
  
    res.sendError = (error, status = 400) => {
      res.status(status).json({ error: error.message || error });
    };
  
    next();
  };
  
module.exports = { responseHandler };
  