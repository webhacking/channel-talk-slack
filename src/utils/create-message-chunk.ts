import * as path from 'path';
import * as fs from 'fs';
import Chunk from '../interfaces/chunk';

const createMessageChunk = (chunkId: string, chunk: Chunk) => fs.writeFileSync(path.join(__dirname, `../../chunks/${chunkId}`), JSON.stringify(chunk));
export default createMessageChunk;