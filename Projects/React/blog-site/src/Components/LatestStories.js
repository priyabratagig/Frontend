import React from 'react'
import { Link } from 'react-router-dom';
import CatchyStory from './CatchyStory';
import StoriesFrame from './StoriesFrame'
import arrowLeftRed from '../static/Icons/arrowLeftRed.svg'
const LatestStories = () => {
    const data = [
        {
            title: ['Catch waves with an adventure guide'],
            brief: 'Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces',
            section: 'TECH',
            sectionLink: '#',
            linkTo: '#',
            date: 'TODAY AT 11:54'
        },
        {
            title: ['Catch waves with an adventure guide'],
            brief: 'Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces',
            section: 'TECH',
            sectionLink: '#',
            linkTo: '#',
            date: 'TODAY AT 11:54'
        },
        {
            title: ['Catch waves with an adventure guide'],
            brief: 'Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces',
            section: 'TECH',
            sectionLink: '#',
            linkTo: '#',
            date: 'TODAY AT 11:54'
        }
    ];

    return (
        <StoriesFrame title='Latest Stories' className='container--expandable container--table'>
            {data.map((article, index) => <CatchyStory key={index} {...article} />)}
            <Link to='#' style={{ textDecoration: 'none', color: '#A2A2A2', display: 'flex', columnGap: '2%', alignItems: 'center' }}><span>LOAD MORE</span> <i><img src={arrowLeftRed} alt="icon" /></i></Link>
        </StoriesFrame>
    )
}

export default LatestStories