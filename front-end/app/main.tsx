import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const Main = () => {

  return (
    <main>
      <div className="conveyor_belt_1">
        <div className="conveyor_belt_1_element"><img src="/images/1.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/2.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/3.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/4.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/5.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/6.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/7.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/8.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/9.png" alt=""></img></div>
        <div className="conveyor_belt_1_element"><img src="/images/10.png" alt=""></img></div>
      </div>
      <div className='main_container'>
        <div className='main_container_1'><img src="/images/main_img.png" alt=""></img></div>
        <div className='main_container_2'>
          <div className='main_container_2_text'>DESTINATION OF YOUR DREAM</div>
          <div className='main_container_2_img'><img src="/images/logo.png" alt=""></img></div>
          <Link href='/editor'><div className='main_container_2_btn'>LET'S GO</div></Link>
        </div>
      </div>
      <div className="conveyor_belt_2">
        <div className="conveyor_belt_2_element"><img src="/images/1.png" alt=""></img></div>
        <div className="conveyor_belt_2_element"><img src="/images/2.png" alt=""></img></div>
        <div className="conveyor_belt_2_element"><img src="/images/3.png" alt=""></img></div>
        <div className="conveyor_belt_2_element"><img src="/images/4.png" alt=""></img></div>
        <div className="conveyor_belt_2_element"><img src="/images/5.png" alt=""></img></div>
        <div className="conveyor_belt_2_element"><img src="/images/6.png" alt=""></img></div>
        <div className="conveyor_belt_2_element"><img src="/images/7.png" alt=""></img></div>
        <div className="conveyor_belt_2_element"><img src="/images/8.png" alt=""></img></div>
        <div className="conveyor_belt_2_element"><img src="/images/9.png" alt=""></img></div>
        <div className="conveyor_belt_2_element "><img src="/images/10.png" alt=""></img></div>
      </div>
    </main>
  )
}

export default Main;