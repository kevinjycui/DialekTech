<<<<<<< HEAD
const fs = require('fs');

module.exports = (outputMessage) => {
    document.getElementById("timestamp-message").innerHTML = outputMessage;
};
=======
exports.default = () => {
    const fs = require("fs");
  
    let div = document.createElement("div");
    div.className = "output";
  
    fs.readFile("public/responses/responses.txt", (err, data) => {
      if (err) throw err;
  
      div.createTextNode(data.toString());
    });
  
    let main = document.getElementById("main");
    main.appendChild(div);
  };
>>>>>>> fec4fadbb017126d66f12c3c05aa4e79ff5ccdeb
