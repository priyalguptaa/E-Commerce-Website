import React from 'react'
import Banner from './Banner'
import HomeCatogary from './HomeCatogary'
import CategoryShowCase from "./CategoryShowCase"
import Register from './Register'
import LocationSprade from './LocationSprade'
import AboutUs from './AboutUs'
import AppSection from './AppSection'
import Sponsor from './Sponsor'
// in the home component we import all the componenet one by one
const home = () => {
  return (
    <div>
    <Banner/>
    <HomeCatogary/>
    <CategoryShowCase/>
    <Register/>
    <LocationSprade/>
    <AboutUs/>
    <AppSection/>
    <Sponsor/>
    </div>
  )
}

export default home