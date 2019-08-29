import * as fs from 'fs';
import * as path from "path";

const getChunkById = (chunkId: string) => fs.readFileSync(path.join(__dirname, `../../chunks/${chunkId}`), 'utf-8');
export default getChunkById;