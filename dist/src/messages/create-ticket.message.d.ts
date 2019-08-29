import ChannelTalkResponse from '../interfaces/channel-talk-response';
import { Observable } from 'rxjs/internal/Observable';
import { WebAPICallResult } from '@slack/web-api/dist/WebClient';
import Message from './message';
declare class CreateTicketMessage extends Message {
    send: (channelTalkRes: ChannelTalkResponse) => Observable<WebAPICallResult>;
}
export default CreateTicketMessage;
