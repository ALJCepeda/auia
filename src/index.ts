import * as fs from "fs";
import { User } from "@models";

const user = new User('Alfred');

const configFile = process.argv[2];

if(!fs.existsSync(configFile)) {
    console.log(`Unable to find configuration file: ${configFile}`);
    process.exit();
}

const configJSON = fs.readFileSync(configFile).toString();
const config = JSON.parse(configJSON);
