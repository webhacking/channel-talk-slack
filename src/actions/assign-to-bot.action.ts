import axios, {AxiosResponse} from 'axios';
import {from} from 'rxjs/internal/observable/from';
import {Observable} from 'rxjs/internal/Observable';

const assignToBotAction$ = (userChatId: string, botId: string): Observable<AxiosResponse> => {
  return from(axios.post(`https:////api.channel.io/open/user_chats/${userChatId}/bots/${botId}`));
};

export default assignToBotAction$;