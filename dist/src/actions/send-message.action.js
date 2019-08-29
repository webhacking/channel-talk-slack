"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var from_1 = require("rxjs/internal/observable/from");
var axios_1 = __importDefault(require("axios"));
var sendMessageAction$ = function (chatId, chatParam) {
    return from_1.from(axios_1.default.post("https://api.channel.io/open/user_chats/" + chatId + "/messages", chatParam, {
        headers: {
            'x-access-key': process.env.CHANNEL_TALK_ACCESS_KEY,
            'x-access-secret': process.env.CHANNEL_TALK_ACCESS_SECRET
        }
    }));
};
exports.default = sendMessageAction$;
//# sourceMappingURL=send-message.action.js.map