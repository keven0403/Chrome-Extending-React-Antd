import { useEffect } from 'react';
import './index.less';

export default function () {
  useEffect(() => {
    console.log('Hello from the options!');
  }, []);

  return (
    <div className="options">
      <h1>this is options page</h1>
    </div>
  );
}
