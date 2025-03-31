import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food } = useContext(StoreContext);

    return (
        <div className='food-display container' id='food-display'>
            <h2>Top Dishes For You</h2>
            <div className="food-display-list">
                {food && food.length > 0 ? (
                    food.map((item, index) => (
                        <FoodItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            image={item.image}
                            price={item.price}
                        />
                    ))
                ) : (
                    <p>Loading food items...</p>
                )}
            </div>
        </div>
    )
}

export default FoodDisplay
