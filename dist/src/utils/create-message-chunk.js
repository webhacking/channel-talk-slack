"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var createMessageChunk = function (chunkId, chunk) { return fs.writeFileSync(path.join(__dirname, "../../chunks/" + chunkId), JSON.stringify(chunk)); };
exports.default = createMessageChunk;
//# sourceMappingURL=create-message-chunk.js.map