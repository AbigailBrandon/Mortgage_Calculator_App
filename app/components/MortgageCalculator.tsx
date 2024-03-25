// app/components/MortgageCalculator.tsx
'use client';
import React, { useState } from 'react';

export const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [error, setError] = useState('');

  const calculateMonthlyPayment = () => {
    setError(''); // Clear any previous errors

    // Parse input values
    const principalAmount = parseFloat(principal);
    const annualInterestRate = parseFloat(interestRate);
    const loanTermYears = parseFloat(loanTerm);

    // Validate input values
    if (isNaN(principalAmount) || isNaN(annualInterestRate) || isNaN(loanTermYears) || principalAmount <= 0 || annualInterestRate <= 0 || loanTermYears <= 0) {
      setError('Please enter positive values for all fields.');
      return;
    }

    // Convert annual interest rate to monthly and loan term to months
    const totalLoanMonths = loanTermYears * 12;
    const interestPerMonth = annualInterestRate / 100 / 12;

    // Monthly mortgage payment calculation
    const monthlyPaymentCalculation =
      (principalAmount * 
       interestPerMonth * 
       Math.pow(1 + interestPerMonth, totalLoanMonths)) /
      (Math.pow(1 + interestPerMonth, totalLoanMonths) - 1); 

    // Update the monthly payment state with the result
    setMonthlyPayment(monthlyPaymentCalculation.toFixed(2));
  
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mortgage Calculator</h1>
      {error && <div className="text-red-500">{error}</div>}

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          id="principal"
          name="principal"
          className="w-full p-2 border border-gray-300 rounded"
          type="number"
          placeholder="Principal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <input
          id="interestRate"
          name="interestRate"
          className="w-full p-2 border border-gray-300 rounded"
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <input
          id="loanTerm"
          name="loanTerm"
          className="w-full p-2 border border-gray-300 rounded"
          type="number"
          placeholder="Loan Term (years)"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="button" // Changed to submit to be explicit
          onClick={calculateMonthlyPayment}>Calculate
        </button>
      </form>

        <div className="mt-4">
          <h2 className="text-lg font-bold">Monthly Payment: ${monthlyPayment} </h2>
        </div>
      
    </div>

  );
};