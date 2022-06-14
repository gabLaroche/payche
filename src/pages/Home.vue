<template>
	<calculator />
<!--	<pie-chart/>-->
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import { PieChart } from 'vue-chart-3';
import Calculator from "../components/Calculator/Calculator.vue";

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
			this.setSalaryRates();
		}
	},
	methods: {
		...mapActions([
			'calculator/setSalaryRatesAction',
		]),
		...mapMutations([
			'calculator/setRate',
			'calculator/setProvince',
			'calculator/setSalaryRates'
		]),
	},
	async mounted() {
		await this.setSalaryRates();
		this.setRate(this.salaryRates[0]);
		this.setProvince(this.taxRatesData.provincial[0]);
	}
}
</script>