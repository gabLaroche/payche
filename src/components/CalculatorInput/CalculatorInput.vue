<template>
	<div>
		<label :for="type">
			{{ label }}
		</label>

		<input
			v-if="type === 'income' || type === 'hours'"
			:id="type"
			:value="type === 'hours' ? this.hours : null"
			@blur="setValue($event.target.value)"
		>

		<select
			v-else
			@change="setValue($event.target.value)"
		>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';

export default {
	name: "CalculatorInput",
	props: {
		label: {
			required: true,
			type: String,
			description: 'Label for the input'
		},
		type: {
			required: true,
			type: String,
			validator: value => [
				'income',
				'hours',
				'rate',
				'province',
			].indexOf(value) !== -1,
			description: 'type of input'
		},
	},
	computed: {
		...mapState({
			hours: state => state.hours,
			taxRates: state => state.taxRatesData,
			salaryRates: state => state.salaryRates,
			income: state => state.income,
			rate: state => state.rate,
			province: state => state.province,
		}),
		options() {
			if (this.type === 'income' || this.type === 'hours') {
				return null;
			}
			let options = [];

			if (this.type === 'rate') {
				options = this.salaryRates;
			} else {
				options = this.taxRates.provincial.map(rate => {
					return {
						label: rate.full_name,
						value: rate.abbreviation,
					}
				})
			}

			return options;
		}
	},
	methods: {
		...mapMutations([
			'setIncome',
			'setHours',
			'setRate',
			'setProvince'
		]),
		setValue($event) {
			switch (this.type) {
				case 'income':
					this.setIncome(parseInt($event));
				break;
				case 'hours':
					this.setHours(parseInt($event));
				break;
				case 'rate':
					console.log(this.salaryRates.find(rate => rate.value === parseInt($event, 10)))
					this.setRate(this.salaryRates.find(rate => rate.value === parseInt($event, 10)));
				break;
				case 'province':
					console.log(this.taxRates.provincial.find(province => province.abbreviation === $event))
					this.setProvince(this.taxRates.provincial.find(province => province.abbreviation === $event))
				break
			}
		}
	}
}
</script>

<style scoped>

</style>