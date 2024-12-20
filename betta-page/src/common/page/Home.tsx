import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
  const [ testStr, setTestStr ] = useState<String>('');
  const homeDivRef = useRef<HTMLDivElement>(null);
  const clickBtn = () => {
    axios.get('http://localhost:38100/getHelloWorld')
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log('err!! >> ' + err))
  }
  return (
    <>
      <div>Hello World</div>
      <div><button onClick={clickBtn}>TEST</button></div>
      <div ref={homeDivRef}>

      </div>
    </>
  );
}
export default Home;