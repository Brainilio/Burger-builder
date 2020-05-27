import React from 'react'
import classes from './BurgerIngredient.module.css'
import PropTypes from 'prop-types'

const burgerIngredient = (props) => { 
    let ingredient = null; 

    // Switch case to detect what the ingredient passed is to apply class to it for proper styling
    switch(props.type) { 
        case('bread-bottom'): 
        ingredient = <div className={classes.BreadBottom}></div>; 
        break; 
        case('bread-top'):
        ingredient = (
            <div className={classes.BreadTop}> 
                <div className={classes.Seeds1}> </div>
                <div className={classes.Seeds2}> </div>
            </div>
        );
        break; 
        case('meat'): 
        ingredient = <div className={classes.Meat}></div>
        break; 
        case('cheese'): 
        ingredient = <div className={classes.Cheese}></div>
        break; 
        case('bacon'): 
        ingredient = <div className={classes.Bacon}></div>
        break; 
        case('salad'): 
        ingredient = <div className={classes.Salad}></div>
        break; 
        default: 
        ingredient = null; 
    }

    return ingredient;
}

// Prop type validation 
burgerIngredient.propTypes = { 
    type: PropTypes.string
}

export default burgerIngredient