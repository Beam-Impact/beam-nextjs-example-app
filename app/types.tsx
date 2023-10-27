export type Items = {
imageUrl: string
itemName: string
itemPrice: string
}
export type ItemType = {
imageUrl: string
itemName: string
itemPrice: string
quantity: number
}

export type OnCartChangeFunction = (item: ItemType) => void

