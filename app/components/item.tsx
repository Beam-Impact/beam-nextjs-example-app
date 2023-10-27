import React, { useState } from 'react'
import { OnCartChangeFunction } from '../types'

const Item = 
({ 
imageUrl, 
itemName, 
itemPrice,
onAddToCart,
onRemoveFromCart
}:{
imageUrl: string
itemName: string
itemPrice: string
onAddToCart: OnCartChangeFunction
onRemoveFromCart: OnCartChangeFunction
}) => {
const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    onAddToCart({ imageUrl, itemName, itemPrice, quantity })
  }

  const handleRemoveFromCart = () => {
    onRemoveFromCart({ imageUrl, itemName, itemPrice, quantity })
  }

  return (
    <div className="item-container" style={{padding: "20px 0px"}}>
        <img width={300} src={imageUrl} alt={itemName} className="item-image" />
        <h2 className="item-name">{itemName} - ${itemPrice}</h2>
        <div>
            <span>
            <button onClick={handleAddToCart}>Add to Cart</button>
            </span>
            <span style={{padding: "0px 10px"}}>
            <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={{
                fontSize: "14px",
                textAlign: "center",
                width: "40px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                color: "black"
            }}
            />
            </span>
            <button onClick={handleRemoveFromCart}>Remove from Cart</button>
            
        </div>
    </div>
  )
}

export default Item