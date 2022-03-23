import React, { useState } from 'react'
import mountain from '../static/images/mountain.jpg'
import mountainSecondary from '../static/images/mountain-scondary.jpg'
import MountainGlacier from '../static/images/MountainGlacier.jpg'
import arrowLeft from '../static/Icons/arrowLeft.svg'
import arrowRight from '../static/Icons/arrowRight.svg'
import ImageTile from './ImageTile'
import './VerticalGallerySingleTile.scss'
function VerticalGallerySingleTile() {
    const data = [
        {
            image: MountainGlacier,
            heading: ['Title of vertical gallery'],
            section: 'Travel',
            sectionLink: '#',
            linkTo: '#',
            date: 'August 21 2017',
        },
        {
            image: mountain,
            heading: ['The Sound cloud', 'You loved is doomed'],
            section: 'Travel',
            sectionLink: '#',
            linkTo: '#',
            date: 'August 21 2017',
        },
        {
            image: mountainSecondary,
            heading: ['The Sound cloud', 'You loved is doomed'],
            section: 'Travel',
            sectionLink: '#',
            linkTo: '#',
            date: 'August 21 2017',
        }
    ];
    const [slideNo, changeSlideNo] = useState(0);
    return (
        <section className='gallerySingleTile'>
            <div className='gallerySingleTile__arrow gallerySingleTile__arrow--left'>
                <img src={arrowLeft} alt="right arrow" onClick={() => changeSlideNo((slideNo) => slideNo === 0 ? data.length - 1 : slideNo - 1)} />
            </div>
            <ImageTile {...data[slideNo]} />
            <div className='gallerySingleTile__arrow gallerySingleTile__arrow--right'>
                <img src={arrowRight} alt="right arrow" onClick={() => changeSlideNo((slideNo) => slideNo === data.length - 1 ? 0 : slideNo + 1)} />
            </div>
        </section>
    )
}

export default VerticalGallerySingleTile