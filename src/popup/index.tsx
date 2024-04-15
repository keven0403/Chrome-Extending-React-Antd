import { createRoot } from 'react-dom/client';
import Popup from '../pages/Popup';

const rootContainer = document.getElementById('root') as HTMLElement;
createRoot(rootContainer).render(<Popup />);