import { useMemo } from "react";
const carouelAnimation = () => {
    let slideRepositionTimeOut = undefined;
    let animationIntervalID = undefined;
    let _slides = undefined;
    let _slideContorls = null;
    let _startFrom = 0;
    //set animation
    const setNewAnimationID = id => {
        clearInterval();
        return animationIntervalID = id;
    }
    //get running animation id
    const getCurrAnimationId = () => animationIntervalID;
    //set strat point
    const setStart = from => {
        if (typeof from !== 'number' && from < 0) {
            console.error(`Invalid start point
            Expected integer 0 to index of last slide`)
            return false;
        }
        _startFrom = from;
    };
    //clerar animation and make undefined
    const clearAnimation = () => {
        clearInterval(animationIntervalID);
        animationIntervalID = undefined;
    };
    //clear slide reposition request and make undefiend
    const clearReposition = () => {
        clearTimeout(slideRepositionTimeOut);
        slideRepositionTimeOut = undefined;
    };
    //remove animation and reposition
    //remove slides
    const carouselUnmount = () => {
        clearAnimation();
        clearReposition();
        //release slides
        _slides = undefined;
        _slideContorls = undefined;
        _startFrom = 0;
    }
    //presetings before carusole animation effect
    const animationInit = (slides, slideContorls = null) => {
        //remove previous interval and timeout if any
        clearAnimation();
        clearReposition();
        //presetting parent's positon
        //child's position, visibility, transition, top and opacity
        try {
            slides[0].parentElement.style.position = 'relative';
            if (_startFrom >= slides.length) {
                console.error('Provided start point is out of range');
                _startFrom = 0;
            };
            Array.prototype.forEach.call(slides, (slide, index) => {
                slide.style.visibility = '';
                slide.style.position = 'absolute'
                if (index === _startFrom) {
                    slide.style.top = '0';
                    slide.style.opacity = '1'
                    if (slideContorls !== null) slideContorls[index].checked = true;
                }
                else {
                    slide.style.top = '100%';
                    slide.style.opacity = '0'
                    if (slideContorls !== null) slideContorls[index].checked = false;
                }
                slide.style.transition = 'top 2s, opacity 4s';
            });
        }
        catch (error) {
            console.error('Removing Animation...');
            console.error(error);
            carouselUnmount();
        };
        //stoirng slides and contorls when specifed
        _slides = typeof slides !== 'undefined' ? slides : _slides;
        _slideContorls = slideContorls !== null ? slideContorls : _slideContorls;
    };
    //continuously changing images animation
    //with top, opacity and visibility properties
    const animationStart = () => {
        //removeing repositioning if execution orded not followed
        clearTimeout(slideRepositionTimeOut);
        try {
            const nextSlide = _startFrom === _slides.length - 1 ? 0 : _startFrom + 1;
            const previousSlide = _startFrom === 0 ? _slides.length - 1 : _startFrom - 1;
            //step 6
            //make previous slide visbile 
            _slides[previousSlide].style.visibility = 'visible';
            //setp 1
            //push up and fade out current slide
            //mark data-slide-active false and slidecontrol unchecked
            _slides[_startFrom].style.top = '-100%';
            _slides[_startFrom].style.opacity = '0';
            _slides[_startFrom].dataset.slideActive = 'false';
            if (_slideContorls !== null) _slideContorls[_startFrom].checked = false;
            //setp 2
            //pull up and fade in next slide
            //mark data-slide-active true and slidecontrol unchecked
            _slides[nextSlide].style.opacity = '1';
            _slides[nextSlide].style.top = '0';
            _slides[nextSlide].dataset.slideActive = 'true';
            if (_slideContorls !== null) _slideContorls[nextSlide].checked = true;
            //setp 3
            //wait 2s for top transition to be completed
            //make invisilbe and push down the current slide
            slideRepositionTimeOut = setTimeout((slide) => {
                if (slideRepositionTimeOut !== undefined) {
                    slide.style.visibility = 'hidden';
                    slide.style.top = '100%';
                };
            }, 2000, _slides[_startFrom]);
            _startFrom = _startFrom === _slides.length - 1 ? 0 : _startFrom + 1;
        }
        catch (error) {
            console.error('Removing Animation...');
            console.error(error);
            carouselUnmount();
        };
    };
    //stopinng the current animation interval and timeouts
    const animationStop = () => {
        //clearing current animation, timeout and interval
        clearAnimation();
        clearReposition();
        //clearing all styles
        try {
            _slides[0].parentNode.style.position = '';
            Array.prototype.forEach.call(_slides, slide => {
                slide.style.transition = '';
                slide.style.position = '';
                slide.style.top = '';
                slide.style.opacity = '';
                slide.style.visibility = '';
            });
        }
        catch (error) {
            console.error('Removing Animation...');
            console.error(error);
            carouselUnmount();
        };
    }
    return [setStart, animationInit, animationStart, getCurrAnimationId, setNewAnimationID, animationStop, carouselUnmount]
}
const useCarousel = () => {
    const [setStart, animationInit, animationStart, getAnimationId, setNewAnimationID, animationStop, carouselUnmount] = useMemo(carouelAnimation, []);
    //start carousel at
    const carouselStartFrom = from => {
        if (getAnimationId() !== undefined) {
            console.error(`Strating point should not be changed during animation is running
            use carouselShiftSlide(<(integer) from 0 to index of last slide>)
            use carouselStop() before changing start point`);
            return false;
        }
        setStart(from);
    };
    //start carousel
    const carouselStart = (slides, slideContorls = null) => {
        //return error message if carousel already started
        if (getAnimationId() !== undefined) {
            console.error(`carouselStart() should not be called while an animation is running
            call carouselStop() before re-starting carousel`);
            return false;
        };
        //handel if arguments are not objet type
        try {
            //return error message if slide is not iterable object
            if (!(slides[Symbol.iterator] instanceof Function)) {
                console.error(`aguments[0]: Object is not Iterable`);
                return false;
            };
            //return error message if given slide contril is not iterable object
            if (!(slideContorls !== null && slideContorls[Symbol.iterator] instanceof Function)) {
                console.error(`aguments[1]: Object is not Iterable`);
                return false;
            };
            //return error message if any of slides is not existing dom element
            if (Array.prototype.some.call(slides, slide => !(slide.closest('body') instanceof HTMLElement))) {
                console.error(`aguments[0]: contains non-dom object`);
                return false;
            };
            //return error message if any of given slide controls is not dom element
            if (slideContorls !== null && Array.prototype.some.call(slideContorls, slideContorl => !(slideContorl.closest('body') instanceof HTMLElement))) {
                console.error(`aguments[0]: contains non-dom object`);
                return false;
            };
            //return error message if slides are not child of same parent
            if (Array.prototype.some.call(slides, slide => !(slides[0].parentElement.contains(slide)))) {
                console.error(`aguments[0]: elements are not children of same parent`);
                return false;
            };
            //return error message if slide controls are not child of same parent
            if (Array.prototype.some.call(slideContorls, slideContorl => !(slideContorls[0].parentElement.contains(slideContorl)))) {
                console.error(`aguments[0]: elements are not children of same parent`);
                return false;
            };
        }
        catch (error) {
            if (error instanceof TypeError)
                console.error('Recived Non-Object')
            console.error(error);
        }
        //start carousel all condition met
        animationInit(slides, slideContorls);
        return setNewAnimationID(setInterval(animationStart, 4000));
    };
    //slide shifter, start form any point
    const carouselShiftSlide = (toIndex) => {
        animationStop();
        setStart(toIndex + 1);
        animationInit();
        return setNewAnimationID(setInterval(animationStart, 4000));
    }
    //stop carousle
    const carouselStop = animationStop;
    return { carouselStartFrom, carouselStart, carouselStop, carouselShiftSlide, carouselUnmount }
}
export default useCarousel;
// useCarousel coustom hook, will return an object of fucntions that can start, stop and control carousel behaviours
// Functions
// carouselStratFrom: (arguments) Slide index from 0 to index of last slide. Set the slide from where to begin the carousel
// carouselStart: (arguments) DOM element that are siblings, DOM element that are siblings. Start the carousel
// carouselShiftSlide: (arguments) Slide index from 0 to index of last slide. Shift slides back and forward during the animation
// carouselStop: Removes the animation and resets styles
// carouselUnmount: Removes the animation and cancels the delayed (async) slide re-position request