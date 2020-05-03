exports.displayer = () => {
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
