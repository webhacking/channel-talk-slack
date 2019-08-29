"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getChannelTalkChunkId = function (_a) {
    var entity = _a.entity, refers = _a.refers;
    return entity.chatId !== undefined ? entity.channelId + "_" + entity.chatId : entity.channelId + "_" + refers.message.chatId;
};
exports.default = getChannelTalkChunkId;
//# sourceMappingURL=get-chnnel-talk-chunk-id.js.map