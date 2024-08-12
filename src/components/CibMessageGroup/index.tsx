import { message } from 'antd'
import UserIcon from '../../assets/images/infoIcon.png'
import './index.less'
import CopyDis from '../../assets/images/copyDis.png'
import copy from 'copy-to-clipboard'

export default function (props: any) {
    
    const onCopy = () => {
        copy(props.text)
        message.success('copy success!')
    }

    return (
        <div className="cli-message-content">
            <img className='user-icon' src={UserIcon} width={30} height={30} alt="" />

            <div className='user-question'>
                {props.text}
                <img className='copy-icon' width={12} src={CopyDis} onClick={onCopy} alt="" />
            </div>
        </div>
    )
}