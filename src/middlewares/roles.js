import { ROLES } from "../models/User.model.js";

export const isAdmin = (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    return res.sendStatus(403);
  }

  next();
};
