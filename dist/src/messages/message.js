"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message() {
        this.slackBotToken = process.env.SLACK_BOT_TOKEN;
        this.slackBotName = process.env.SLACK_BOT_NAME;
        this.receiveChannelName = process.env.RECEIVE_CHANNEL_NAME;
        console.log('this.slackBotName', this.slackBotName);
    }
    return Message;
}());
exports.default = Message;
//# sourceMappingURL=message.js.map