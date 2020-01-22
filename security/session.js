module.exports = (req, res, next) => {
  if (req.session.user && req.cookies.session_id) {
    next();
  } else {
    res.status(401);
    res.json();
  }
};
