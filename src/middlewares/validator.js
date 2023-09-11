import { validationResult } from "express-validator";

export const validator = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400);
  }
};
