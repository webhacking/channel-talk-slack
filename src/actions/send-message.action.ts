import {from} from 'rxjs/internal/observable/from';
import axios from 'axios';

const sendMessageAction$ = (chatId: string, chatParam: any) => {
  return from(axios.post(`https://api.channel.io/open/user_chats/${chatId}/messages`, chatParam, {
    headers: {
      'x-access-key': process.env.CHANNEL_TALK_ACCESS_KEY,
      'x-access-secret': process.env.CHANNEL_TALK_ACCESS_SECRET
    }
  }))
};

export default sendMessageAction$;