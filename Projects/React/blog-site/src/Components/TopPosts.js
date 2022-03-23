import React from 'react'
import StoriesFrame from './StoriesFrame'
import CatchyStory from './CatchyStory'
import SmallStory from './SmallStory';
import MountainGlacier from '../static/images/MountainGlacier.jpg';
import Stonehenge from '../static/images/Stonehenge.jpg'
const SmallStoryWithHrLine = props => <><hr /><SmallStory {...props} /></>
const TopPosts = () => {
    const data = [
        {
            image: MountainGlacier,
            title: 'Catch waves with an adventure',
            section: 'Travel',
            sectionLink: '#',
            articleLink: '#',
            date: 'August 21 2017'
        },
        {
            image: Stonehenge,
            title: 'Catch waves with an adventure',
            section: 'Travel',
            sectionLink: '#',
            articleLink: '#',
            date: 'August 21 2017'
        },
        {
            image: Stonehenge,
            title: 'Catch waves with an adventure',
            section: 'Travel',
            sectionLink: '#',
            articleLink: '#',
            date: 'August 21 2017'
        },
        {
            image: Stonehenge,
            title: 'Catch waves with an adventure',
            section: 'Travel',
            sectionLink: '#',
            articleLink: '#',
            date: 'August 21 2017'
        },
    ];
    return (
        <StoriesFrame title='Top Posts'>
            <CatchyStory {...data[0]} />
            {data.slice(1).map((article, index) => (<SmallStoryWithHrLine key={index} {...article} />))}
        </StoriesFrame>
    )
}

export default TopPosts