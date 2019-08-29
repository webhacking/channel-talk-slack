class Message {
  protected readonly slackBotToken = process.env.SLACK_BOT_TOKEN as string;
  protected readonly slackBotName = process.env.SLACK_BOT_NAME as string;
  protected readonly receiveChannelName = process.env.RECEIVE_CHANNEL_NAME as string;
  public constructor() {
    console.log('this.slackBotName', this.slackBotName)
  }
}

export default Message;