// Single Responsibility: EMI math only — pure functions, no React, no UI
// Liskov Substitution: calculateEMI works for both cost and no-cost EMI via same interface

const NO_COST_PROCESSING_FEE_RATE = 0.02; // 2% hidden processing fee

/**
 * Calculate monthly EMI for a given principal, rate and tenure.
 * @param {number} principal  - Loan amount in ₹
 * @param {number} annualRate - Annual interest rate (e.g. 14 for 14%)
 * @param {number} months     - Tenure in months
 * @returns {number} Monthly EMI amount
 */
export function calculateEMI(principal, annualRate, months) {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / (12 * 100);
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

/**
 * Calculate no-cost EMI — simple division with hidden processing fee.
 * @param {number} principal - Product price in ₹
 * @param {number} months    - Tenure in months
 * @returns {{ emi: number, processingFee: number, totalPayable: number }}
 */
export function calculateNoCostEMI(principal, months) {
  const emi           = principal / months;
  const processingFee = principal * NO_COST_PROCESSING_FEE_RATE;
  const totalPayable  = principal + processingFee;
  return { emi, processingFee, totalPayable };
}

/**
 * Full EMI summary for display.
 * @param {number} principal  - Product price in ₹
 * @param {number} annualRate - Annual interest rate %
 * @param {number} months     - Tenure in months
 * @param {boolean} isNoCost  - Whether this is a no-cost EMI
 * @returns {{ emi, totalInterest, processingFee, totalPayable, extraVsCash }}
 */
export function getEMISummary(principal, annualRate, months, isNoCost) {
  if (isNoCost) {
    const { emi, processingFee, totalPayable } = calculateNoCostEMI(principal, months);
    return {
      emi,
      totalInterest: 0,
      processingFee,
      totalPayable,
      extraVsCash: processingFee,
    };
  }
  const emi          = calculateEMI(principal, annualRate, months);
  const totalPayable = emi * months;
  const totalInterest = totalPayable - principal;
  return {
    emi,
    totalInterest,
    processingFee: 0,
    totalPayable,
    extraVsCash: totalInterest,
  };
}

/**
 * Compare EMI across all given tenures.
 * @param {number} principal  - Product price in ₹
 * @param {number} annualRate - Annual interest rate %
 * @param {number[]} tenures  - Array of month values to compare
 * @param {boolean} isNoCost  - No-cost EMI mode
 * @returns {Array<{ months, emi, totalPayable, extraVsCash }>}
 */
export function compareAllTenures(principal, annualRate, tenures, isNoCost) {
  return tenures.map((months) => {
    const summary = getEMISummary(principal, annualRate, months, isNoCost);
    return { months, ...summary };
  });
}
