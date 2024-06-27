import logo from './logo.svg';
import './App.css';
import Common from './common/Common.tsx';
import { useEffect } from 'react';
import { useCommStore } from './common/store/useCommStore.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuRoutes from './menu/index.tsx';

function App() {
  const setModalType = useCommStore((state) => state.setModalType);
  useEffect(() => {
    const handleMouseMove = (event) => {
      const target = event.target;
      if(!target.closest('.common-header')) {
        setModalType('');
      }
    };
    document.body.addEventListener('mouseover', handleMouseMove);
    return () => {
      document.body.removeEventListener('mouseover', handleMouseMove);
    }
  }, [])
  return (
    <>
      <Common/>
      <div className='common-body'>
        <BrowserRouter>
          <Routes>
            <Route path='/list/*' element={<MenuRoutes/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

