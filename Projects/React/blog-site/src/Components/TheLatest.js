import React from 'react'
import House from '../static/images/House.jpg'
import CatchyStory from './CatchyStory'
import StoriesFrame from './StoriesFrame'
import './TheLatest.scss'

function TheLatest() {
    const data = [
        {
            image: House,
            title: 'Joshua Tree Overnight Adventure',
            brief: 'Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces',
            section: 'Travel',
            date: 'August 21 2017',
            sectionLink: '#',
            articleLink: '#',
        },
        {
            image: House,
            title: 'Joshua Tree Overnight Adventure',
            brief: 'Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces',
            section: 'Travel',
            date: 'August 21 2017',
            sectionLink: '#',
            articleLink: '#',
        },
        {
            image: House,
            title: 'Joshua Tree Overnight Adventure',
            brief: 'Gujarat is vastly underrated and it’s a mystery to us why the region isn’t more well-known as a tourist destination. It has a plethora of temples and palaces',
            section: 'Travel',
            date: 'August 21 2017',
            sectionLink: '#',
            articleLink: '#',
        }
    ]
    return (
        <StoriesFrame title='The Latest' className='container--expandable'>
            {data.map((article, index) => (<CatchyStory {...article} key={index} />))}
        </StoriesFrame>
    )
}

export default TheLatest