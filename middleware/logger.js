const logger = (req, res, next) => {
  console.log(" ");
  console.log("Method :", req.method);
  console.log("URL :", req.originalUrl);
  console.log("Time :", new Date().toLocaleString());
  console.log(" ");

  next();
};

export default logger;