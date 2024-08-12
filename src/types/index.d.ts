export interface IMsgData  {
    unit: string,
    data: string,
    display_type: string,
    display_extra: any
}

export interface StatisticInfo {
    value: number,
    suffix: ReactNode,
    prefix: ReactNode,
    color: string,
    fontSize: number,
    precision?: number,
    fontWeight?: number,
    noFormatter?: boolean
}

export interface TopImgBottonTextProps {
    src?: string,
    text?: string,
    name?: string,
    width?: string,
    height?: string
}

export interface LeftImgRightTextProps {
    src?: string,
    topTitle?: string,
    topSubTitle?: string,
    bottomTitle?: string | number,
    bottomSubTitle?: string | number,
    width?: string,
    height?: string
    topType?: string,
    topSubType?: string,
    bottomType?: string,
    subBottomType?: string
}

export interface TabPro {
    label: string,
    type: string
}

export interface ColorThiefProps {
    imgSrc?: string,
    colorCount?: number,
    height?: string,
    width?: string,
    child?: ReactNode
}

export interface TableProps {
    id: string,
    dataSource: any[],
    headerSource: any[],
    baseInfo: any,
    displayType: string
}

export interface AnswerMsgProps {
    id: string,
    msgId: string,
    chatId: string,
    quesmsg: string,
    data: any[],
    type: string,
    ratingType: string,
    optionalMessage: string,
    optionalType: string
    recommendsArr: any
    // unit: string,
    // answermsg: string,
    // displayType: string,
    // displayExtra: any[],
    itemRecommendClick: (text: string) => void,
}

export interface ChartProps {
    id: string,
    types: string[], // line, bar
    data: any,
    size?: string // small, medium, large
    chartType?: string,
    loading?: boolean
    dateType?: string
}

export interface AddressProps {
    color?: string 
    address?: any,
    placement?: any,
    fontSize?: number,
    fontWeight?: number,
    ensName?: string,
    tag?: string,
    textDecoration?: string
    filterLength?: number
}

// 会话接口
export interface InConversation {
    key: string;
    character: 'user' | 'bot';
    value: any; // 问题或是ai回答的答案
    error?: boolean;
    type?: 'text' | 'image';
    url?: string;
    stop?: boolean; // 是否回答结束
    msgId: string; // 消息id
    chatId: string; // 聊天id
    recommends?: any[]; // 推荐问题
    displayExtra?: string;
    cardData?: any[]; // 保存卡片数据
    isCustomCard?: boolean; // 是否是自定义卡片还是chatgpt返回的markdown格式的文本
    ratingType?: string;
    optionalMessage?: string;
    optionalType?: string;
    state?: 'pending' | 'start' | 'end'; // 流等待中 流开始进行中  流结束
    greet?: '',
    linkInformation?: any[],
    tokenInfo?: {}
}

export interface Messages {
    msgId: string;
    chatId: string;
    data: string;
    count?: number;
}

export interface InItemTokenInfo {
    chain?: string;
    chainLogo?: string;
    chainName?: string;
    coinId?: string;
    name?: string;
    symbol?: string;
    tokenAddress?: string;
    tokenImg?: string;
    projectName?: string;
    projectId?: string;
    logoImg?: string;
    frontKey?: string;
    label?: string;
    key?: string;
}

export interface InChainInfo {
    chain: string,
    chainId: number,
    chainLogo: string,
    chainName: string,
    dexTokenApproveAddress: string,
    rpcUrl: string,
    explorerUrl: string,
    currency: string,
    type?: string
}