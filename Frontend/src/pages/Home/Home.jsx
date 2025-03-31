import React, { useState } from 'react'
import './Home.css'
import HeroSection from '../../components/HeroSection/HeroSection'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <HeroSection/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home
