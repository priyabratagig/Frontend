import React, { useState, useRef, useEffect } from 'react'
import './Bollywood.scss'
import Advertisemtn from './Advertisemtn'
import TopPosts from './TopPosts'
import LatestArticleBollywood from './LatestArticleBollywood'
const breakPoint = {
    mobile: 768
};
const Bollywood = () => {
    //view mode
    const [view, setView] = useState({ isMobile: document.body.offsetWidth < breakPoint.mobile });
    const isMobile = useRef(view.isMobile);
    isMobile.current = view.isMobile;
    //initializing resize event listener and remove fucntion
    useEffect(() => {
        //resize handler
        const resizeEvent = (() => {
            let windowResizeBuffer = undefined;
            //lowering number of state change or re-render
            //canceling previous resize event call requested within 1 second
            return () => {
                clearTimeout(windowResizeBuffer);
                if ((document.body.offsetWidth >= breakPoint.mobile && isMobile.current !== false) ||
                    (document.body.offsetWidth < breakPoint.mobile && isMobile.current !== true))
                    windowResizeBuffer = setTimeout(() => {
                        setView({ isMobile: document.body.offsetWidth < breakPoint.mobile });
                    }, 1000);
            }
        })();
        window.addEventListener('resize', resizeEvent);
        //remove animation and window listener on unmount 
        return () => {
            window.removeEventListener('resize', resizeEvent);
        }
    }, [])
    return (
        <div className='bollywood__main'>
            <LatestArticleBollywood />
            {!view.isMobile && <Advertisemtn />}
            <TopPosts />
        </div>
    )
}

export default Bollywood