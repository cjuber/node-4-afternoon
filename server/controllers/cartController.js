const swag = require('../models/swag')

const add = (req,res) => {
    const {id} = req.params
    const {user} = req.session
    const index = user.cart.findIndex(swag => swag.id == id)

    if (index === -1) {
        const theSwag = swag.find(swag => swag.id == id)

        user.cart.push(theSwag)
        user.total += theSwag.price
    }
    res.status(200).send(user)

}
const deleteItem = (req,res) => {
    const {id} = req.params
    const {user} = req.session
    const index = user.cart.findIndex(swag => swag.id == id)
    const theSwag = swag.find(swag => swag.id == id)

    if(index !== -1){
        user.cart.splice(index,1)
        user.total -= theSwag.price

    }
res.status(200).send(user)

}
const checkout = (req,res) => {
    const {user} = req.session
    user.cart = []
    user.total = 0

    res.status(200).send(user)

}

module.exports = {

    checkout,
    add,
    deleteItem
}