import ChannelTalkResponse from '../interfaces/channel-talk-response';

const getChannelTalkChunkId = ({entity, refers}: ChannelTalkResponse) => {
  return entity.chatId !== undefined ? `${entity.channelId}_${entity.chatId}` : `${entity.channelId}_${refers.message.chatId}`;
};

export default getChannelTalkChunkId;