import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs/internal/Observable';
declare const assignToBotAction$: (userChatId: string, botId: string) => Observable<AxiosResponse<any>>;
export default assignToBotAction$;
