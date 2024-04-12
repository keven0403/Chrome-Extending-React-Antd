import { useEffect } from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import './index.less';

export default function () {
  useEffect(() => {
    console.log('Hello from the setting page!');
  }, []);

  return (
    <div className="setting">
      <h1>setting page</h1>
    </div>
  );
}
