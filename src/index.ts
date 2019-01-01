import * as fs from "fs";
const configFile = process.argv[2];

if(!fs.existsSync(configFile)) {
    console.log(`Unable to find configuration file: ${configFile}`);
    process.exit();
} else {
    console.log('Found configuration file');
}

const configJSON = fs.readFileSync(configFile).toString();
const config = JSON.parse(configJSON);
