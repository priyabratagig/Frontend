import React, { useRef, useState, useEffect, createRef } from "react";
import { NavLink } from 'react-router-dom'
import './Header.scss'
const breakPoint = {
    mobile: 768
};
function Header() {
    //view mode
    const [view, setView] = useState({ isMobile: document.body.offsetWidth < breakPoint.mobile });
    const isMobile = useRef(view.isMobile);
    isMobile.current = view.isMobile;
    const ref = createRef();
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
    const handleClick = () => {
        if (ref.current.style.bottom === '-150%') {
            ref.current.style.bottom = '100%'
            ref.current.style.visibility = 'hidden'
        }
        else {
            ref.current.style.bottom = '-150%'
            ref.current.style.visibility = 'visible'
        }
    }
    return (
        <header className="nav">
            <h1 className="nav__logo">
                <span>The</span>
                <span>Siren</span>
            </h1>
            {view.isMobile && <div className="nav__button" onClick={handleClick}>
                <hr />
                <hr />
                <hr />
            </div>}
            <nav className="nav__links" ref={ref}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/bollywood'>Bollywood</NavLink>
                <NavLink to='/technology'>Technology</NavLink>
                <NavLink to='/hollywood'>Hollywood</NavLink>
                <NavLink to='/fitness'>Fitness</NavLink>
                <NavLink to='/food'>Food</NavLink>
            </nav>
        </header>
    );
}

export default Header;
