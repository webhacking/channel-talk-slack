import {IncomingMessage, ServerResponse} from "http";
import createHttpRxStream$ from './src/server';
import packets$ from './src/packets';
import ChannelTalkResponse from './src/interfaces/channel-talk-response';
import qs from "qs";
import HttpStatusCode from './src/interfaces/http-status-code';
import {tap} from 'rxjs/operators';
import createMessageChunk from './src/utils/create-message-chunk';
import getChunkById from "./src/utils/get-chunk-by-id";
import existsByChunkId from './src/utils/exists-by-chunk-id';
import CreateTicketMessage from './src/messages/create-ticket.message';
import ReplyTicketMessage from './src/messages/reply-ticket.message';
import getChannelTalkChunkId from './src/utils/get-chnnel-talk-chunk-id';
import bootstrap from './src/bootstrap';
bootstrap();

const DEFAULT_RECEIVE_PORT = Number(process.env.DEFAULT_RECEIVE_PORT) || 4000;
const CHANNEL_TALK_HOOK_TOKEN = process.env.CHANNEL_TALK_HOOK_TOKEN;
const SLACK_HOOK_TOKEN = process.env.SLACK_HOOK_TOKEN;

console.log(`Starting server at http://localhost:4000`);
createHttpRxStream$(DEFAULT_RECEIVE_PORT).subscribe((trans: [IncomingMessage, ServerResponse]) => {
  const [req, res] = trans;
  packets$(req).subscribe(packets => {
    const queryParam = req.url ? qs.parse(req.url.split('?')[1] as string) : {};
    if (queryParam.token === CHANNEL_TALK_HOOK_TOKEN) {
      const channelTalkRes = JSON.parse(packets.toString()) as ChannelTalkResponse;

      if (channelTalkRes.entity.botOption || channelTalkRes.entity.personType === 'Bot') {
        res.writeHead(HttpStatusCode.BAD_REQUEST);
        res.end();
        return;
      }

      if (existsByChunkId(getChannelTalkChunkId(channelTalkRes))) {
        const chunk = getChunkById(getChannelTalkChunkId(channelTalkRes));
        if (channelTalkRes.entity.personType === 'Veil' || channelTalkRes.entity.personType === 'Manager') {
          (new ReplyTicketMessage).send(JSON.parse(chunk), channelTalkRes).subscribe();
        }
      } else {
        (new CreateTicketMessage).send(channelTalkRes).pipe(
          tap(slackMessageRes => {
            const slackChunkId = `${slackMessageRes.channel}_${slackMessageRes.ts}`;
            createMessageChunk(getChannelTalkChunkId(channelTalkRes), {
              channel: channelTalkRes,
              slack: slackMessageRes
            });
            createMessageChunk(slackChunkId, {
              channel: channelTalkRes,
              slack: slackMessageRes
            });
          }),
        ).subscribe();
      }
    } else  {
      const slackRes = qs.parse(packets.toString());
      if (slackRes.token !== SLACK_HOOK_TOKEN || slackRes.text === '') {
        res.writeHead(HttpStatusCode.UNAUTHORIZED);
        res.end();
        return;
      }
      const slackChunkId = `${slackRes.channel_id}_${slackRes.thread_ts}`;
      if (existsByChunkId(slackChunkId) && slackRes.bot_id === undefined) {
        (new ReplyTicketMessage).send(JSON.parse(getChunkById(slackChunkId)), slackRes).subscribe();
      }
    }
    res.writeHead(HttpStatusCode.OK);
    res.end();
  })
});
