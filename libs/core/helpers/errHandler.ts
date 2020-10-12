/**
 * @type {values} 'errCommon' | 'errModuleWise' | 'errServer'
 */
type typErr = "errCommon" | "errModuleWise" | "errServer";
//import {logger} from './logManager'
/**
 * @type {values} 401 | 404 | 405 | 500 | 406 | 408 | 429 | 500 | 501 | 503
 * allowed status codes
 * Default status code for error responce is 400
 */
type StatusCode = |
  400 |
  401 |
  404 |
  405 |
  500 |
  406 |
  408 |
  429 |
  500 |
  501 |
  503;

/**
 * @interface {Structure} for the message
 */
interface ImessageObj {
  strMessage: string;
  objDetails: string | object;
  errCommon ? : Array < object > ;
  errModuleWise ? : Array < object > ;
  HTTP_R_S_Code ? : StatusCode;
  isError ? : boolean;
}

/**
 * Class for customized exception handling.
 * @property {Array<object>} errCommon -
 *           Common wise error storage
 * @property {Array<object>} errModuleWise -
 *           Module wise error storage
 * @property {StatusCode} HTTP_R_S_Code -
 *           to save responce status
 * @example :-
 * throw new errHandler('Some error', 'errCommon');
 * //(or)
 * let errorHandler = new errHandler('Test 1', 'errCommon');
 * errorHandler.add(
 *   { strMessage: 'Test 2', objDetails: 'Details 2' },
 *   'errCommon'
 * );
 * errorHandler.add(
 *   { strMessage: 'Test 3', objDetails: 'Details 3' },
 *   'errModuleWise'
 * );
 * throw errorHandler;
 */

class errHandler extends Error {
  private errCommon: Array < object > ;
  private errModuleWise: Array < object > ;
  private HTTP_R_S_Code: StatusCode;
  public isError: boolean = false;

  /**
   * Function for add error message to errHandler object
   * @param {string|ImessageObj} message -
   * passing error message
   *    |-> Eg: "Some error"|{"strMessage":"Some error",
   *                          "objDetails":"Details"|
   *                                       {"dtlKey":"dtlValu"}}
   * @param {typErr} errType - for error type
   *    |-> Eg: 'errModuleWise'|'errCommon'|'errServer'
   * @returns null
   */
  constructor(message ? : string | ImessageObj, errType: typErr = "errCommon") {
    super();
    Error.captureStackTrace(this, this.constructor);
    if (errType == "errServer") {
      errType = "errCommon";
      console.log(`\n${ new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toUTCString()} :-`);
      console.log(message);
    }
    if (typeof message === "object") {
      if (typeof message.errCommon !== "undefined")
        this.errCommon = message.errCommon;
      if (typeof message.errModuleWise !== "undefined")
        this.errModuleWise = message.errModuleWise;
      if (typeof message.HTTP_R_S_Code !== "undefined")
        this.HTTP_R_S_Code = message.HTTP_R_S_Code;
      if (typeof message.isError !== "undefined")
        this.isError = message.isError;
      if (message.errCommon || message.errModuleWise || message.HTTP_R_S_Code)
        return this;

      this[errType] = [];
      if (message instanceof Error) {
        console.log(`\n${ new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toUTCString()} :-`);
        console.log(message);
        // logger.error(message)
        this[errType].push({
          strMessage: "SOMETHING_WENT_WRONG"
        });
      } else
        this[errType].push({
          strMessage: message.strMessage,
          objDetails: message.objDetails
        });
      this.isError = true;
    } else if (message) {
      this[errType] = [];
      this[errType].push({
        strMessage: message
      });
      this.isError = true;
    }
  }

  /**
   * Function for add error message to errHandler object
   * @param {string|ImessageObj} message -
   * passing error message
   *    |-> Eg: "Some error"|{"strMessage":"Some error",
   *                          "objDetails":"Details"|
   *                                       {"dt1":"dt2"}}
   * @param {typErr} errType - for error type
   *    |-> Eg: 'errModuleWise'|'errCommon'|'errServer'
   * @returns null
   */
  add(message: string | ImessageObj, errType: typErr = "errCommon") {
    if (errType == "errServer") {
      errType = "errCommon";
      console.log(`\n${ new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toUTCString()} :-`);
      console.log(message);
    }
    if (typeof message === "object") {
      if (typeof message.errCommon !== "undefined")
        this.errCommon = message.errCommon;
      if (typeof message.errModuleWise !== "undefined")
        this.errModuleWise = message.errModuleWise;
      if (typeof message.HTTP_R_S_Code !== "undefined")
        this.HTTP_R_S_Code = message.HTTP_R_S_Code;
      if (message.errCommon || message.errModuleWise || message.HTTP_R_S_Code)
        return this;

      if (typeof this[errType] === "undefined") this[errType] = [];
      if (message instanceof Error) {
        console.log(`\n${ new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toUTCString()} :-`);
        console.log(message);
        this[errType].push({
          strMessage: "SOMETHING_WENT_WRONG"
        });
      } else
        this[errType].push({
          strMessage: message.strMessage,
          objDetails: message.objDetails
        });
      this.isError = true;
    } else {
      if (typeof this[errType] === "undefined") this[errType] = [];
      this[errType].push({
        strMessage: message
      });
      this.isError = true;
    }
  }

  /**
   * Function for set responce status code
   * for the request
   * Code List :-
   * * 400 -> Bad Request
   * * 401 -> Unauthorized
   * * 404 -> Not Found
   * * 405 -> Method Not Allowed [GET,POST,etc...]
   * * 406 -> Not Acceptable
   * * 408 -> Request Timeout
   * * 429 -> Too Many Requests
   * * 500 -> Internal Server Error
   * * 501 -> Not Implemented
   * * 503 -> Service Unavailable
   * @param {StatusCode} HTTP_R_S_Code -
   * passing status code
   *    |-> Eg: 400
   * @remarks Default Responce code will be 400
   * @returns null
   */
  setStatus(HTTP_R_S_Code: StatusCode) {
    this.HTTP_R_S_Code = HTTP_R_S_Code;
    return this;
  }

  /**
   * Function to generate responce message
   * @remarks Default Responce HTTP_R_S_Code will be 400
   * @returns {object}
   *    |-> Eg:
   * ```ts
   * {
   *   body: {
   *     errCommon: [
   *       { strMessage: 'Test 1' },
   *       { strMessage: 'Test 2', objDetails: 'Details 2' }
   *     ],
   *     errModuleWise: [
   *       { strMessage: 'Test 3', objDetails: 'Details 3' }
   *     ]
   *   },
   *   statusCode: 400
   * }
   * ```
   * @example -
   *   errorHandler.send();
   */
  send({
    statusCode = 400
  } = {}) {
    let arrErrors = []
    if(this.errCommon.length)
    this.errCommon.forEach(objItem => {
      arrErrors.push(objItem["strMessage"])
    })
    // Object.keys(objReturn).forEach(key =>
    //   objReturn[key] === undefined ? delete objReturn[key] : ""
    // );
    if (this.HTTP_R_S_Code) statusCode = this.HTTP_R_S_Code;
    return {
      body: {
        arrErrors
      },
      statusCode
    };
  }
}

export default errHandler;