<template>
	<calculator />
<!--	<pie-chart/>-->
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import { PieChart } from 'vue-chart-3';
import Calculator from "./Calculator/Calculator.vue";

export default {
	name: 'Home',
	components: {
		Calculator,
		PieChart,
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