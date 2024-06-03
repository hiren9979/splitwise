import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import responses from "../common/response.js";
dotenv.config();

export function auth(req, res, next) {
  const authToken = req.headers['authorization'];

  if (authToken) {
    const token = authToken.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
      if (err) {
        return res.status(500).send(responses.errorOccured(403, "Please login first"));
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send(responses.unauthorized); 
  }
}
