import jwt from "jsonwebtoken";
import errHandler from "./errHandler";
import fs from 'fs'
export async function jwtSignIn(objPayload, objOption) {
  try {
    /**Dev mode */
   //let strKey = await fs.readFileSync(__dirname + '/config/private.key', 'utf-8');
    /**Prod Mode */
    let strKey = await fs.readFileSync('./config/private.key', 'utf-8');
    let objOptions = await {
      issuer: objOption["issuer"],
      subject: objOption["subject"],
      audience: objOption["audience"],
      algorithm: "RS256"
    };
    let strToken = await jwt.sign(objPayload, strKey, objOptions);
    return strToken;
  } catch (error) {
    throw new errHandler(error);
  }
}

export async function jwtVerify(strToken, objOption) {
  try {
    /**Dev mode */
    //let strKey = await fs.readFileSync(__dirname + '/config/public.key', 'utf-8');
    /**Prod Mode */
    let strKey = await fs.readFileSync('./config/public.key', 'utf-8');
    let objOptions = {
      issuer: objOption["issuer"],
      subject: objOption["subject"],
      audience: objOption["audience"],
      algorithm: 'RS256',
      expiresIn:'300d'
    };
    return jwt.verify(strToken, strKey, objOptions)
  } catch (error) {
    throw new errHandler(error);
  }
}

/**
 * @param token jwt token passing
 */
export async function jwtDecode(strToken) {
  try {
    return jwt.decode(strToken, {
      complete: true
    });
  } catch (error) {
    throw new errHandler(error);
  }
}