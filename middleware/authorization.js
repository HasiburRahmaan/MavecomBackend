exports.admin=(req, res, next) =>{
  // 401 Unauthorized
  // 403 Forbidden

  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};

exports.staff = (req,res,next)=>{
  if (!req.user.isStaff) return res.status(403).send("Access denied.");

  next();
}

exports.superUser=(req,res,next)=>{
  if (!req.user.superUser) return res.status(403).send("Access denied.");

  next();
}