// app/page.tsx
import React from 'react';
import { MortgageCalculator } from './components/MortgageCalculator'; // Fix: Changed named import to specific import
// pages/_app.tsx or pages/_app.js if you're not using TypeScript
import './globals.css';

export default function HomePage() {
  return (
    <div>
      {/* Render the MortgageCalculator component */}
      <MortgageCalculator />
    </div>
  );
}