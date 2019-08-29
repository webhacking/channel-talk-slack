import ChannelTalkResponse from './channel-talk-response';
import { WebAPICallResult } from '@slack/web-api/dist/WebClient';
interface Chunk {
    channel: ChannelTalkResponse;
    slack: WebAPICallResult;
}
export default Chunk;
