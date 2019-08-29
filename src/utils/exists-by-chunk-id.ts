import * as fs from 'fs';
import * as path from "path";

const existsByChunkId = (chunkId: string) => fs.existsSync(path.join(__dirname, `../../chunks/${chunkId}`));
export default existsByChunkId;