/* Routes for tax calculation */
const uuidv1 = require('uuid/v1');

module.exports = function ({ app, localStorage, verifyToken }) {
	app.get('/api/getYearWiseTaxSlabDetails', verifyToken, (_req, res) => {
		let taxSlabDetails = localStorage.getItem("taxSlabDetails");
		res.json(JSON.parse(taxSlabDetails));
	});

	app.get('/api/getTaxCalculations', verifyToken, (req, res) => {
		let key = "taxcalculations_" + req.id;
		let result = [];
		let taxCalculations = localStorage.getItem(key);
		if (taxCalculations) {
			result = JSON.parse(taxCalculations);
		}
		res.json(result);
	});

	app.post('/api/saveTaxCalculation', verifyToken, (req, res) => {
		// get user id
		let uid = uuidv1();
		let key = "taxcalculations_" + req.id;
		let taxCalculationDetails = { ...req.body, id: uid };
		let itemsToPush = [taxCalculationDetails];

		let existingTaxCalculationDetails = localStorage.getItem(key);
		if (existingTaxCalculationDetails) {
			itemsToPush = [...JSON.parse(existingTaxCalculationDetails), taxCalculationDetails]
		}
		localStorage.setItem(key, JSON.stringify(itemsToPush));
		res.json(taxCalculationDetails);
	});
}