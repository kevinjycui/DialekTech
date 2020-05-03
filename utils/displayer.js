const fs = require("fs");

module.exports = () => {
  return fs.readFileSync("public/responses/response.txt", 'utf8');
};
