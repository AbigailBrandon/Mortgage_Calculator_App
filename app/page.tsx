'use client';

import React, { useReducer } from 'react';

// Define types for the state and action
type State = {
  borrowAmount: string;
  annualRate: string;
  periodYears: string;
  paymentPerMonth: string;
  alertMessage: string;
};

type Action =
  | { type: 'setField'; field: keyof State; value: string }
  | { type: 'calculatePayment' }
  | { type: 'clearAlert' };

const initialState: State = {
  borrowAmount: '',
  annualRate: '',
  periodYears: '',
  paymentPerMonth: '',
  alertMessage: ''
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setField':
      return { ...state, [action.field]: action.value };
    case 'calculatePayment':
      const loanAmount = parseFloat(state.borrowAmount);
      const monthlyRate = parseFloat(state.annualRate) / 100 / 12;
      const totalPeriods = parseFloat(state.periodYears) * 12;

      if (loanAmount <= 0 || monthlyRate <= 0 || totalPeriods <= 0) {
        return { ...state, alertMessage: 'All fields must contain positive numbers.' };
      }

      const calculatedPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPeriods));
      return { ...state, paymentPerMonth: calculatedPayment.toFixed(2), alertMessage: '' };
    case 'clearAlert':
      return { ...state, alertMessage: '' };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCalculateMonthlyPayment = () => {
    dispatch({ type: 'calculatePayment' });
  };

  // Explicitly declare 'field' as a keyof State
  const handleChange = (field: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setField', field, value: e.target.value });
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Mortgage Payment Calculator</h1>
      <div className="space-y-4 max-w-md w-full">
        <input
          type="number"
          value={state.borrowAmount}
          onChange={handleChange('borrowAmount')}
          placeholder="Loan Amount ($)"
          className="input w-full rounded-lg p-3 border-0 shadow-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
        />
        <input
          type="number"
          value={state.annualRate}
          onChange={handleChange('annualRate')}
          placeholder="Annual Interest Rate (%)"
          className="input w-full rounded-lg p-3 border-0 shadow-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
        />
        <input
          type="number"
          value={state.periodYears}
          onChange={handleChange('periodYears')}
          placeholder="Term (in years)"
          className="input w-full rounded-lg p-3 border-0 shadow-lg focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
        />
        <button 
          onClick={handleCalculateMonthlyPayment} 
          className="btn w-full bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          Calculate Monthly Payments
        </button>
      </div>
      {state.alertMessage && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-lg shadow-lg">
          <p>{state.alertMessage}</p>
        </div>
      )}
      {state.paymentPerMonth && !state.alertMessage && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
          <p>Monthly Installment: ${state.paymentPerMonth}</p>
        </div>
      )}
    </main>
  );
}
