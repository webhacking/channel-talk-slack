"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var getChunkById = function (chunkId) { return fs.readFileSync(path.join(__dirname, "../../chunks/" + chunkId), 'utf-8'); };
exports.default = getChunkById;
//# sourceMappingURL=get-chunk-by-id.js.map