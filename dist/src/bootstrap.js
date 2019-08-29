"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var bootstrap = function () {
    dotenv_1.default.config();
    if (!fs.existsSync(path.join(__dirname, "../chunks"))) {
        fs.mkdirSync(path.join(__dirname, "../chunks"), '0775');
    }
};
exports.default = bootstrap;
//# sourceMappingURL=bootstrap.js.map