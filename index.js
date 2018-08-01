"use strict";

const calculate = require("./capRate");

// Azure FunctionApp
module.exports = (context, propertyData) => {
    const propertyInfo = propertyData;
    if (!propertyInfo.pmi) propertyInfo.pmi = 0;
    if (!propertyInfo.vacancy) propertyInfo.vacancy = 0;
    if (!propertyInfo.management) propertyInfo.management = 0;

    if (!propertyInfo.price || !propertyInfo.taxes || !propertyInfo.insurance || !propertyInfo.income) {
        context.res.status = 400;
        context.res.body = {
            message: "Missing parameters",
            info: `${propertyInfo}`
        }
        context.done();
    }


    const expenses = calculate.annualExpenses(propertyInfo.taxes, propertyInfo.insurance, propertyInfo.pmi);
    const income = calculate.annualIncome(propertyInfo.income);
    const netOperatingIncome = calculate.netOperatingIncome(income, expenses);
    const NOIAfterExpenses = calculate.reducedNetOperatingIncome(netOperatingIncome, propertyInfo.vacancy, propertyInfo.management, propertyInfo.pmi);

    context.res.status = 200;
    context.res.body = {
        annualExpenses: expenses,
        annualIncome: income,
        netOperatingIncome: netOperatingIncome,
        NOIAfterReduction: NOIAfterExpenses,
        capRate: calculate.capRate(propertyInfo.price, NOIAfterExpenses)
    };
    context.done();
};