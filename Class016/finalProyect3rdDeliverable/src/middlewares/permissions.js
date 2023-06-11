function checkPermissions(action) {
  return function (req, res, next) {
    const user = req.session.user;
    if (
      user.rol == "admin" &&
      ["create", "update", "delete"].includes(action)
    ) {
      return next();
    }
    if (user.rol == "user" && ["add to cart"].includes(action)) {
      return next();
    }
    return res.status(403).send("No tienes permiso para realizar esta acción.");
  };
}

export default checkPermissions;
