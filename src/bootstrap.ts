import * as fs from 'fs';
import * as path from "path";
import dotenv from 'dotenv';

const bootstrap = () => {
  dotenv.config();
  if (!fs.existsSync(path.join(__dirname, `../chunks`))) {
    fs.mkdirSync(path.join(__dirname, `../chunks`), '0775');
  }
};

export default bootstrap;