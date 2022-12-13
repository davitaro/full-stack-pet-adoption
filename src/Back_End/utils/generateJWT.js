const jwt = require("jsonwebtoken");
// const DB = require("../Controllers/db");
const config = require("../config");

// const tokens = new DB("tokens");
const Token = require("../models/Token");

const generateJWT = async (userId) => {
  const expireInOneYear = Date.now() + 1000 * 60 * 60 * 24 * 365;
  const token = jwt.sign(
    {
      id: userId,
      exp: expireInOneYear,
    },
    config.SECRET
  );
  const newToken = new Token({ id: userId, token });
  await newToken.save();
  return token;
};

module.exports = generateJWT;
