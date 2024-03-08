import Stripe from 'stripe'

const config = useRuntimeConfig()
const stripeInstance = new Stripe(config.stripeSecret)

export default stripeInstance
