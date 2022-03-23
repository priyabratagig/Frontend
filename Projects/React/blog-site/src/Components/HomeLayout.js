import React, { useState, useRef, useEffect } from 'react'
import './HomeLayout.scss'
import Advertisemtn from './Advertisemtn'
import LatestArticle from './LatestArticels'
import LatestStories from './LatestStories'
import TheLatest from './TheLatest'
import TopPosts from './TopPosts'
import VerticalGallery from './VerticalGallery'
import VerticalGallerySingleTile from './VerticalGallerySingleTile'
const breakPoint = {
    mobile: 768
};
const HomeLayout = () => {
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
        <>
            <VerticalGallery />
            <TheLatest />
            <div className='home__main'>
                <LatestArticle />
                {!view.isMobile && <Advertisemtn />}
                {!view.isMobile && <VerticalGallerySingleTile />}
                <TopPosts />
            </div>
            <LatestStories />
        </>
    )
}

export default HomeLayout