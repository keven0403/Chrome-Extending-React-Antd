import TextArea from 'antd/es/input/TextArea';
import './index.less';
import { useState } from 'react';
import SendBut from '../../assets/images/send-but.png';


export default function (props: any) {
    const [textContent, setTextContent] = useState('')

    const onChange = (value: string) => {
        setTextContent(value)
    }

    const sendClick = () => {}

    return (
        <div className="main-content">
            <TextArea
                id='enterMobileTextInputId'
                placeholder='Ask me if you have any questions...'
                autoSize 
                onChange={(e: any) => onChange(e.target.value)}
                value={textContent}
                className='fade-in-element'
            />

            <div className='send-but' onClick={sendClick}>
                <img className='iconImg' src={SendBut} alt="" />
            </div>
        </div>
    )
}