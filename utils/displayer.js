const fs = require('fs');

module.exports = (outputMessage) => {
    document.getElementById("timestamp-message").innerHTML = outputMessage;
};
