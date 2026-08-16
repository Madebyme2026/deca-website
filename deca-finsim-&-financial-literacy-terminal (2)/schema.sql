-- ====================================================================
-- FINANCIAL LITERACY & DECA COMPETITION SIMULATION DATABASE SCHEMA
-- Relational Database Schema: PostgreSQL 15+
-- Strictly implements double-entry ledger bookkeeping, portfolio tracking,
-- market history ticks, and DECA competition assessments.
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- 1. USER TABLE
-- Tracks user browser account ID, current website cash balance,
-- total portfolio value, current game turn/tick, and simulation metadata.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Simulation State
    cash_balance NUMERIC(18, 4) NOT NULL DEFAULT 500000.0000 CHECK (cash_balance >= 0),
    total_portfolio_value NUMERIC(18, 4) NOT NULL DEFAULT 500000.0000,
    current_year INT NOT NULL DEFAULT 1 CHECK (current_year >= 1),
    current_quarter INT NOT NULL DEFAULT 1 CHECK (current_quarter BETWEEN 1 AND 4),
    current_tick INT NOT NULL DEFAULT 1 CHECK (current_tick >= 1),
    
    -- Performance Metrics
    sharpe_ratio NUMERIC(6, 4) DEFAULT 1.5000,
    alpha_score NUMERIC(6, 4) DEFAULT 0.0500,
    beta_score NUMERIC(6, 4) DEFAULT 0.9500,
    deca_exam_score NUMERIC(5, 2) DEFAULT 0.00,
    deca_roleplay_score NUMERIC(5, 2) DEFAULT 0.00
);

-- Index for fast user queries
CREATE INDEX idx_users_username ON users(username);

-- --------------------------------------------------------------------
-- 2. INVESTMENTS TABLE
-- Tracks active real estate assets, stock equity positions, crypto/bonds,
-- and exact entry pricing active in the user's web portfolio.
-- --------------------------------------------------------------------
CREATE TYPE asset_class_enum AS ENUM ('REAL_ESTATE', 'EQUITY', 'BOND', 'CRYPTO', 'CASH_EQUIVALENT');
CREATE TYPE rate_type_enum AS ENUM ('FIXED', 'FLOATING');

CREATE TABLE IF NOT EXISTS investments (
    investment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    asset_class asset_class_enum NOT NULL,
    asset_name VARCHAR(150) NOT NULL,
    ticker_symbol VARCHAR(20),
    
    -- Quantity & Pricing
    quantity NUMERIC(18, 6) NOT NULL DEFAULT 1.0,
    entry_price NUMERIC(18, 4) NOT NULL,
    current_price NUMERIC(18, 4) NOT NULL,
    market_value NUMERIC(18, 4) GENERATED ALWAYS AS (quantity * current_price) STORED,
    
    -- Real Estate & Financing Specific Metrics
    cap_rate NUMERIC(6, 4) DEFAULT 0.0000, -- e.g. 0.0650 for 6.5%
    noi_annual NUMERIC(18, 4) DEFAULT 0.0000, -- Net Operating Income
    ltv_ratio NUMERIC(5, 4) DEFAULT 0.0000, -- Loan to Value e.g. 0.7500
    mortgage_principal NUMERIC(18, 4) DEFAULT 0.0000,
    interest_rate NUMERIC(6, 4) DEFAULT 0.0500, -- 5.0%
    interest_type rate_type_enum DEFAULT 'FIXED',
    annual_debt_service NUMERIC(18, 4) DEFAULT 0.0000,
    dscr NUMERIC(6, 4) DEFAULT 1.0000, -- Debt Service Coverage Ratio
    
    -- Corporate Equity Specific Metrics
    dividends_yield NUMERIC(6, 4) DEFAULT 0.0000,
    pe_ratio NUMERIC(8, 2) DEFAULT 0.00,
    
    acquisition_tick INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_investments_user ON investments(user_id);
CREATE INDEX idx_investments_asset_class ON investments(asset_class);

-- --------------------------------------------------------------------
-- 3. DOUBLE-ENTRY FINANCIAL LEDGER TABLE (HISTORY & TRANSACTIONS)
-- Strictly records debits and credits for all simulation transactions,
-- creating an auditable financial history across multi-year timeline turns.
-- --------------------------------------------------------------------
CREATE TYPE ledger_entry_type AS ENUM (
    'ASSET_PURCHASE',
    'ASSET_SALE',
    'DIVIDEND_PAYOUT',
    'MORTGAGE_AMORTIZATION',
    'INTEREST_SPIKE_EXPENSE',
    'CAPEX_REINVESTMENT',
    'PROPERTY_TAX',
    'REBALANCING_TRADE',
    'REFINANCE_DEBT'
);

CREATE TABLE IF NOT EXISTS ledger_entries (
    entry_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    turn_number INT NOT NULL,
    year INT NOT NULL,
    quarter INT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    entry_type ledger_entry_type NOT NULL,
    account_debited VARCHAR(100) NOT NULL,  -- e.g. 'CASH_ACCOUNT', 'REAL_ESTATE_ASSETS'
    account_credited VARCHAR(100) NOT NULL, -- e.g. 'EQUITY_POSITIONS', 'MORTGAGE_LIABILITY'
    debit_amount NUMERIC(18, 4) NOT NULL CHECK (debit_amount >= 0),
    credit_amount NUMERIC(18, 4) NOT NULL CHECK (credit_amount >= 0),
    
    description TEXT NOT NULL,
    macro_state_snapshot JSONB -- Stores snapshot of inflation, Fed funds rate, market sentiment at time of transaction
);

-- Constraint ensuring balanced double-entry
ALTER TABLE ledger_entries ADD CONSTRAINT chk_ledger_balanced CHECK (debit_amount = credit_amount);

CREATE INDEX idx_ledger_user ON ledger_entries(user_id);
CREATE INDEX idx_ledger_turn ON ledger_entries(turn_number);

-- --------------------------------------------------------------------
-- 4. MACROECONOMIC HISTORY TICKS TABLE
-- Time-series log of macro engine state per tick for market charts
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS macro_ticks (
    tick_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    year INT NOT NULL,
    quarter INT NOT NULL,
    tick INT NOT NULL,
    
    fed_funds_rate NUMERIC(6, 4) NOT NULL, -- e.g. 0.0525
    inflation_rate NUMERIC(6, 4) NOT NULL,  -- e.g. 0.0312
    gdp_growth_rate NUMERIC(6, 4) NOT NULL, -- e.g. 0.0210
    sp500_index_value NUMERIC(12, 2) NOT NULL,
    market_cap_rate_avg NUMERIC(6, 4) NOT NULL,
    event_active VARCHAR(150),
    event_description TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_macro_ticks_user_tick ON macro_ticks(user_id, tick);

-- --------------------------------------------------------------------
-- 5. DECA CLUSTER EXAMS & CASE STUDIES TABLE
-- Stores DECA exam submissions, performance indicator rubrics, and case studies.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS deca_cluster_exams (
    exam_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    cluster_category VARCHAR(100) NOT NULL, -- e.g. 'Financial Analysis', 'Business Administration'
    score_percentage NUMERIC(5, 2) NOT NULL,
    total_questions INT NOT NULL,
    correct_count INT NOT NULL,
    time_spent_seconds INT NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS deca_roleplay_submissions (
    submission_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    case_study_title VARCHAR(200) NOT NULL,
    client_problem_text TEXT NOT NULL,
    system_constraints_text TEXT NOT NULL,
    pis_addressed JSONB NOT NULL, -- List of Performance Indicators mapped
    pitch_script_text TEXT NOT NULL,
    judge_score NUMERIC(5, 2) DEFAULT 0.00,
    judge_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- SEED DEMO DATA
-- ====================================================================
INSERT INTO users (user_id, username, email, cash_balance, total_portfolio_value, current_year, current_quarter, current_tick, sharpe_ratio, alpha_score, beta_score)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'deca_trader_01', 'trader@deca.org', 412050.0000, 2482901.4400, 3, 2, 42, 1.8400, 0.1200, 0.9200)
ON CONFLICT (username) DO NOTHING;

INSERT INTO investments (investment_id, user_id, asset_class, asset_name, ticker_symbol, quantity, entry_price, current_price, cap_rate, noi_annual, ltv_ratio, mortgage_principal, interest_rate, interest_type, annual_debt_service, dscr, acquisition_tick)
VALUES
    ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'REAL_ESTATE', 'Midtown Commerce Plaza', 'RE-MIDTOWN', 1.0, 1850000.0000, 2010000.0000, 0.0620, 124500.0000, 0.6500, 1202500.0000, 0.0525, 'FIXED', 87600.0000, 1.4212, 10),
    ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'EQUITY', 'S&P 500 ETF Trust', 'SPY', 850.0, 420.5000, 512.2000, 0.0000, 0.0000, 0.0000, 0.0000, 0.0000, 'FIXED', 0.0000, 0.0000, 1)
ON CONFLICT DO NOTHING;

INSERT INTO ledger_entries (user_id, turn_number, year, quarter, entry_type, account_debited, account_credited, debit_amount, credit_amount, description)
VALUES
    ('11111111-1111-1111-1111-111111111111', 42, 3, 2, 'REBALANCING_TRADE', 'CASH_ACCOUNT', 'EQUITY_POSITIONS', 48400.0000, 48400.0000, 'REBAL: LIQUIDATED 200 TSLA @ $242.00'),
    ('11111111-1111-1111-1111-111111111111', 41, 3, 2, 'DIVIDEND_PAYOUT', 'CASH_ACCOUNT', 'DIVIDEND_INCOME', 412.0000, 412.0000, 'MSFT DISTRIBUTED $0.68/SHARE DIVIDEND'),
    ('11111111-1111-1111-1111-111111111111', 40, 3, 2, 'MORTGAGE_AMORTIZATION', 'MORTGAGE_LIABILITY', 'CASH_ACCOUNT', 7300.0000, 7300.0000, 'MONTHLY AMORTIZATION APPLIED TO MIDTOWN COMMERCE MORTGAGE'),
    ('11111111-1111-1111-1111-111111111111', 39, 3, 1, 'PROPERTY_TAX', 'TAX_EXPENSE_ACCOUNT', 'CASH_ACCOUNT', 12400.0000, 12400.0000, 'PROPERTY TAX ASSESSMENT: MIDTOWN COMMERCE PLAZA')
ON CONFLICT DO NOTHING;
