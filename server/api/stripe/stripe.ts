import Stripe from 'stripe'

const config = useRuntimeConfig()
const stripe = new Stripe(config.stripeSecret, {
  apiVersion: '2022-11-15',
})

export default stripe
