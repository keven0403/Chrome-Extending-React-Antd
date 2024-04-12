import { useEffect } from 'react';
import { AntDesignOutlined, RightCircleOutlined } from '@ant-design/icons';
import './index.less';

export default function () {
  useEffect(() => {
    console.log('Hello from the popup!');
  }, []);

  const buttonClick = () => {
    alert('Hello from the popup')
  }

  return (
    <div className="popup">
      <AntDesignOutlined style={{ fontSize: '3rem' }} />
      <div onClick={buttonClick}>button click</div>
      <h1>chrome-extension-vite-react-antd</h1>
    </div>
  );
}
