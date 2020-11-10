import jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (userId: any) => {
  const payload = {
    user: userId
  };
  //Concatinating with ""(process.env.jwtSecret + "") because of dotenv import problems
  return jwt.sign(payload, process.env.jwtSecret + "", { expiresIn: "1h" });
}
// module.exports = jwtGenerator;
export default jwtGenerator;