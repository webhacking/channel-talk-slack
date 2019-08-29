const getDirectConversationLinkUtil = (channelId: string, chatId: string) =>
  `https://desk.channel.io/#/channels/${channelId}/user_chats/${chatId}`;

export default getDirectConversationLinkUtil;