/*Database mock: Initialize database */

const LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./database/data');

/* Initialize the config */

/* Tax slab details */
let taxSlabDetails = {
	"2018" : {
		cessPercent: 1,
		cessLimit: 500000,
		investmentRelaxation: 100000, 
		ageLimit: -1,
		ageLimitRelaxation: -1,
		currency: "INR",
		slab: [
			{
				from: 0,
				to: 100000,
				percent: 0
			},
			{
				from: 100000,
				to: 500000,
				percent: 10
			},
			{
				from: 500000,
				to: 1000000,
				percent: 20
			},
			{
				from: 1000000,
				to: "INFINITY",
				percent: 30
			}
		]	
	},
	"2019" : {
		cessPercent: 2,
		cessLimit: 500000,
		investmentRelaxation: 150000, 
		ageLimit: 60,
		ageLimitRelaxation: 50000,
		currency: "INR",
		slab: [
			{
				from: 0,
				to: 100000,
				percent: 0
			},
			{
				from: 100000,
				to: 600000,
				percent: 10
			},
			{
				from: 600000,
				to: 1200000,
				percent: 20
			},
			{
				from: 1200000,
				to: "INFINITY",
				percent: 30
			}
		]	
	},
	"2020" : {
		cessPercent: 5,
		cessLimit: 500000,
		investmentRelaxation: 100000, 
		ageLimit: 60,
		ageLimitRelaxation: 75000,
		currency: "INR",
		slab: [
			{
				from: 0,
				to: 100000,
				percent: 0
			},
			{
				from: 100000,
				to: 1000000,
				percent: 15
			},
			{
				from: 1000000,
				to: "INFINITY",
				percent: 25
			}
		]	
	}
};
localStorage.setItem("taxSlabDetails", JSON.stringify(taxSlabDetails));

/* Save tax calculation, keys will be taxcalculations_userId */

/* Save user details, keys will be user_userId*/

module.exports = localStorage;