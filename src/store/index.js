import Vuex from 'vuex'
import calculatorModule from "./modules/calculator";

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		calculator: calculatorModule
	}
})

export default store