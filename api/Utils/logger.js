

module.exports = function logger(req, res, next) {
    const url = req.url;
    const method = req.method;
    console.log(`There was a ${method} on ${url} @${Date.now()}`);
    next();
  }