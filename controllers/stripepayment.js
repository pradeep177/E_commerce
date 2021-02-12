const stripe = require('stripe')(process.env.SECRETKEY)
const { v1: uuidv1 } = require('uuid');



exports.makepayment = (req, res) => {
    const {products, token} = req.body
    console.log("products", products)

    // const sum = products.reduce((amount, product) => {
    //     return amount += product.price
    // });
  
    let amount = 0;
    products.map(p => {
        amount = amount + p.price;
    })

    //used to charge customer once for any product
    const idempotencyKey = uuidv1()
    return stripe.customers.create({
        email: token.email,
        source: token.id,
    }).then((customer) => {
        stripe.charges.create({
            amount:amount * 100,
            currency:"usd",
            customer:customer.id,
            receipt_email: token.email,
            description: "a test account",
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.postal_zip
                }
            }
        }, {idempotencyKey})
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    })
}