const jwt = require("jsonwebtoken");

exports.generateToken = async (payload, validity) => {
  const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {
    expiresIn: validity,
  });
  return token;
};

exports.isAuthenticate = async (req, res, next) => {
  try {
    if (req.get("authorization")) {
      const token = req.get("authorization").split(" ")[1];
      const isTokenValid = jwt.verify(token, process.env.JWT_TOKEN_KEY);

      if (isTokenValid) {
        if (req.body.email === isTokenValid.email) next();

        return res.json({
          msg: "Invalid token",
          error: false,
          code: 200,
        });
      }
    } else {
      return res.json({
        msg: "Access denied!",
        code: 200,
        error: false,
      });
    }
  } catch (error) {
    return res.json({
      msg: error.message,
      error: true,
      code: 500,
    });
  }
};
