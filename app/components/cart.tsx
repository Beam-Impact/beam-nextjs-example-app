import React from 'react'
import { ItemType } from '@/app/types'

interface CartProps {
  cartItems: ItemType[]
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + parseFloat(item.itemPrice) * item.quantity, 0).toFixed(2)

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((cartItem, index) => (
          <li key={index}>
            {cartItem.itemName} - ${cartItem.itemPrice} - Quantity: {cartItem.quantity}
          </li>
        ))}
      </ul>
      <div>
        <h2>Total: ${totalPrice}</h2>
        <button>Checkout</button>
      </div>
    </div>
  )
}

export default Cart
