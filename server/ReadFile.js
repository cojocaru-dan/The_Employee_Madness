const fs = require('fs');

function readFile(path) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    return data;
}

module.exports = readFile;