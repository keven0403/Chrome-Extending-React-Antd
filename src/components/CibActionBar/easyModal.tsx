import { useState } from 'react';
import { Tabs } from 'antd';
import './index.less';
import TabToken from './tabToken';
import TabProject from './tabProject';
import TabEntities from './tabEntities';

export default function (props: any) {
    const [tabType, setTabType] = useState('Token')

    const items = [
        {
            key: 'Token',
            label: 'Token',
            children: <TabToken />,
        },
        {
            key: 'Project',
            label: 'Project',
            children: <TabProject />,
        },
        {
            key: 'Entities',
            label: 'Wallet & Entities',
            children: <TabEntities />,
        }
    ]

    const onChange = (key: string) => {
        console.log(key)
    };

    const itemClick = (type: string) => {
        setTabType(type)
    }

    return (
        <div className="fade-in-element easy-modal">
            <Tabs defaultActiveKey="Token" items={items} onChange={onChange} />
        </div>
    )
}