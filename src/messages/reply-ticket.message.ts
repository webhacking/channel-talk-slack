import Chunk from '../interfaces/chunk';
import Message from './message';
import ChannelTalkResponse from '../interfaces/channel-talk-response';
import {from} from 'rxjs/internal/observable/from';
import {WebClient} from '@slack/web-api';
import {Observable} from 'rxjs/internal/Observable';
import {WebAPICallResult} from '@slack/web-api/dist/WebClient';
import SlackOuthookRes from '../interfaces/slack-outhook-res'
import axios from 'axios';
import {concatMap, map} from 'rxjs/operators';
import sendMessageAction$ from '../actions/send-message.action';


class ReplyTicketMessage extends Message {
  public send = (chunk: Chunk, replyPayload: ChannelTalkResponse | SlackOuthookRes): Observable<WebAPICallResult | any> => {
    const client = new WebClient(this.slackBotToken);
    console.log('this.receiveChannelName', this.receiveChannelName);
    const instanceOfSlack = (payload: ChannelTalkResponse | SlackOuthookRes): payload is SlackOuthookRes => 'text' in payload;
    return instanceOfSlack(replyPayload) ? sendMessageAction$(chunk.channel.entity.id, {
      message: replyPayload.text
    }) : (() => {
      const {entity, refers} = replyPayload;
      if (entity.file) {
        const {file} = entity;
        return from(axios.get(file.url, {
          responseType: "arraybuffer"
        })).pipe(
          concatMap(res => {
            // @ts-ignore: Unreachable code error
            return from(client.files.upload({
              channels: <string>this.receiveChannelName[0] === '#' ? this.receiveChannelName : `#${this.receiveChannelName}`,
              filename: file.name,
              username: entity.personType === 'Manager' && refers.manager ?  refers.manager.name : refers.userChat.name,
              icon_url: entity.personType === 'Manager' && refers.manager ? refers.manager.avatarUrl : refers.veil.avatarUrl,
              thread_ts: chunk.slack.ts,
              file: res.data
            }));
          })
        )
      }

      // @ts-ignore: Unreachable code error
      return from(client.chat.postMessage({
        channel: this.receiveChannelName[0] === '#' ? this.receiveChannelName : `#${this.receiveChannelName}`,
        text: entity.message,
        username: entity.personType === 'Manager' && refers.manager ?  refers.manager.name : refers.userChat.name,
        icon_url: entity.personType === 'Manager' && refers.manager ? refers.manager.avatarUrl : refers.veil.avatarUrl,
        thread_ts: chunk.slack.ts
      }))
    })();
  };
}

export default ReplyTicketMessage;