const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "pjjg5qgfzzwpw3mj",
  publicKey: "4ckmjfr584xy37bw",
  privateKey: "4e285a947725b27910e358eab9dd6cac"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        // pass clientToken to your front-end
        if(err) {
            res.status(500).json(err)
        } else {
            res.send(response)
        }
      });
}

exports.processPayment =(req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err) {
              res.status().json(error)
          } else {
              res.json(result)
          }
      })
}