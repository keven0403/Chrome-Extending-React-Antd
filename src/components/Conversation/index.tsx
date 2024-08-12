import { useRef, useState, useEffect } from "react"
import { InConversation } from "../../types"
import './github.less'
import './index.less'
import CibMessageGroup from "../CibMessageGroup"
import { parseMarkdown, parseStreamText, randEffect, uuid } from "../../utils"
import AnswerIcon from '../../assets/images/answerIcon.png'
import RefreshIcon from '../../assets/images/refresh.png'
import WhiteTips from '../../assets/images/whiteTips.png'
import axios, { AxiosError } from 'axios'
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' // table
import remarkGemoji from 'remark-gemoji'
import breaks from 'remark-breaks'
import LinkRenderer from "./linkRenderer"
const baseURL = "https://aitestchatm3.0xscope.com/"


export default function (props: any, ref: any) {
    const question: string = props.question || ''

    const abortControllerRef = useRef<AbortController>()
    const [conversation, setConversation] = useState<InConversation[]>([])
    const baseInfoData: any = useRef({
        messageList: [] as InConversation[]
    })

    useEffect(() => {
        if (question) {
            initData(question)
        }
    }, [question])

    const initData = (question: string) => {
        baseInfoData.current.messageList = [
            ...baseInfoData.current.messageList,
            {
                character: 'user', value: question, key: uuid(), error: false, msgId: '', chatId: '', recommends: []
            },
            {
                character: 'bot', value: '', key: uuid(), error: false, msgId: '', chatId: '', recommends: [], displayExtra: '', state: 'pending'
            }
        ]
        setConversation(baseInfoData.current.messageList)
        sendClick(question)
    }

    // 流式输出结果
    const getMessage = (message: string) => {
        let interest: string = ''
        let chatId: string = ''
        abortControllerRef.current = new AbortController()

        axios({
            url: `${baseURL}api/chat/v2`,
            timeout: 300000,
            method: 'POST',
            responseType: 'stream',
            headers: { 
                'Content-Type': 'application/json', 
                "AUTH-TOKEN": localStorage.getItem('token') || 'eyJhbGciOiJSUzI1NiJ9.eyJ0IjoxNzIyNDIwMTAzNzQxLCJiIjoiMHg2OTAyODhjOTljNWQwNzQyZTg3ZmFmZGI1ODdiZDhkYTRmYmE2NThlIiwiYyI6IjB4NjkwMjg4Yzk5YzVkMDc0MmU4N2ZhZmRiNTg3YmQ4ZGE0ZmJhNjU4ZSIsInYiOjB9.BqeeJ0lSpjqThPVJljY0tf4nlWlivf_a8eD-fZ5xPX5LAOgcK74G8Hbb2x5TZJn83tuytvUCO619w_iYWI4JfOnJQolPaxv-C4gguIV6fdIUa8GdveY2W-47Y-3f19H7pwIQmTaNqzzOrkX1B8NwjQLcU3xMG2Yna5IfZwRGnfw',
                "platform": 'Chrome Extend'
            },
            data: { chatId, message, interest },
            signal: abortControllerRef.current.signal,
            onDownloadProgress({ event }) {
                const chunk: string = event.target?.responseText || ''
                const statusCode = event.target?.status
                if (statusCode === 200) {
                    randEffect(0, '', `Tip-Content`, 'start', message)
                    try {
                        const { chatIdStr, msgId, data, recommends, displayExtra, stop, isCustomCard, cardData, count, greet, errCode, linkInformation, tokenInfo } = parseStreamText(chunk, '')
                        setConversation((c) => {
                            const pre = [...c]
                            const [lastConversation] = pre.slice(-1)
                            Object.assign(lastConversation, { msgId, chatId: chatIdStr, value: parseMarkdown(data), recommends, displayExtra, stop, isCustomCard, cardData, state: 'start', greet, linkInformation, tokenInfo })
                            return pre
                        }) 
                    } catch (error) {
                        console.error(error)     
                    }
                } else if (statusCode === 403) {
                    location.reload()
                }
            }
        }).catch((error: AxiosError) => {
            
        }).finally(() => {
            
        })

        setTimeout(() => {
            initScrollTop()
            randEffect(0, '', `Tip-Content`, 'pending', message)
        }, 500) // 文本切换延迟时间
    }

    // 发送消息
    const sendClick = (question: string) => {
        getMessage(question)
    }

    const initScrollTop = () => {
        const viewportHeight: number = window.innerHeight
        const parentElement: any = document.getElementById('TopCibChatMainId')
        const childElements = parentElement?.children
        if (childElements.length >= 2) {
            const clientHeight: number = childElements[childElements.length - 2].clientHeight
            childElements[childElements.length - 1].style.minHeight = viewportHeight - clientHeight - 200 + 'px'
            childElements[childElements.length - 2].scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const callBack = async (
        question: string, 
        params: any = {}, 
        searchType: string = '', 
        tradeType: string = ''
    ) => {
        
    }

    const refreshClick = (msgId: string) => {}

    const itemRecommendClick = async (text: string, info: string, type: string) => {}
    
    return (
        <div id='TopCibChatMainId' className="conversation-content">
            {
                conversation.map((item: any, index: number) => {
                    return (
                        <div id={`Content-${item.key}`} key={item.key}>
                            {
                                item.character === 'user' ?
                                    <CibMessageGroup text={item.value} />
                                :
                                    <div className="bot-content">
                                        {
                                            item.cardData?.length > 0 || item.value ?
                                                <img className="msg-icon" width={30} height={30} src={AnswerIcon} alt="" />
                                            :
                                                <div className="msg-icon loadingMsgIcon"><LoadingOutlined /></div>
                                        }
                                        

                                        <div id={`Share_${item.msgId}`} className="result-content">
                                            {
                                                item.state === 'pending' ?
                                                    <div className="typing-content">
                                                        <div className='text' id='Tip-Content'></div>
                                                    </div>
                                                :
                                                    null
                                            }

                                            {
                                                item.value ? 
                                                    <div className='markdown-body' id={`${item.msgId}_markdown_body`}>
                                                        <ReactMarkdown
                                                            children={item.value}
                                                            remarkPlugins={[remarkGfm,  breaks, remarkGemoji]} //remarkMath,
                                                            rehypePlugins={[]} // rehypeKatex
                                                            components={{
                                                                a: ({ ...props }) => {
                                                                    return (
                                                                        <LinkRenderer 
                                                                            item={item.linkInformation}
                                                                            children={props.children}
                                                                            href={props.href}
                                                                            callBack={callBack}
                                                                        />
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                :
                                                    null
                                            }
                                        </div>
                                    </div>
                            }

                            {
                                item.character === 'bot' && item.recommends.length ?
                                    <div className="RecommendQuestion">
                                        { item.recommends[0].display === 'Other users are asking' && <div className='other-ask'>Other users are asking:</div> }

                                        <div className={`refreshBox ${item.recommends[0].display !== 'Other users are asking' ? 'otherRefreshBox' : ''}`}>
                                            Suggested Indicators
                                            <div className='refreshBtn' onClick={() => refreshClick(item.msgId)}>
                                                <img src={RefreshIcon} alt="" />
                                            </div>
                                        </div>

                                        {
                                            item.recommends.map((itemRecomemend: any, index: number ) => {
                                                return (
                                                    itemRecomemend?.display && itemRecomemend?.display !== 'Other users are asking' && itemRecomemend?.isShow ?
                                                        <div 
                                                            className={`itemLineBox scale-in ${index === 0 ? 'firstItemLineBox' : ''}`} 
                                                            key={index} 
                                                            onClick={() => itemRecommendClick(itemRecomemend.prompt, itemRecomemend.info, itemRecomemend.type)}>
                                                            <div className="RecommendItemContent">
                                                                <img className='msg-icon' src={WhiteTips} />
                                                                {itemRecomemend.display}
                                                            </div>

                                                            <ArrowRightOutlined />
                                                        </div>
                                                    :
                                                        null  
                                                )
                                            })
                                        }
                                    </div>
                                :
                                    null
                            }

                        </div>
                    )
                })
            }
        </div>
    )
}