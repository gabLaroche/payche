<template>
	<div>
		<calculator-input
			label="Gross Income"
			type="income"
		/>

		<calculator-input
			label="Province"
			type="province"
		/>

		<calculator-input
			label="Per"
			type="rate"
		/>

		<calculator-input
			label="Hours per week"
			type="hours"
		/>

		<button
			:disabled="isDisabled"
			@click="calculate"
		>
			Calculate
		</button>
	</div>
</template>

<script>
import CalculatorInput from "../CalculatorInput/CalculatorInput.vue";
import {mapState} from "vuex";
export default {
	name: "Calculator",
	components: {CalculatorInput},
	computed: {
		...mapState({
			income: state => state.calculator.income,
			province: state => state.calculator.province,
			rate: state => state.calculator.rate,
			hours: state => state.calculator.hours,
			taxRates: state => state.calculator.taxRatesData,
			salaryRates: state => state.calculator.salaryRates,
		}),
		isDisabled() {
			return !this.income || !this.hours
		},
	},
	methods: {
		parseJson(json) {
			const str = JSON.stringify(json);
			return JSON.parse(str);
		},

		findRate(brackets) {
			const lowestAmounts = brackets.map(bracket => bracket.lowest_amount)
			const lowestAmount = lowestAmounts.reduce((closest, current) => {
				return (Math.abs(this.income - current) < Math.abs(this.income - closest) ? current : closest);
			}, Infinity);
			return brackets.find(bracket => bracket.lowest_amount === lowestAmount).percentage
		},

		calculate() {
			if (this.isDisabled) {
				return;
			}

			const federalRate = this.findRate(this.parseJson(this.taxRates.federal.brackets))
			const provincialRate = this.findRate(this.parseJson(this.province.brackets))
			const marginalRate = federalRate + provincialRate;

			console.log(federalRate, provincialRate);
			console.log(marginalRate * 100);
			console.log((marginalRate * 100).toFixed(1));
			console.log(this.income * marginalRate);
		}
	}
}
</script>

<style scoped>

</style>