<script setup lang="ts">
defineEmits<{
  (event: 'close'): void
}>()

const course = await useCourse()
const config = useRuntimeConfig()

const stripe = ref(null)
const card = ref(null)
const email = ref('')
const processingPayment = ref(false)
const success = ref(false)
const paymentIntentId = ref(null)

const formStyle = {
  base: {
    'fontSize': '16px',
    'color': '#3d4852',
    '::placeholder': {
      color: '#8795a1',
    },
  },
}

const elements = computed(() => stripe.value?.elements())

function setupStripe() {
  stripe.value = Stripe(config.public.stripeKey)

  if (!card.value && elements.value) {
    card.value = elements.value.create('card', {
      style: formStyle,
    })

    if (card.value)
      card.value.mount('#credit-card')
  }
}

async function handleSubmit() {
  if (email.value === '')
    return

  processingPayment.value = true
  let secret

  try {
    // Create a PaymentIntent with the order amount and currency
    const response = await $fetch('/api/stripe/paymentIntent', {
      method: 'POST',
      body: {
        email: email.value,
      },
    })
    secret = response
  }
  catch (error) {
    console.error(error)
  }

  try {
    const response = await stripe.value?.confirmCardPayment(secret, {
      payment_method: {
        card: card.value,
      },
      receipt_email: email.value,
    })

    if (response.paymentIntent.status === 'succeeded') {
      success.value = true
      paymentIntentId.value = response.paymentIntent.id
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    processingPayment.value = false
  }
}

async function login() {
  if (!paymentIntentId.value)
    return

  const redirectTo = `/linkWithPurchase/${paymentIntentId.value}`

  await navigateTo(`/login?redirectTo=${redirectTo}`)
}

useHead({
  script: [
    {
      hid: 'stripe',
      src: 'https://js.stripe.com/v3/',
      onload: setupStripe,
    },
  ],
})
</script>

<template>
  <Modal @close="$emit('close')">
    <div class="rounded-xl bg-slate-200 p-8">
      <div
        v-if="success"
        class="flex flex-col items-center justify-center space-y-6"
      >
        <h2 class="text-xl font-bold">
          Thanks for buying the course!
        </h2>
        <button
          class="text-md focus:shadow-outline mt-4 flex h-12 w-full items-center justify-center rounded bg-blue-300 px-16 text-black transition hover:bg-blue-200 focus:outline-none"
          @click="login"
        >
          Login with Github to access
        </button>
      </div>
      <form v-else @submit.prevent="handleSubmit">
        <h2 class="text-center text-xl font-bold">
          Buying {{ course.title }}
        </h2>
        <div class="mt-8 rounded bg-white px-8 py-6 text-base shadow-md">
          <div class="mb-6 flex w-full items-center justify-between">
            <label class="font-bold">Email</label>
            <input
              v-model="email"
              class="input ml-6 w-full text-left focus:outline-none"
              type="email"
              autocomplete="email"
              placeholder="your@email.com"
              required
            >
          </div>
          <div id="credit-card" class="h-[20px]">
            <!-- Stripe will create input elements here -->
          </div>
        </div>
        <button
          class="focus:shadow-outline mt-4 flex h-12 w-full items-center justify-center rounded px-16 font-sans text-lg font-bold text-black transition focus:outline-none"
          :class="
            processingPayment || email === ''
              ? 'cursor-not-allowed bg-gray-300'
              : 'cursor-pointer bg-yellow-300 hover:bg-yellow-200'
          "
          :disabled="processingPayment || email === ''"
        >
          <Loading v-if="processingPayment" class="h-5 w-5" />
          <div v-else>
            Pay $97
          </div>
        </button>
      </form>
    </div>
  </Modal>
</template>
