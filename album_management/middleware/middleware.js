const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({
      success: false,
      code: 401,
      message:
        "Unauthorized access, missing authorization information in the request",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  const [bearer, token] = authorizationHeader.split(" ");

  if (!bearer || !token || (bearer && bearer !== "Bearer")) {
    return res.status(401).json({
      success: false,
      code: 401,
      message:
        "Unauthorized access, authorization information is not in a valid format",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }

  try {
    const decodedToken = await jwt.verify(token, "sai-revanth-neelam");
    res.locals.userId = decodedToken.userId;
    // console.log("-------------------"+res.locals.userId);
    // console.log("===================="+decodedToken.userId);
    next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: "Unauthorized access " + error.message,
      data: "----",
      error: error.message,
      resource: req.originalUrl,
    });
  }
};

module.exports.authMiddleware = authMiddleware;
