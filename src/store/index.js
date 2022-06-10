import Vuex from 'vuex'
import taxRatesData from "../data/2022/tax-rates.json"

const store = new Vuex.Store({
	state: {
		hours: 40,
		taxRatesData: taxRatesData,
		salaryRates: [],
		province: null,
		rate: null,
		income: null,
		calculatedInformation: null,
	},
	mutations: {
		setSalaryRates (state) {
			state.salaryRates = [
				{
					label: 'Annual',
					value: 1
				},
				{
					label: 'Biweekly',
					value: 26,
				},
				{
					label: 'Weekly',
					value: 52,
				},
				{
					label: 'Daily',
					value: 260
				},
				{
					label: 'Hourly',
					value: (state.hours * 52),
				},
			]
		},
		setHours (state, hours) {
			state.hours = hours;
		},
		setProvince (state, province) {
			const str = JSON.stringify(province)
			state.province = JSON.parse(str);
		},
		setRate (state, rate) {
			const str = JSON.stringify(rate)
			state.rate = JSON.parse(str);
		},
		setIncome (state, income) {
			state.income = income;
		},
	},
	actions: {
		setSalaryRatesAction ({commit}){
			commit('setSalaryRates')
		}
	}
})

export default store