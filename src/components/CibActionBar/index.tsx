import TextArea from 'antd/es/input/TextArea';
import './index.less';
import { useEffect, useState } from 'react';
import SendBut from '../../assets/images/send-but.png';
import { SearchOutlined } from '@ant-design/icons';
import PromptWhiteIcon from '../../assets/images/promptWhiteIcon.png';
import EasyModal from './easyModal'

export default function (props: any) {
    const id = props.id || ''
    console.log('id===', id)
    const isEnd: boolean = props.isEnd || false
    const [isLoading, setIsLoading] = useState(false)
    const [textContent, setTextContent] = useState('')

    useEffect(() => {
        setIsLoading(!isEnd) 
    }, [isEnd])

    const onChange = (value: string) => {
        setTextContent(value)
    }

    const sendClick = () => {
        setIsLoading(true)
        setTextContent('')
        props.itemQuestionClick(textContent)
    }
    
    const handleShowType = () => {}

    const handlePrompt = () => {}

    const stopClick = () => {}

    return (
        <div className="cli-content">
            <SearchOutlined onClick={handleShowType} />

            <img className='promptIcon' width={18} height={18} onClick={() => handlePrompt()} src={ PromptWhiteIcon } alt="" />

            <TextArea
                id='enterMobileTextInputId'
                placeholder='Ask me if you have any questions...'
                autoSize 
                onChange={(e: any) => onChange(e.target.value)}
                value={textContent}
                className='fade-in-element'
            />

            {
                isLoading ?
                    <div className='AbortBtnContent' onClick={stopClick}>
                        <div className='StopButContent'></div>
                    </div>
                :
                    <div className='send-but' onClick={sendClick}>
                        <img className='iconImg' src={SendBut} alt="" />
                    </div>
            }

            <EasyModal />
        </div>
    )
}