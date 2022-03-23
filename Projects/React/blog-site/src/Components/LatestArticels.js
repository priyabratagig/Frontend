import React from 'react'
import Stonehenge from '../static/images/Stonehenge.jpg'
import SmallStory from './SmallStory'
import StoriesFrame from './StoriesFrame'
import './LatestArticles.scss'
const SmallStoryWithHrLine = props => <><hr /><SmallStory {...props} /></>
const LatestArticle = () => {
    const data = [
        {
            image: Stonehenge,
            title: 'Catch waves with an adventure',
            brief: 'Gujarat is vastly underrated and it’s a mystery to us',
            section: 'Travel',
            sectionLink: '#',
            articleLink: '#',
            date: 'August 21 2017'
        },
        {
            image: Stonehenge,
            title: 'Catch waves with an adventure',
            brief: 'Gujarat is vastly underrated and it’s a mystery to us',
            section: 'Travel',
            sectionLink: '#',
            articleLink: '#',
            date: 'August 21 2017'
        },
        {
            image: Stonehenge,
            title: 'Catch waves with an adventure',
            brief: 'Gujarat is vastly underrated and it’s a mystery to us',
            section: 'Travel',
            sectionLink: '#',
            articleLink: '#',
            date: 'August 21 2017'
        },
        {
            image: Stonehenge,
            title: 'Catch waves with an adventure',
            brief: 'Gujarat is vastly underrated and it’s a mystery to us',
            section: 'Travel',
            sectionLink: '#',
            articleLink: '#',
            date: 'August 21 2017'
        }
    ];
    return (
        <StoriesFrame title='Latest Articles'>
            {data.map((article, index) => (<SmallStoryWithHrLine {...article} key={index} />))
            }
        </StoriesFrame >
    )
}
export default LatestArticle