import React from 'react'
import { useEffect,useState } from 'react'
function Eyes(){
    const[ang,setangle]=useState(0)
    useEffect(()=>{
        window.addEventListener("mousemove",function(dets){
            const mouseX = dets.clientX;
            const mouseY = dets.clientY;
            const deltaX = mouseX - window.innerWidth / 2;
            const deltaY = mouseY - window.innerHeight / 2;
           var angle=Math.atan2(deltaY,deltaX)*(180/Math.PI)
           setangle(angle-180)
        })
    })
    return(
    <>
      <div className='white-ball'>
                <div className='black-ball'>
                    <div className='rotate' style={{transform:`translate(-50%,-50%) rotate(${ang}deg)`}}>
                       <div className='dot'></div>
                    </div>
                </div>
     </div>

    </>)
}

export default Eyes