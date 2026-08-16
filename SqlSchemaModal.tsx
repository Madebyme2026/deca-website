import React, { useState } from 'react';
import { Database, Copy, Check, Code } from 'lucide-react';

export const SqlSchemaModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSqlTab, setActiveSqlTab] = useState<'SCHEMA' | 'QUERIES'>('SCHEMA');

  const schemaContent = `-- RELATIONAL DATABASE SCHEMA (POSTGRESQL STRUCTURE)
-- 1. USER TABLE
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    cash_balance NUMERIC(18, 4) NOT NULL DEFAULT 500000.0000,
    total_portfolio_value NUMERIC(18, 4) NOT NULL DEFAULT 500000.0000,
    current_year INT NOT NULL DEFAULT 1,
    current_quarter INT NOT NULL DEFAULT 1,
    current_tick INT NOT NULL DEFAULT 1,
    sharpe_ratio NUMERIC(6, 4) DEFAULT 1.5000,
    alpha_score NUMERIC(6, 4) DEFAULT 0.0500,
    beta_score NUMERIC(6, 4) DEFAULT 0.9500
);

-- 2. INVESTMENTS TABLE
CREATE TABLE IF NOT EXISTS investments (
    investment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    asset_class VARCHAR(50) NOT NULL,
    asset_name VARCHAR(150) NOT NULL,
    ticker_symbol VARCHAR(20),
    quantity NUMERIC(18, 6) NOT NULL DEFAULT 1.0,
    entry_price NUMERIC(18, 4) NOT NULL,
    current_price NUMERIC(18, 4) NOT NULL,
    cap_rate NUMERIC(6, 4) DEFAULT 0.0000,
    noi_annual NUMERIC(18, 4) DEFAULT 0.0000,
    ltv_ratio NUMERIC(5, 4) DEFAULT 0.0000,
    mortgage_principal NUMERIC(18, 4) DEFAULT 0.0000,
    interest_rate NUMERIC(6, 4) DEFAULT 0.0500,
    interest_type VARCHAR(20) DEFAULT 'FIXED',
    annual_debt_service NUMERIC(18, 4) DEFAULT 0.0000,
    dscr NUMERIC(6, 4) DEFAULT 1.0000
);

-- 3. DOUBLE-ENTRY LEDGER TABLE (HISTORY & TRANSACTIONS)
CREATE TABLE IF NOT EXISTS ledger_entries (
    entry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    turn_number INT NOT NULL,
    year INT NOT NULL,
    quarter INT NOT NULL,
    entry_type VARCHAR(50) NOT NULL,
    account_debited VARCHAR(100) NOT NULL,
    account_credited VARCHAR(100) NOT NULL,
    debit_amount NUMERIC(18, 4) NOT NULL,
    credit_amount NUMERIC(18, 4) NOT NULL,
    description TEXT NOT NULL
);`;

  const sampleQueries = `-- DOUBLE-ENTRY LEDGER AUDIT QUERIES

-- Query 1: Verify total debits match total credits per user session
SELECT 
    user_id,
    SUM(debit_amount) AS total_debits,
    SUM(credit_amount) AS total_credits,
    (SUM(debit_amount) - SUM(credit_amount)) AS balance_delta
FROM ledger_entries
GROUP BY user_id;

-- Query 2: Retrieve real estate properties where DSCR < 1.25x (Liquidity Stress Test)
SELECT 
    asset_name,
    noi_annual,
    annual_debt_service,
    dscr,
    interest_type,
    interest_rate
FROM investments
WHERE asset_class = 'REAL_ESTATE' AND dscr < 1.25;

-- Query 3: Double-entry audit trail for a given tick
SELECT 
    turn_number,
    account_debited,
    account_credited,
    debit_amount,
    description
FROM ledger_entries
WHERE turn_number = 42
ORDER BY timestamp DESC;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSqlTab === 'SCHEMA' ? schemaContent : sampleQueries);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 text-[#fafafa] font-mono">
      {/* Banner */}
      <div className="bg-[#18181b] border border-[#27272a] p-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/30">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white uppercase tracking-wider">
              PostgreSQL Relational Database Schema & Double-Entry Queries
            </h1>
            <p className="text-xs text-[#71717a]">
              Strict Relational Tables: Users, Investments, Ledger Entries (`schema.sql`)
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveSqlTab('SCHEMA')}
            className={`px-3 py-1.5 text-xs font-bold uppercase border cursor-pointer ${
              activeSqlTab === 'SCHEMA'
                ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
            }`}
          >
            `schema.sql` Definition
          </button>
          <button
            onClick={() => setActiveSqlTab('QUERIES')}
            className={`px-3 py-1.5 text-xs font-bold uppercase border cursor-pointer ${
              activeSqlTab === 'QUERIES'
                ? 'bg-[#eab308] text-[#09090b] border-[#eab308]'
                : 'bg-[#09090b] text-[#71717a] border-[#27272a]'
            }`}
          >
            Ledger Audit SQL Queries
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-[#27272a] hover:bg-[#3f3f46] text-white px-3 py-1.5 text-xs font-bold border border-[#27272a] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied SQL' : 'Copy SQL'}</span>
          </button>
        </div>
      </div>

      <div className="bg-[#09090b] border border-[#27272a] p-5 font-mono text-xs overflow-x-auto">
        <pre className="text-[#10b981] leading-relaxed">
          {activeSqlTab === 'SCHEMA' ? schemaContent : sampleQueries}
        </pre>
      </div>
    </div>
  );
};
