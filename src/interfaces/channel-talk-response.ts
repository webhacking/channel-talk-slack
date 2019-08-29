interface ChannelTalkFileResponse {
  readonly id: string;
  readonly name: string;
  readonly size: number;
  readonly type: string;
  readonly extension: string;
  readonly url: string;
  readonly image: boolean;
}

interface ChannelTalkResponse {
  readonly event: string;
  readonly entity: {
    readonly channelId: string;
    readonly id: string;
    readonly chatType: string;
    readonly chatId: string;
    readonly personType: string;
    readonly personId: string;
    readonly message: string;
    readonly format: string;
    readonly requestId: string;
    readonly createdAt: number;
    readonly messageV2: string;
    readonly botOption?: {
      readonly welcome: boolean;
    };
    readonly file?: ChannelTalkFileResponse;
  };
  readonly refers: {
    readonly userChat: {
      readonly id: string;
      readonly channelId: string;
      readonly personType: string;
      readonly personId: string;
      readonly name: string;
      readonly pluginId: string;
      readonly firstOpenedAt: number;
      readonly openedAt: number;
      readonly createdAt: number;
      readonly appMessageId: string;
      readonly appUpdatedAt: number;
      readonly deskMessageId: string;
      readonly deskUpdatedAt: number;
      readonly askedAt: number;
      readonly updatedAt: number;
      readonly lastMessageId: string;
      readonly stateV2: string;
      readonly state: string;
    };
    readonly manager?: {
      readonly id: string;
      readonly name: string;
      readonly mobileNumber: string;
      readonly locale: string;
      readonly country: string;
      readonly createAt: number;
      readonly username: string;
      readonly online: boolean;
      readonly alert: 0 | 1;
      readonly unread: 0 | 1;
      readonly avatarUrl: string;
      readonly color: string;
      readonly initial: string;
      readonly safeLocale: string;
    };
    readonly veil: {
      readonly channelId: string;
      readonly id: string;
      readonly name: string;
      readonly named: boolean;
      readonly profile: {
        readonly name: string;
        readonly referrer: string;
        readonly mobileNumber: string;
      };
      readonly locale: string;
      readonly country: string;
      readonly city: string;
      readonly latitude: number;
      readonly longitude: number;
      readonly alert: 0 | 1;
      readonly unread: 0 | 1;
      readonly createdAt: number;
      readonly updatedAt: number;
      readonly avatarUrl: string;
      readonly segment: string;
      readonly ghost: boolean;
      readonly mobileNumber: string;
      readonly safeLocale: string;
      readonly color: string;
      readonly initial: string
    };
    readonly message: {
      readonly channelId: string;
      readonly id: string;
      readonly chatType: string;
      readonly chatId: string;
      readonly personType: string;
      readonly message: string;
      readonly format: string;
      readonly requestId: string;
      readonly createAt: number;
      readonly messageV2: string;
    },
    readonly bot?: {
      readonly id: string;
      readonly channelId: string;
      readonly name: string;
      readonly createdAt: number;
      readonly color: string;
      readonly avatarUrl: string;
      readonly initial: string;
    }
  };
  readonly type: string
}

export default ChannelTalkResponse;
