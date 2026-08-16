# DECA FinSim & Financial Literacy Terminal Architecture

## Directory File Tree Structure

```text
/deca-finsim-platform/
│
├── schema.sql                         # PostgreSQL Relational Database Schema (Users, Investments, Ledger, Macro, DECA)
├── ARCHITECTURE.md                    # Full Architectural Specification & Engine Mechanics
│
├── backend/                           # Python (FastAPI) Web Backend & Engine Logic
│   ├── app/
│   │   ├── main.py                    # FastAPI Web Application Entrypoint & CORS configuration
│   │   ├── config.py                  # Environment variable configuration (PostgreSQL, Redis)
│   │   ├── database.py                # SQLAlchemy ORM Session & PostgreSQL Connection Pool
│   │   ├── redis_cache.py             # Redis session state cache for high-frequency tick simulation
│   │   │
│   │   ├── engines/                   # Simulation Engine Core Logic
│   │   │   ├── macro_engine.py        # Macroeconomic shock events, inflation cycles, Fed Funds Rate
│   │   │   ├── market_simulator.py    # Discount rate models, cap rate compression/expansion, interest spike shocks
│   │   │   └── portfolio_ledger.py    # Double-entry ledger calculation engine (Debits/Credits/DSCR/NOI/DCF/IRR)
│   │   │
│   │   ├── models/                    # SQLAlchemy Database Models
│   │   │   ├── user.py                # User state & portfolio valuation metrics
│   │   │   ├── investment.py          # Real Estate & Equity position models
│   │   │   ├── ledger.py              # Double-entry transaction journal entry records
│   │   │   └── deca.py                # DECA cluster exam questions, roleplays, report rubrics
│   │   │
│   │   └── routers/                   # REST API Endpoints
│   │       ├── simulation.py          # /api/v1/simulation/tick, /api/v1/simulation/macro
│   │       ├── real_estate.py         # /api/v1/real-estate/analyze, /api/v1/real-estate/buy, /refinance
│   │       ├── corporate_finance.py   # /api/v1/corporate/dcf, /api/v1/corporate/statements
│   │       └── deca_arena.py          # /api/v1/deca/exam, /api/v1/deca/roleplay, /api/v1/deca/rubric
│   │
│   ├── requirements.txt               # Python Dependencies (fastapi, uvicorn, sqlalchemy, psycopg2-binary, numpy, pandas, redis)
│   └── Dockerfile                     # Docker container build script for FastAPI app
│
└── frontend/                          # React / Next.js Desktop Web Application
    ├── src/
    │   ├── App.tsx                    # Main App Shell & Master Navigation Layout
    │   ├── index.css                  # Tailwind CSS Terminal & Bento Grid Styling Variables
    │   │
    │   ├── store/                     # Zustand Desktop State Management
    │   │   └── simulationStore.ts     # Synchronized web session portfolio, ledger feed, macro state, DECA timers
    │   │
    │   ├── types/                     # TypeScript Interface Definitions
    │   │   └── financial.ts           # Double-entry ledger types, Real Estate deal metrics, DCF models, DECA PIs
    │   │
    │   ├── utils/                     # Mathematical Financial Engines (Client-Side & Fallback)
    │   │   ├── realEstateMath.ts      # NOI, DSCR, LTV, Unlevered/Levered COCR, Mortgage Amortization
    │   │   ├── corporateFinanceMath.ts# FCF, DCF Valuation, WACC, Debt-to-Equity, Net Debt/EBITDA
    │   │   └── portfolioMath.ts       # NPV, IRR, Sharpe Ratio, Alpha, Beta, Equity Multiples
    │   │
    │   ├── components/                # Bento Grid Fintech UI Modules
    │   │   ├── common/
    │   │   │   ├── Header.tsx         # Bloomberg Terminal Header (Net Worth, Settled Cash, Tick Counter, Live Feed)
    │   │   │   ├── Navigation.tsx     # Terminal Top Navigation & Module Switcher Tabs
    │   │   │   └── BentoCard.tsx      # Terminal Card Frame with high-density borders and header tags
    │   │   │
    │   │   ├── bento/                 # Main Dashboard Bento Grid (Bento Grid Theme)
    │   │   │   ├── MacroEngineOutput.tsx # Inflation Index, Fed Funds Rate, Market Shock Alert
    │   │   │   ├── EquityPortfolioChart.tsx # Recharts Stock Equity & Index performance visualization
    │   │   │   ├── DecaCaseStudyWidget.tsx  # Countdown Timer, Performance Indicators (PIs), Pitch prep button
    │   │   │   ├── RealEstateQuickCard.tsx  # Midtown Commerce Plaza NOI, DSCR 1.42x, Cap Rate 6.2%, Refi/Sell
    │   │   │   └── DoubleEntryLedgerFeed.tsx # Real-time PostgreSQL double-entry transaction history
    │   │   │
    │   │   ├── modules/
    │   │   │   ├── RealEstateModule.tsx # Deal analysis page (NOI, DSCR, LTV, Fixed vs Floating, Rate Spike Stress Test)
    │   │   │   ├── CorporateFinanceModule.tsx # 3-Statement Financial Modeling, Capital Allocation, DCF Model, CapEx Boom/Bust
    │   │   │   ├── PortfolioDashboardModule.tsx # NPV, IRR, Sharpe Ratio, Portfolio Rebalancing, Asset Liquidator
    │   │   │   │
    │   │   │   └── deca/
    │   │   │       ├── DecaExamsModule.tsx    # 100-Question Timed Cluster Exams, Scoring & DECA Standard Feedback
    │   │   │       ├── DecaRoleplayModule.tsx # 10-30m Countdown Timer, Raw Data Case Studies, Note-Taking Matrix, Pitch Script
    │   │   │       ├── DecaWrittenReportsModule.tsx # 5/11/30 Page Report Formatter, Visual Aid Deck Builder, Q&A Defense Engine
    │   │   │       └── DecaRubricDashboard.tsx # Student Performance View & Teacher/Judge Official Rubric Assessment
    │   │   │
    │   │   └── modal/
    │   │       ├── RealEstateDealModal.tsx    # Detailed property acquisition & loan calculator modal
    │   │       ├── SqlSchemaViewerModal.tsx   # Interactive viewer for schema.sql and SQL queries
    │   │       └── MacroSimulationModal.tsx   # Manual macro event generator & shock tester
```

## Key Architectural Principles
1. **Double-Entry Ledger Integrity**: Every purchase, yield payment, debt amortization, tax, or sale registers both a Debit (DR) and a Credit (CR) account entry.
2. **Terminal Bento Grid UI**: Styled with high contrast `#09090b` canvas, `#18181b` cards, `#27272a` hairline borders, `#eab308` gold highlights, and dense `#10b981` / `#f43f5e` financial indicators.
3. **Multi-Year Timeline Simulation Loop**: Allows advancing simulation ticks/years to evaluate short-term vs long-term investment cash flows, debt service risks, and DECA performance indicators.
