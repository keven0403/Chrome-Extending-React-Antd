import qs from 'query-string'
import LinkIcon from '../../assets/images/link-icon.png'
import './index.less'

export default function (props: any) {
    const href: string = props.href || ''
    const children: string = props.children || ''
    const item: any = props.item

    const handleSpecialLinkClick = (event: any, url: string) => {
        const parsed = qs.parseUrl(url)
        const question: any = parsed.query['question'] || ''
        if (question) {
            // 阻止默认跳转行为
            event.preventDefault()
            props.callBack(item[question])
        }
    }
    

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={(event) => handleSpecialLinkClick(event, href)}>
            {
                children === 'ScopeChat' ?
                    <div className='img-content'><img className='ic' src={LinkIcon} alt="" /></div>
                :
                    children
            }
        </a>
    )
}