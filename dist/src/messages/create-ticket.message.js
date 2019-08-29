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
var get_direct_conversation_link_util_1 = __importDefault(require("../utils/get-direct-conversation-link.util"));
var web_api_1 = require("@slack/web-api");
var from_1 = require("rxjs/internal/observable/from");
var message_1 = __importDefault(require("./message"));
var CreateTicketMessage = /** @class */ (function (_super) {
    __extends(CreateTicketMessage, _super);
    function CreateTicketMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.send = function (channelTalkRes) {
            var client = new web_api_1.WebClient(_this.slackBotToken);
            var entity = channelTalkRes.entity, refers = channelTalkRes.refers;
            return from_1.from(client.chat.postMessage({
                channel: _this.receiveChannelName[0] === '#' ? _this.receiveChannelName : "#" + _this.receiveChannelName,
                text: "A conversation started by <" + get_direct_conversation_link_util_1.default(entity.channelId, entity.id) + "|" + (refers.veil && refers.veil.name !== undefined ? refers.veil.name : 'Anonymous User') + ">",
                username: _this.slackBotName === '' ? 'CS-BOT' : _this.slackBotName,
                icon_emoji: ':nerd_face:',
                attachments: [
                    {
                        color: "#36a64f",
                        title: refers.message.message,
                        title_link: get_direct_conversation_link_util_1.default(entity.channelId, entity.id),
                        fields: [
                            {
                                title: "Region",
                                value: refers.veil.country + ", " + refers.veil.city,
                                short: false
                            },
                            {
                                title: "Mobile Number",
                                value: refers.veil.mobileNumber,
                                short: false
                            }
                        ],
                        footer: refers.veil && refers.veil.name !== undefined ? refers.veil.name : 'Anonymous User',
                        footer_icon: refers.veil.avatarUrl,
                        ts: refers.veil.createdAt.toString()
                    },
                ],
            }));
        };
        return _this;
    }
    return CreateTicketMessage;
}(message_1.default));
exports.default = CreateTicketMessage;
//# sourceMappingURL=create-ticket.message.js.map