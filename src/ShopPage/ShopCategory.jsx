import React from 'react'
import Data from '../products.json'
const ShopCategory = ({filterItem, setItem, menuItems, setProducts, selectedCategory}) => {
  return (
    // empty tag is basically used to collect the multiple component together and this is clled react fragment
    <>
      <div className='widget-header'>
        <h5 className='ms-2'>All Categories</h5>
      </div>

    <button onClick={()=> setProducts(Data)} className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}>All</button>
      <div>
        {
            menuItems.map((val, id) =>{
                return(
                    <button className={`m-2 ${selectedCategory === val ? "bg-warning" : ""}`} 
                            key={id}
                            onClick={()=>filterItem(val)}    
                            >
                      {val}
                    </button>
                )
            })
        }
      </div>
    </>
  )
}

export default ShopCategory