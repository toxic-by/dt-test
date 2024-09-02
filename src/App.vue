<script >
import { ref, computed } from 'vue'

export default {
  setup() {
    const rates = ref({})
    const active = computed(() => Object.keys(rates.value).length)
    return {
      rates,
      active
    }
  },
  async mounted() {
    await fetch("https://status.neuralgeneration.com/api/currency")
      .then(async (response) => {
        const data = await response.json()
        this.rates = data
      })
      .catch((error) => {return error})
  },
}
</script>

<template>
  <nav>
    <router-link to="/">home</router-link>
    |
    <router-link to="/convert">convert</router-link>
  </nav>
  <main>
    <router-view v-if="active" :rates="rates"/>
  </main>
</template>

<style scoped>

</style>
