<template>
  <div class="wrapper">
    <div class="rates">
      <h4  v-for="rate in ratesProcessed">
        <template v-if="rate.visible">
          {{ rate.currency }}
          {{ rate.price }}
        </template>
      </h4>
    </div>
    <div class="inputs">
      <currency-input
        :selected="selectedValue1"
        @inputValue="inputValue1"
        @selectCurrency="onSelect1"
      ></currency-input>
      <currency-input
        :selected="selectedValue2"
        @inputValue="inputValue2"
        @selectCurrency="onSelect2"
      ></currency-input>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import CurrencyInput from '../components/currency-input.vue'
import { CURRENCIES_TYPES, CURRENCIES_CODES } from '../enums/currencies'

export default {
  components: {
    CurrencyInput
  },

  props: {
    rates: Object
  },

  setup({ rates }) {
    const selectedValue1 = ref({ currency: CURRENCIES_CODES.RUB, value: "0" })
    const selectedValue2 = ref({ currency: CURRENCIES_CODES.EUR, value: "0" })

    const ratesProcessed = computed(() => {
      const result = {
        [CURRENCIES_CODES.RUB]: {
          currency: CURRENCIES_TYPES[CURRENCIES_CODES.RUB],
          price: '1',
          visible: false
        }
      };

      Object.keys(rates)
        .filter(k => (
          k === 'usd-rub' ||
          k === 'eur-rub')
        ).forEach(key => {
          const currency = key.split('-')[0].toUpperCase();
          const k = CURRENCIES_CODES[currency];

          result[k] = {
            currency: currency,
            price: parseFloat(rates[key]).toFixed(2),
            visible: true
          }
        });

      return result;
    });

    const getString = (start, end) => {
      const str =  start + '-' + end;
      return str.toLowerCase();
    }

    const inputValue1 = (event) => {   
      const inputValue = parseFloat(event.target.value, 10);
      if (!isNaN(inputValue)) {
        const cur1 = ratesProcessed.value[selectedValue1.value.currency].currency;
        const cur2 = ratesProcessed.value[selectedValue2.value.currency].currency;
        const exchange = event.target.value * rates[getString(cur1, cur2)];
        selectedValue1.value.value = inputValue;
        selectedValue2.value.value = exchange.toFixed(2);
      }
    }

    const inputValue2 = (event) => {
      const inputValue = parseFloat(event.target.value, 10);
      if (!isNaN(inputValue)) {
        const cur1 = ratesProcessed.value[selectedValue1.value.currency].currency;
        const cur2 = ratesProcessed.value[selectedValue2.value.currency].currency;
        const exchange = event.target.value * rates[getString(cur2, cur1)];
        selectedValue2.value.value = inputValue;
        selectedValue1.value.value = exchange.toFixed(2);
      }
    }

    const onSelect1 = (event) => {
      const value = event.target.value;
      const selected = ratesProcessed.value[value].currency;
  
      if (selectedValue2.value.currency === value) {
        const v = parseFloat(value, 10) + 1 > 2 ? 0 : parseFloat(value, 10) + 1;
        const cur2 = ratesProcessed.value[v].currency;
        const rate = rates[getString(selected, cur2)];
        selectedValue2.value.currency = String(v);
        selectedValue2.value.value = parseFloat(selectedValue1.value.value * rate).toFixed(2);
      } else {
        const cur1 = ratesProcessed.value[selectedValue2.value.currency].currency;
        const rate = rates[getString(cur1, selected)];
        selectedValue1.value.currency = String(value);
        selectedValue1.value.value = parseFloat(selectedValue2.value.value * rate).toFixed(2);
      }
    }

    const onSelect2 = (event) => {
      const value = event.target.value;
      const selected = ratesProcessed.value[value].currency;

      if (selectedValue1.value.currency === value) {
        const v = parseFloat(value, 10) + 1 > 2 ? 0 : parseFloat(value, 10) + 1;
        const cur2 = ratesProcessed.value[v].currency;
        const rate = rates[getString(selected, cur2)];
        selectedValue1.value.currency = String(v);
        selectedValue1.value.value = parseFloat(selectedValue2.value.value * rate).toFixed(2);
      } else {
        const cur1 = ratesProcessed.value[selectedValue1.value.currency].currency;
        const rate = rates[getString(cur1, selected)];
        selectedValue2.value.currency = String(value);
        selectedValue2.value.value = parseFloat(selectedValue1.value.value * rate).toFixed(2);
      }
    }

    return {
      ratesProcessed,
      selectedValue1,
      selectedValue2,
      inputValue1,
      inputValue2,
      onSelect1,
      onSelect2
    }
  }
}
</script>
<style>
.rates{
  line-height: 0.5;
  text-align: right;
  text-overflow: clip;
}
.inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>