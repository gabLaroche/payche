<template>
	<calculator />
</template>

<script>
import Calculator from "./Calculator/Calculator.vue";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
	name: 'Home',
	components: {
		Calculator,
	},
	computed: {
		...mapState({
			taxRatesData: state => state.taxRatesData,
			salaryRates: state => state.salaryRates,
			hours: state => state.hours
		}),
	},
	watch: {
		hours() {
			this.setSalaryRatesAction();
		}
	},
	methods: {
		...mapActions([
			'setSalaryRatesAction',
		]),
		...mapMutations([
			'setRate',
			'setProvince'
		]),
	},
	mounted() {
		this.setSalaryRatesAction();
		this.setRate(this.salaryRates[0]);
		this.setProvince(this.taxRatesData.provincial[0]);
	}
}
</script>