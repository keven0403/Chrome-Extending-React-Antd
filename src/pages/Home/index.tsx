import { useEffect } from 'react'
import './index.less'
import AnswerBlackIcon from '../../assets/images/answerBlack.png'
import PromptWhiteIcon from '../../assets/images/promptWhiteIcon.png'
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons'

export default function () {
    useEffect(() => {
        console.log('Hello from the options!');
    }, [])

    return (
        <div className="home-content">
            <img src={AnswerBlackIcon} width={50} height={50} alt='logo' />

            <div className='home-til'>Before Trading, Ask Scopechat</div>

            <div className='home-des'>
                Notice: Enter your question in the input box. Due to many similar projects and tokens in Web3, 
                click the magnifying glass ( <SearchOutlined /> ) on the chat's left side to choose your target for a better response. 
                For more options, click the ( <img src={PromptWhiteIcon} width={12} height={12} alt='PromptWhiteIcon' /> ) button to browse our prompt library.
            </div>

            <div className='home-recommended-question'>
                <div className='item-question'>
                    <div className='txt'>Smart Money top performing tokens on the Polygon network.</div>
                    <ArrowRightOutlined />
                </div>

                <div className='item-question'>
                    <div className='txt'>Give me an investment report for the token COMAI on the Ethereum network.</div>
                    <ArrowRightOutlined />
                </div>
            </div>
        </div>
    )
}
