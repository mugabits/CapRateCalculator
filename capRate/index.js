"use strict";

function calculateIncome(rentalIncome) {
	if (Array.isArray(rentalIncome)) {
    	return 12 * rentalIncome.reduce(function(acc, val) { return acc + val; }, 0);
    } else if (typeof rentalIncome === 'number') {
		return 12 * rentalIncome;
    } else {
		return 0;
    }
}

function calculateExpenses(taxes, insurance, mortgageInsurance) {
    if (!mortgageInsurance) mortgageInsurance = 0;
    return 12 * (taxes + insurance + mortgageInsurance);
}

function calculateNetOperatingIncome(income, expenses){
	return income - expenses;
}

function calculateNOIAfterReduction(netOperatingIncome, vacancyRate, managementRate, ...rates) {
    if (vacancyRate > 1) vacancyRate /= 100;
    if (managementRate > 1) managementRate /= 100;
    const totalReduction = vacancyRate + managementRate;
    return totalReduction > 0 ? netOperatingIncome * totalReduction : netOperatingIncome;
}

function calculateCapRate(price, reducedNetOperatingIncome) {
    return reducedNetOperatingIncome/price;
}

module.exports = {
    annualIncome: calculateIncome,
    annualExpenses: calculateExpenses,
    netOperatingIncome: calculateNetOperatingIncome,
    reducedNetOperatingIncome: calculateNOIAfterReduction,
    capRate: calculateCapRate
}