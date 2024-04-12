
import { atom, selector } from 'recoil'

// 聊天id
export const chatIdState = atom({
	key: 'chatId',
	default: '',
})
// 设置聊天id
export const setChatIdState = selector({
	key: 'chatIdState',
	get: ({ get }) => get(chatIdState)
})

// 是否正在流式输出问题
export const streamingOutputState = atom({
	key: 'isStreamingOutput',
	default: '',
})

// 设置流式输出问题
export const setStreamingOutput = selector({
	key: 'streamingOutputState',
	get: ({ get }) => get(streamingOutputState)
})

// 聊天详情
export const loadDetailState = atom({
	key: 'loadDetail',
	default: '',
})
// 设置获取聊天详情
export const setLoadDetailState = selector({
	key: 'loadDetailState',
	get: ({ get }) => get(loadDetailState)
})

// 是否在白名单中
export const whiteState = atom({
	key: 'isWhite',
	default: 0,
})
// 设置白名单状态
export const setWhiteState = selector({
	key: 'whiteState',
	get: ({ get }) => get(whiteState)
})

// 当前聊天标题
export const chatTitleState = atom({
	key: 'chatTitle',
	default: '',
})
// 设置当前聊天标题
export const setChatTitleState = selector({
	key: 'chatTitleState',
	get: ({ get }) => get(chatTitleState)
})

// 当前聊天时间
export const chatTimeState = atom({
	key: 'chatTime',
	default: '',
})
// 设置当前聊天时间
export const setChatTimeState = selector({
	key: 'chatTimeState',
	get: ({ get }) => get(chatTimeState)
})

// 当前聊天标题
export const chatHeaderIconState = atom({
	key: 'chatHeaderIcon',
	default: '',
})
// 设置当前聊天标题
export const setChatHeaderIconState = selector({
	key: 'chatHeaderIconState',
	get: ({ get }) => get(chatHeaderIconState)
})

// 当前选择的Token/project/entities_Chain
export const currentSelTokenToChainState = atom({
	key: 'currentSelTokenToChain',
	default: '',
})
// 设置当前聊天标题
export const setCurrentSelTokenToChainState = selector({
	key: 'currentSelTokenToChainState',
	get: ({ get }) => get(currentSelTokenToChainState)
})

const getChatData = () => {
	let data: any[] = []
	let token: string = localStorage.getItem('token') || ''
	let localChatList: any[] = localStorage.getItem('localChatList') ? JSON.parse(localStorage.getItem('localChatList') || '') : []
	return token ? data : localChatList
}
// 当前选择的Token/project/entities_Chain
export const hisChatListState = atom({
	key: 'hisChatList',
	default: getChatData(),
})
// 设置当前聊天标题
export const setHisChatListState = selector({
	key: 'hisChatListState',
	get: ({ get }) => get(hisChatListState)
})

// 当前选择的Token/project/entities_Chain
export const totalChatMessagesState = atom({
	key: 'totalChatMessages',
	default: 0,
})
// 设置当前聊天标题
export const setTotalChatMessagesState = selector({
	key: 'totalChatMessagesState',
	get: ({ get }) => get(totalChatMessagesState)
})

export const referralCountState = atom({
	key: 'referralCount',
	default: 0,
})

export const setReferralCountStateState = selector({
	key: 'referralCountState',
	get: ({ get }) => get(referralCountState)
})

export const resultIsEndState = atom({
	key: 'resultIsEnd',
	default: true,
})

export const setResultIsEndState = selector({
	key: 'resultIsEndState',
	get: ({ get }) => get(resultIsEndState)
})

export const modelTypeState = atom({
	key: 'modelType',
	default: '',
})

export const setModelTypeState = selector({
	key: 'modelTypeState',
	get: ({ get }) => get(modelTypeState)
})

export const levelTypeState = atom({
	key: 'levelType',
	default: -1,
})

export const setLevelTypeState = selector({
	key: 'levelTypeState',
	get: ({ get }) => get(levelTypeState)
})

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

const itemTokenInfo: InItemTokenInfo = {
    chain: '',
	chainLogo: '',
	chainName: '',
	coinId: '',
	name: '',
	symbol: '',
	tokenAddress: '',
	tokenImg: '',
	projectName: '',
	projectId: '',
	logoImg: '',
	frontKey: '',
	label: '',
}
// 当前选择的Token/project/entities_Chain
export const currentSelTokenItemState = atom({
	key: 'currentSelTokenItem',
	default: { ...itemTokenInfo },
})
// 设置当前聊天标题
export const setCurrentSelTokenItemState = selector({
	key: 'currentSelTokenItemState',
	get: ({ get }) => get(currentSelTokenItemState)
})

export const loadingResultState = atom({
	key: 'loadingResult',
	default: false,
})

export const setLoadingResultState = selector({
	key: 'loadingResultState',
	get: ({ get }) => get(loadingResultState)
})

export const rankingTypeState = atom({
	key: 'rankingType',
	default: '',
})

export const setRankingTypeState = selector({
	key: 'rankingTypeState',
	get: ({ get }) => get(rankingTypeState)
})

export const userNameState = atom({
	key: 'userName',
	default: '',
})

export const setUserNameState = selector({
	key: 'userNameState',
	get: ({ get }) => get(userNameState)
})