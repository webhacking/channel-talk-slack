import Chunk from '../interfaces/chunk';
import Message from './message';
import ChannelTalkResponse from '../interfaces/channel-talk-response';
import { Observable } from 'rxjs/internal/Observable';
import SlackOuthookRes from '../interfaces/slack-outhook-res';
declare class ReplyTicketMessage extends Message {
    send: (chunk: Chunk, replyPayload: ChannelTalkResponse | SlackOuthookRes) => Observable<any>;
}
export default ReplyTicketMessage;
