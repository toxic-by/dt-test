<script>
  import { ref, toRef } from 'vue';
  import { CURRENCIES_TYPES } from '../enums/currencies'

  export default {
    props: {
      selected: Object
    },
    setup(props) {
      const selected = toRef(props, 'selected')
      const types = ref(CURRENCIES_TYPES)

      return { types, selected }
    },
  }
</script>

<template>
  <span>
    <input type="number"  :value="selected.value" @input="$emit('inputValue', $event)">
    <select v-model="selected.currency" @input="$emit('selectCurrency', $event)">
      <option v-for="(tp, code) in types" :value="code">{{ tp }}</option>
    </select>
  </span>
</template>

<style scoped>

</style>
