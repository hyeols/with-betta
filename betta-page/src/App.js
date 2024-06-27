import './App.css';
import Common from './common/Common.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuRoutes from './menu/index.tsx';
import { Home } from './common/page/index.ts';
import { useMenuStore } from './common/store/useMenuStore.ts';

function App() {
  // const setModalType = useCommStore((state) => state.setModalType);
  // useEffect(() => {
  //   const handleMouseMove = (event) => {
  //     const target = event.target;
  //     if(!target.closest('.common-header')) {
  //       setModalType('');
  //     }
  //   };
  //   document.body.addEventListener('mouseover', handleMouseMove);
  //   return () => {
  //     document.body.removeEventListener('mouseover', handleMouseMove);
  //   }
  // }, [])
    
  return (
    <>
      <Common/>
      <div className='common-body'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/list/*' element={<MenuRoutes/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

