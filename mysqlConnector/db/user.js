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
    const query = `SELECT * FROM users;`;
    const result = await executeQuery(query, []);
    if (result) {
      const formattedResult = result.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email
      }));
      console.log("formattedResult", formattedResult);
      return formattedResult;
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
    console.log(data);
    const result = await executeQuery(query, [data.email]);
    console.log(result);
    if (result !== null && result.length !== 0) {
      const user = result;
      const passwordMatch = await bcrypt.compare(data.password, user[0].password);
      console.log(passwordMatch);
      if (passwordMatch) {
        const authToken = jwt.sign({ userId: user[0].id }, process.env.PRIVATE_KEY , {
          expiresIn: "24h",
        });
        const authData = {
          authToken : authToken,
          id : user[0].id,
          name: user[0].name,
          email: user[0].email
        }
        const info = await updateAuthtoken(authData);  
        if(info.status !== 200)
          {
            return responses.errorOccured(400,"authToken not updated in the database !!!");
          }       
       return {authData};
      } else {
        return responses.unauthorized;
      }
    }
    else
    {
      return responses.errorOccured(404,"User not found!!!");
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
