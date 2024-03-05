<script lang="ts" setup>
const { query } = useRoute()
const course = await useCourse()
const { auth } = useSupabaseClient()
const user = useSupabaseUser()

watchEffect(async () => {
  if (user.value) {
    await navigateTo(query.redirectTo as string, {
      replace: true,
    })
  }
})

async function login() {
  const redirectTo
    = query.redirectTo !== undefined
      ? `${window.location.origin}/confirm?redirectTo=${query.redirectTo}`
      : `${window.location.origin}/confirm`

  const { error } = await auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  })

  if (error)
    console.error(error)
}
</script>

<template>
  <div class="prose h-9 w-full max-w-2xl">
    <h1>Log in to {{ course.title }}</h1>
    <button
      class="rounded bg-blue-500 px-4 py-2 font-bold text-white"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>
