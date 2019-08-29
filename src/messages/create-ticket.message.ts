import getDirectConversationLinkUtil from '../utils/get-direct-conversation-link.util';
import ChannelTalkResponse from '../interfaces/channel-talk-response';
import {WebClient} from '@slack/web-api';
import {from} from 'rxjs/internal/observable/from';
import {Observable} from 'rxjs/internal/Observable';
import {WebAPICallResult} from '@slack/web-api/dist/WebClient';
import Message from './message';

class CreateTicketMessage extends Message {
  public send = (channelTalkRes: ChannelTalkResponse): Observable<WebAPICallResult> => {
    const client = new WebClient(this.slackBotToken);
    const {entity, refers} = channelTalkRes;
    return from(client.chat.postMessage({
      channel: this.receiveChannelName[0] === '#' ? this.receiveChannelName : `#${this.receiveChannelName}`,
      text: `A conversation started by <${getDirectConversationLinkUtil(entity.channelId, entity.id)}|${refers.veil && refers.veil.name !== undefined ? refers.veil.name : 'Anonymous User'}>`,
      username: this.slackBotName === '' ? 'CS-BOT' : this.slackBotName,
      icon_emoji: ':nerd_face:',
      attachments: [
        {
          color: "#36a64f",
          title: refers.message.message,
          title_link: getDirectConversationLinkUtil(entity.channelId, entity.id),
          fields: [
            {
              title: "Region",
              value: `${refers.veil.country}, ${refers.veil.city}`,
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
}

export default CreateTicketMessage;