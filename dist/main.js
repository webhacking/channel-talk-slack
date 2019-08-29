"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./src/server"));
var packets_1 = __importDefault(require("./src/packets"));
var qs_1 = __importDefault(require("qs"));
var http_status_code_1 = __importDefault(require("./src/interfaces/http-status-code"));
var operators_1 = require("rxjs/operators");
var create_message_chunk_1 = __importDefault(require("./src/utils/create-message-chunk"));
var get_chunk_by_id_1 = __importDefault(require("./src/utils/get-chunk-by-id"));
var exists_by_chunk_id_1 = __importDefault(require("./src/utils/exists-by-chunk-id"));
var create_ticket_message_1 = __importDefault(require("./src/messages/create-ticket.message"));
var reply_ticket_message_1 = __importDefault(require("./src/messages/reply-ticket.message"));
var get_chnnel_talk_chunk_id_1 = __importDefault(require("./src/utils/get-chnnel-talk-chunk-id"));
var bootstrap_1 = __importDefault(require("./src/bootstrap"));
bootstrap_1.default();
var DEFAULT_RECEIVE_PORT = Number(process.env.DEFAULT_RECEIVE_PORT) || 4000;
var CHANNEL_TALK_HOOK_TOKEN = process.env.CHANNEL_TALK_HOOK_TOKEN;
var SLACK_HOOK_TOKEN = process.env.SLACK_HOOK_TOKEN;
console.log("Starting server at http://localhost:4000");
server_1.default(DEFAULT_RECEIVE_PORT).subscribe(function (trans) {
    var req = trans[0], res = trans[1];
    packets_1.default(req).subscribe(function (packets) {
        var queryParam = req.url ? qs_1.default.parse(req.url.split('?')[1]) : {};
        if (queryParam.token === CHANNEL_TALK_HOOK_TOKEN) {
            var channelTalkRes_1 = JSON.parse(packets.toString());
            if (channelTalkRes_1.entity.botOption || channelTalkRes_1.entity.personType === 'Bot') {
                res.writeHead(http_status_code_1.default.BAD_REQUEST);
                res.end();
                return;
            }
            if (exists_by_chunk_id_1.default(get_chnnel_talk_chunk_id_1.default(channelTalkRes_1))) {
                var chunk = get_chunk_by_id_1.default(get_chnnel_talk_chunk_id_1.default(channelTalkRes_1));
                if (channelTalkRes_1.entity.personType === 'Veil' || channelTalkRes_1.entity.personType === 'Manager') {
                    (new reply_ticket_message_1.default).send(JSON.parse(chunk), channelTalkRes_1).subscribe();
                }
            }
            else {
                (new create_ticket_message_1.default).send(channelTalkRes_1).pipe(operators_1.tap(function (slackMessageRes) {
                    var slackChunkId = slackMessageRes.channel + "_" + slackMessageRes.ts;
                    create_message_chunk_1.default(get_chnnel_talk_chunk_id_1.default(channelTalkRes_1), {
                        channel: channelTalkRes_1,
                        slack: slackMessageRes
                    });
                    create_message_chunk_1.default(slackChunkId, {
                        channel: channelTalkRes_1,
                        slack: slackMessageRes
                    });
                })).subscribe();
            }
        }
        else {
            var slackRes = qs_1.default.parse(packets.toString());
            if (slackRes.token !== SLACK_HOOK_TOKEN || slackRes.text === '') {
                res.writeHead(http_status_code_1.default.UNAUTHORIZED);
                res.end();
                return;
            }
            var slackChunkId = slackRes.channel_id + "_" + slackRes.thread_ts;
            if (exists_by_chunk_id_1.default(slackChunkId) && slackRes.bot_id === undefined) {
                (new reply_ticket_message_1.default).send(JSON.parse(get_chunk_by_id_1.default(slackChunkId)), slackRes).subscribe();
            }
        }
        res.writeHead(http_status_code_1.default.OK);
        res.end();
    });
});
//# sourceMappingURL=main.js.map