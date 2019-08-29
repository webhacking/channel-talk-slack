"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var from_1 = require("rxjs/internal/observable/from");
var assignToBotAction$ = function (userChatId, botId) {
    return from_1.from(axios_1.default.post("https:////api.channel.io/open/user_chats/" + userChatId + "/bots/" + botId));
};
exports.default = assignToBotAction$;
//# sourceMappingURL=assign-to-bot.action.js.map