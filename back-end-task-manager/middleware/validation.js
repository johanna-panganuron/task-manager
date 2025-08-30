// middleware/validation.js
const validateTask = (req, res, next) => {
    const { title, description } = req.body;
    const errors = [];
  
    if (!title || title.trim() === '') {
      errors.push('Title is required');
    }
  
    if (!description || description.trim() === '') {
      errors.push('Description is required');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
  
    next();
  };
  
  const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }
  
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
  
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  };
  
  module.exports = {
    validateTask,
    errorHandler
  };