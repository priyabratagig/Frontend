import React, { useEffect, useRef, useState } from 'react'
import mountain from '../static/images/mountain.jpg'
import mountainSecondary from '../static/images/mountain-scondary.jpg'
import './VerticalGallery.scss'
import useCarousel from './useCarousel'
import ImageTile from './ImageTile'
const breakPoint = {
    mobile: 768
};
const VerticalGallery = () => {
    //data
    const slides = [
        {
            image: mountain,
            heading: ['Title of vertical gallery'],
            section: 'Travel',
            date: 'August 21 2017',
            linkTo: '#',
            sectionLink: '#'
        },
        {
            image: mountainSecondary,
            heading: ['The Sound cloud', 'You loved is doomed'],
            section: 'Travel',
            date: 'August 21 2017',
            linkTo: '#',
            sectionLink: '#'
        },
        {
            image: mountainSecondary,
            heading: ['The Sound cloud', 'You loved is doomed'],
            section: 'Travel',
            date: 'August 21 2017',
            linkTo: '#',
            sectionLink: '#'
        }
    ];
    //state and refference
    const [view, setView] = useState({ isMobile: document.body.offsetWidth < breakPoint.mobile });
    const isMobile = useRef(view.isMobile);
    //target element for carousel
    const carousleContainer = React.createRef();
    //make carousel
    const { carouselStart, carouselStop, carouselShiftSlide, carouselUnmount } = useCarousel();
    //inilization windowsize listener
    //remove eventlistener & carousel function
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
            carouselUnmount();
            window.removeEventListener('resize', resizeEvent);
        }
    }, [])
    //update on view mode change
    //staring or stoping carousle
    useEffect(() => {
        isMobile.current = view.isMobile;
        if (isMobile.current) {
            const slides = carousleContainer.current.querySelectorAll(':scope > *:nth-child(-n+3)');
            const slideContorls = carousleContainer.current.querySelectorAll(':scope > div:last-of-type > input');
            carouselStart(slides, slideContorls);
        }
        else carouselStop();
    }, [view.isMobile]);
    return (
        <section className='gallery' ref={carousleContainer}>
            {slides.map((slide, index) => (<ImageTile key={index} {...slide} />))}
            <div style={{ zIndex: '1', position: 'absolute', bottom: '1%', right: '.5%', writingMode: 'vertical-lr' }}>
                {view.isMobile && slides.map((_, index) => (
                    <input type="radio" onClick={() => carouselShiftSlide(index)} />
                ))}
            </div>
        </section>
    )
}
export default VerticalGallery;