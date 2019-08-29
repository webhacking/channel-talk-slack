"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var message_1 = __importDefault(require("./message"));
var from_1 = require("rxjs/internal/observable/from");
var web_api_1 = require("@slack/web-api");
var axios_1 = __importDefault(require("axios"));
var operators_1 = require("rxjs/operators");
var send_message_action_1 = __importDefault(require("../actions/send-message.action"));
var ReplyTicketMessage = /** @class */ (function (_super) {
    __extends(ReplyTicketMessage, _super);
    function ReplyTicketMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.send = function (chunk, replyPayload) {
            var client = new web_api_1.WebClient(_this.slackBotToken);
            console.log('this.receiveChannelName', _this.receiveChannelName);
            var instanceOfSlack = function (payload) { return 'text' in payload; };
            return instanceOfSlack(replyPayload) ? send_message_action_1.default(chunk.channel.entity.id, {
                message: replyPayload.text
            }) : (function () {
                var entity = replyPayload.entity, refers = replyPayload.refers;
                if (entity.file) {
                    var file_1 = entity.file;
                    return from_1.from(axios_1.default.get(file_1.url, {
                        responseType: "arraybuffer"
                    })).pipe(operators_1.concatMap(function (res) {
                        return from_1.from(client.files.upload({
                            channels: _this.receiveChannelName[0] === '#' ? _this.receiveChannelName : "#" + _this.receiveChannelName,
                            filename: file_1.name,
                            username: entity.personType === 'Manager' && refers.manager ? refers.manager.name : refers.userChat.name,
                            icon_url: entity.personType === 'Manager' && refers.manager ? refers.manager.avatarUrl : refers.veil.avatarUrl,
                            thread_ts: chunk.slack.ts,
                            file: res.data
                        }));
                    }));
                }
                return from_1.from(client.chat.postMessage({
                    channel: _this.receiveChannelName[0] === '#' ? _this.receiveChannelName : "#" + _this.receiveChannelName,
                    text: entity.message,
                    username: entity.personType === 'Manager' && refers.manager ? refers.manager.name : refers.userChat.name,
                    icon_url: entity.personType === 'Manager' && refers.manager ? refers.manager.avatarUrl : refers.veil.avatarUrl,
                    thread_ts: chunk.slack.ts
                }));
            })();
        };
        return _this;
    }
    return ReplyTicketMessage;
}(message_1.default));
exports.default = ReplyTicketMessage;
//# sourceMappingURL=reply-ticket.message.js.map