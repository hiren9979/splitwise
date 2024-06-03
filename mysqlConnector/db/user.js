import responses from "../common/response.js";
import { executeQuery, generateV4uuid } from "../common/common.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

export async function createUser(data) {
  try {
    const query = `INSERT INTO users (id, name, email, password, authToken) VALUES (?, ?, ?, ?, ?);`;
    const result = await executeQuery(query, [
      generateV4uuid(),
      data.name,
      data.email,
      data.password,
      data.authToken,
    ]);
    if (result) {
      return responses.created;
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}

export async function getUsers() {
  try {
    const query = `SELECT  FROM users;`;
    const result = await executeQuery(query, []);
    if (result) {
      return result;
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
  
}
export async function login(data) {
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const result = await executeQuery(query, [data.email]);
    if (result) {
      const user = result;
      const passwordMatch = await bcrypt.compare(data.password, user[0].password);
      if (passwordMatch) {
        const authToken = jwt.sign({ userId: user[0].id }, process.env.PRIVATE_KEY , {
          expiresIn: "24h",
        });
        const authData = {
          authToken : authToken,
          id : user[0].id
        }
        const info = await updateAuthtoken(authData);  
        if(info.status !== 200)
          {
            return responses.errorOccured(400,"authToken not updated in the database !!!");
          }       
       return {authToken};
      } else {
        return responses.unauthorized;
      }
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}

async function updateAuthtoken(data){
  try {
    const query = `UPDATE users SET authToken = ? WHERE id = ?;`;
    const result = await executeQuery(query, [data.authToken,data.id]);
    console.log(result);
    if (result.affectedRows == 1) {
      return responses.success;
    } else {
      return responses.badRequest;
    }
  } catch (error) {
    return responses.errorOccured(400, error);
  }
}
