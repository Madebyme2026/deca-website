import { DecaCaseStudy } from '../types/financial';

export const DECA_ROLEPLAY_SCENARIOS: DecaCaseStudy[] = [
  // ==========================================
  // 1. HOSPITALITY & TOURISM SECTOR (HLM / HTDM / RFSM / PHT)
  // ==========================================
  {
    id: 'cs-hosp-01',
    title: 'The Grand Azure Hotel: De-Escalating an Adversarial VIP Guest in the Main Lobby',
    category: 'Hospitality & Tourism / Hotel & Lodging Management (HLM)',
    timeLimitMinutes: 15,
    scenarioText: `You are acting as the Assistant Front Office Manager at The Grand Azure Hotel, a luxury 4-star downtown convention hotel. 

At 6:30 PM on a Friday during peak check-in rush with a crowded lobby, a high-ranking corporate executive and VIP loyalty member, Mr. Harrison (the judge), storms up to the front desk. His checked luggage was inadvertently placed on a secondary shuttle and has been delayed by 25 minutes. 

Mr. Harrison is furious, raising his voice, shouting profanities, filming the front desk staff on his smartphone, threatening to get the young front desk agent fired, and loudly demanding immediate complimentary penthouse presidential suite upgrades and $1,000 cash restitution in front of 30 other arriving guests. 

You must step in immediately, de-escalate the adversarial situation, protect your front desk staff from verbal abuse, isolate the conflict away from other patrons, and reach a fair, professional resolution upholding hospitality excellence and brand standards.`,
    clientProblem: 'Severe guest hostility, loud adversarial confrontation, and public disruption in the lobby threatening staff safety, guest comfort, and hotel reputation.',
    constraints: [
      'De-escalate the public disturbance by calmly transitioning the conversation to a private manager office.',
      'Front-line staff safety must be prioritized; staff cannot be disciplined without verified cause.',
      'Front Office Manager discretionary comp limit is $250 in food/beverage credit or spa services without GM approval.',
      'Presidential Penthouse Suites are 100% occupied for an international diplomatic delegation.',
    ],
    performanceIndicators: [
      { 
        code: 'CR:009', 
        description: 'Handle difficult, adversarial, or angry customers using professional de-escalation techniques.', 
        guidelines: 'Use a low, steady pitch, non-threatening open body language, empathetic validation ("I hear your urgency"), and isolate the conversation into a quiet private lounge.' 
      },
      { 
        code: 'EI:015', 
        description: 'Demonstrate emotional intelligence, active listening, and composure under extreme customer pressure.', 
        guidelines: 'Never argue or get defensive; separate the emotional outburst from the underlying operational problem (delayed luggage).' 
      },
      { 
        code: 'HT:008', 
        description: 'Apply hospitality service recovery protocols within organizational authority limits.', 
        guidelines: 'Provide immediate status tracking on luggage delivery, offer a complimentary dinner voucher ($150) in the rooftop restaurant while waiting, and award 20,000 loyalty points.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present a structured conflict resolution proposal that protects staff dignity and brand reputation.', 
        guidelines: 'Deliver a clear 3-step action plan: Immediate De-escalation & Luggage Expedite, VIP Compensation Package, and Post-Resolution Folio Follow-Up.' 
      },
    ],
  },
  {
    id: 'cs-hosp-02',
    title: 'Starlight Oceanfront Resort: Check-In Service Recovery (Room Not Ready & Wrong View)',
    category: 'Hospitality & Tourism / Hotel and Lodging Management Series (HLM)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Guest Relations Manager at Starlight Oceanfront Resort. 

A Platinum Tier loyalty member, Mrs. Jenkins (the judge), has just arrived at 4:30 PM (guaranteed 4:00 PM check-in time) with her spouse and two young children after a grueling 10-hour flight for their once-a-year family vacation. 

Upon arrival, the front desk agent sheepishly informs Mrs. Jenkins that her reserved Oceanfront Connecting 2-King Family Suite has not been cleaned yet due to an unexpected housekeeping staffing shortage and an HVAC maintenance drain leak. The only immediately available room ready for occupancy is a standard double-queen room on the 2nd floor facing the concrete parking lot and trash loading dock.

Mrs. Jenkins is exasperated and on the verge of tears, stating that she paid a $400/night premium for ocean views and guaranteed check-in. You must step in to execute a seamless check-in service recovery plan, coordinate cross-departmental fixes, and ensure the family’s vacation experience is salvaged.`,
    clientProblem: 'Guaranteed check-in time breached, reserved premium oceanfront suite unready and damaged, and customer facing downgrade to an unacceptable parking-lot view.',
    constraints: [
      'All other Oceanfront Family Suites are occupied until 11:00 AM checkout tomorrow.',
      'Maintenance requires 40 minutes to replace the HVAC condensate pipe; housekeeping rush cleaning takes 30 minutes thereafter.',
      'The family has two overtired young children and luggage waiting in the lobby.',
    ],
    performanceIndicators: [
      { 
        code: 'HT:008', 
        description: 'Formulate immediate check-in service recovery and guest compensation solutions.', 
        guidelines: 'Grant immediate complimentary Executive VIP Lounge access with snacks and drinks, provide $150 resort dining credit for dinner, and waive the first night’s room rate.' 
      },
      { 
        code: 'CR:003', 
        description: 'Handle customer dissatisfaction with front-desk professionalism, empathy, and personal ownership.', 
        guidelines: 'Take personal ownership of the key handoff, assign a dedicated bell captain to handle luggage, and send real-time SMS updates every 20 minutes.' 
      },
      { 
        code: 'OP:045', 
        description: 'Coordinate cross-departmental operations between Front Office, Maintenance, and Housekeeping.', 
        guidelines: 'Dispatch priority work order to Chief Engineer and assign the Executive Housekeeper to personally conduct a 10-point white-glove inspection.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present an executive recovery package to restore long-term brand loyalty and customer lifetime value.', 
        guidelines: 'Propose a 4-point plan: Immediate Hospitality Comfort, Expedited Suite Delivery, Financial Concessions, and GM Welcome Gift Basket with handwritten apology.' 
      },
    ],
  },
  {
    id: 'cs-hosp-03',
    title: 'Pinecrest Mountain Lodge: Checkout Folio Dispute & Unauthorized Charges',
    category: 'Hospitality & Tourism / Hospitality Services Team Decision Making (HTDM)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Front Desk & Night Audit Supervisor at Pinecrest Mountain Lodge. 

A guest, Dr. Robert Chen (the judge), is at the checkout counter at 7:15 AM rushing to catch the 7:45 AM airport express shuttle. When reviewing his printed checkout folio, Dr. Chen discovers $385 in unexpected and disputed charges:
1. $120 Minibar automated sensor charge (Dr. Chen states his family only stored their own baby formula and never opened snacks).
2. $95 Daily Resort Fee (Dr. Chen shows a booking confirmation email where the corporate group discount explicitly stated "All Resort Amenities Fees Waived").
3. $70 Valet Parking fee for 2 nights (Dr. Chen arrived via rideshare and never had a vehicle on property).
4. $100 Alpine Spa massage charge (signed by a "R. Cheung" in room 412, mistakenly posted to Dr. Chen’s room 421).

Dr. Chen is annoyed, anxious about missing his airport flight, and alarmed that the hotel has placed an excessive $600 pending hold on his debit card. You must resolve the billing dispute immediately, audit the folio discrepancies, and process the correct refund/credit adjustments.`,
    clientProblem: 'Multiple erroneous and unauthorized charges on the guest folio causing financial anxiety and friction during the final guest touchpoint before airport departure.',
    constraints: [
      'Guest must board the airport shuttle in 10 minutes.',
      'Total disputed charges equal $385 across 4 distinct revenue centers (Minibar, Front Desk, Valet, Spa).',
      'Front desk supervisors are authorized to write off billing errors up to $500 with documented reason codes.',
    ],
    performanceIndicators: [
      { 
        code: 'FI:064', 
        description: 'Audit hotel guest ledger folios and explain billing reconciliation procedures.', 
        guidelines: 'Verify electronic minibar door sensor logs, review valet vehicle registry, cross-reference spa signature slips, and verify the corporate rate code promo terms.' 
      },
      { 
        code: 'CR:009', 
        description: 'Resolve customer billing disputes with speed, transparency, and calm assurance.', 
        guidelines: 'Immediately remove all 4 disputed charges ($385 total) without arguing or making the guest wait for cross-departmental investigations.' 
      },
      { 
        code: 'BL:001', 
        description: 'Explain credit card pre-authorization hold release timelines and consumer financial protection.', 
        guidelines: 'Explain the difference between settled charges and bank pre-authorization holds, and provide an updated zero-balance final invoice with merchant transaction code.' 
      },
      { 
        code: 'SM:001', 
        description: 'Deliver an efficient checkout resolution that leaves a lasting positive brand impression.', 
        guidelines: 'Hand the guest a corrected receipt within 3 minutes, provide a complimentary travel breakfast box for the airport shuttle, and award 5,000 goodwill points.' 
      },
    ],
  },
  {
    id: 'cs-hosp-04',
    title: 'Bistro Bella Fine Dining: Service Recovery for Severely Dissatisfied Guests',
    category: 'Hospitality & Tourism / Restaurant and Food Service Management Series (RFSM)',
    timeLimitMinutes: 15,
    scenarioText: `You are the General Manager at Bistro Bella, an upscale Italian dining establishment located inside an upscale coastal resort. 

On a packed Saturday evening, a couple, Mark and Elena (the judge), are celebrating their 20th wedding anniversary. They booked a prime romantic patio table a month in advance. However, a series of catastrophic service failures occurred:
1. Their table was given away due to an overbooked reservation software glitch, forcing them to wait 45 minutes in a noisy hallway.
2. When seated, their food took 55 minutes to arrive; the steaks were served lukewarm and overcooked (well-done instead of medium-rare).
3. Elena’s severe dairy allergy was noted on the reservation ticket, but the kitchen sprinkled parmesan cheese over her risotto.
4. While serving water, an untrained busser accidentally spilled a full glass of red wine across Elena’s designer silk dress.

The couple is deeply hurt and outraged, stating that their milestone anniversary has been ruined. Mark is demanding a 100% refund, compensation for dry cleaning, and is preparing to post video footage to TikTok and Yelp. You must take complete leadership ownership, apply the LAST/HEAT hospitality recovery framework, and turn this disaster into a brand-saving recovery.`,
    clientProblem: 'Multiple catastrophic food and beverage service failures ruining an anniversary, posing allergy safety risks, causing property damage, and triggering severe viral reputation risks.',
    constraints: [
      'Restaurant is at 100% capacity with a 30-minute waitlist.',
      'General Manager has full authority to 100% comp the meal ($240 check) and authorize property damage reimbursement.',
      'Guests are highly emotional and requesting immediate executive accountability.',
    ],
    performanceIndicators: [
      { 
        code: 'CR:009', 
        description: 'Apply the LAST / HEAT service recovery framework (Listen, Empathize, Apologize, Solve, Thank).', 
        guidelines: 'Listen attentively without interruption, acknowledge the emotional hurt of a ruined milestone, deliver an unconditional sincere apology, and act decisively.' 
      },
      { 
        code: 'HT:008', 
        description: 'Implement comprehensive food and beverage service compensation and recovery protocols.', 
        guidelines: '100% comp the entire $240 check, issue an on-the-spot $100 dry-cleaning check/voucher, and prepare fresh allergen-free dessert packaged to take home.' 
      },
      { 
        code: 'PR:001', 
        description: 'Protect restaurant brand equity and mitigate viral social media reputation damage.', 
        guidelines: 'Invite the couple back for a fully hosted 5-course VIP Chef’s Table anniversary dinner on the house, transforming negative sentiment into lifelong advocacy.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present an operational root-cause analysis and staff quality control plan to prevent recurrence.', 
        guidelines: 'Address host reservation limits, kitchen allergy allergen flags (red ticket protocol), and mandatory food-runner tray balancing training.' 
      },
    ],
  },
  {
    id: 'cs-hosp-05',
    title: 'Harborview Grand Hotel: Front Desk & Housekeeping Interdepartmental Conflict & Employee Coaching',
    category: 'Hospitality & Tourism / Hospitality Human Resources Management',
    timeLimitMinutes: 15,
    scenarioText: `You are the Assistant General Manager of the 350-room Harborview Grand Hotel. 

Inter-departmental friction between the Front Desk Supervisor (Derek) and the Executive Housekeeper (Maria) has escalated into a severe operational bottleneck. 
- The front desk team complains that housekeeping is taking too long to release clean rooms on weekends, causing 45-minute lobby queues, angry guests, and low TripAdvisor check-in scores.
- Housekeeping claims the front desk is assigning guests to "dirty/uninspected" rooms, rushing room attendants dangerously, and shouting rudely over the open two-way staff radio channel in front of guests.
- Furthermore, two key front desk agents have exhibited chronic unexcused tardiness (arriving 20-30 minutes late for the 3:00 PM shift change), leaving single agents overwhelmed at the counter.

The General Manager (the judge) has asked you to present a comprehensive human resources and operational coaching plan to resolve interpersonal hostility, establish clear cross-departmental Service Level Agreements (SLAs), and address employee accountability.`,
    clientProblem: 'Inter-departmental hostility between front desk and housekeeping, unprofessional radio communication in guest hearing, and chronic employee absenteeism degrading service standards.',
    constraints: [
      'Entry-level hospitality turnover is already high (28%); harsh punitive terminations without progressive coaching would worsen staffing shortages.',
      'Radio communication protocol must be revamped across all 50 staff handheld devices.',
      'Action plan must be executed within 14 days without increasing overtime payroll budget.',
    ],
    performanceIndicators: [
      { 
        code: 'HR:410', 
        description: 'Formulate employee conflict resolution strategies and team mediation frameworks.', 
        guidelines: 'Conduct a structured joint mediation session between Derek and Maria, establishing mutual respect and shared operational goals.' 
      },
      { 
        code: 'EI:005', 
        description: 'Establish professional communication standards and workplace emotional intelligence.', 
        guidelines: 'Create a strict radio etiquette protocol (earpieces required, no venting over open air) and transition room status tracking to digital PMS tablets.' 
      },
      { 
        code: 'HR:356', 
        description: 'Design constructive employee coaching, attendance tracking, and incentive systems.', 
        guidelines: 'Institute a 3-step progressive discipline policy for chronic tardiness alongside a "Shift Star" monthly punctuality bonus and cross-departmental shadow days.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present an executive HR operational improvement plan with measurable milestones and KPI tracking.', 
        guidelines: 'Define clear metrics: 15-minute average room turnover time, 100% on-time shift handoffs, and target 90%+ check-in guest satisfaction scores.' 
      },
    ],
  },
  {
    id: 'cs-hosp-06',
    title: 'Metropolitan City Center Hotel: Managing Peak Season Overbooking & The Walk Protocol',
    category: 'Hospitality & Tourism / Hotel and Lodging Management (HLM)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Evening Duty Manager at Metropolitan City Center Hotel. 

During an international medical convention with city-wide 99% occupancy, the hotel's revenue management algorithm overbooked the property by 4% to guard against no-shows. Due to perfect weather and zero cancellations, the hotel is 100% physically occupied with 3 guaranteed arriving reservations left with no available rooms.

Two business travelers, Ms. Vance (the judge) and her colleague, who booked through an online travel agency (Expedia), arrive at 9:00 PM expecting their confirmed rooms. You must execute the professional hospitality "Walk Protocol", relocate them to a partner luxury hotel across the city, manage their frustration with empathy, and protect the hotel’s long-term reputation.`,
    clientProblem: 'Hotel is physically oversold with guaranteed reservations that cannot be accommodated on-site, requiring emergency relocation of guests.',
    constraints: [
      '3 comparable luxury rooms have been pre-arranged and secured at the partner Westgate Hotel 2.5 miles away at our hotel’s expense.',
      'Hotel walk policy covers: 100% of the 1st night room rate at the partner hotel + private black car transportation + 1 complimentary return stay certificate.',
      'Guests are exhausted after travel and expected to stay at the headquarters convention hotel.',
    ],
    performanceIndicators: [
      { 
        code: 'HT:008', 
        description: 'Execute standard hospitality "Walk Procedures" professionally, smoothly, and ethically.', 
        guidelines: 'Fully cover room and tax at the destination hotel, arrange complimentary private chauffeur transit, and handle seamless luggage transfer.' 
      },
      { 
        code: 'CR:009', 
        description: 'Communicate overbooking situations transparently without blaming software or third parties.', 
        guidelines: 'Deliver a sincere, dignified apology, explain that accommodations of equal or superior quality have been reserved, and provide direct manager contact info.' 
      },
      { 
        code: 'RM:001', 
        description: 'Analyze revenue management overbooking thresholds and risk mitigation policies.', 
        guidelines: 'Explain how overbooking algorithms work and recommend tightening overbooking buffers to 0% during high-compression convention dates.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present a guest retention and service recovery pitch that preserves customer lifetime value.', 
        guidelines: 'Present the guest with a 1-Night Free Future Stay Certificate, 15,000 bonus loyalty points, and personal follow-up call the next morning.' 
      },
    ],
  },
  {
    id: 'cs-hosp-07',
    title: 'Crestview Conference Center: Banquet Catering Dietary Crisis & Keynote AV Failure',
    category: 'Hospitality & Tourism / Event Planning & Catering Management',
    timeLimitMinutes: 15,
    scenarioText: `You are the Event Operations Manager at Crestview Conference Center. 

A prestigious regional healthcare corporation has booked an executive gala dinner for 180 attendees with a $35,000 budget. At 6:40 PM, just 20 minutes before dinner service, the lead corporate event planner (the judge) storms into the banquet kitchen in a panic:
1. The banquet kitchen prepared a single chicken dish containing dairy and gluten, completely missing the pre-submitted dietary requirements for 25 VIP attendees (including the keynote speaker and CEO who has celiac disease).
2. The main ballroom AV projector bulb blew out, leaving the keynote stage screen pitch black 20 minutes before the opening presentation.

The client is horrified, anxious about attendee safety and the high-profile keynote. You must immediately coordinate an emergency culinary response, resolve the AV hardware failure, communicate calmly with the client, and ensure the event is executed flawlessly.`,
    clientProblem: 'Urgent banquet food allergy compliance failure and ballroom AV breakdown 20 minutes before a high-profile corporate keynote event.',
    constraints: [
      'Keynote speech begins in exactly 20 minutes.',
      'Kitchen has 15 minutes to prepare 25 certified gluten-free/dairy-free gourmet entrees.',
      'Backup laser projector is located in the 3rd-floor engineering storage room.',
    ],
    performanceIndicators: [
      { 
        code: 'HT:008', 
        description: 'Manage urgent food service dietary compliance and food safety protocols.', 
        guidelines: 'Establish a sanitized dedicated prep station immediately, fire 25 fresh grilled salmon and vegetable entrees with Executive Chef oversight, and use distinct red-domed banquet covers.' 
      },
      { 
        code: 'OP:045', 
        description: 'Execute rapid technical event operations and audio-visual crisis troubleshooting.', 
        guidelines: 'Deploy lead AV technician with the backup laser projector and high-speed HDMI switch, completing installation and testing within 10 minutes.' 
      },
      { 
        code: 'CR:009', 
        description: 'Reassure corporate event planners with calm, frequent progress checkpoints and composure.', 
        guidelines: 'Provide 5-minute milestone updates, assign a dedicated Banquet Captain to personally serve the CEO’s table, and maintain steady confidence.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present a post-event billing reconciliation package and operational audit report.', 
        guidelines: 'Offer a 15% master banquet billing concession ($5,250 credit) and implement digital Banquet Event Order (BEO) double-signature allergy checklists.' 
      },
    ],
  },

  // ==========================================
  // 2. BUSINESS FINANCE & ACCOUNTING SECTOR (BFS / ACT / FTDM / PFN / PFL)
  // ==========================================
  {
    id: 'cs-fin-01',
    title: 'Apex Cold-Chain Logistics: Capital Budgeting, NPV & Automated Sortation Machinery',
    category: 'Finance / Business Finance Series (BFS) / Corporate Valuation',
    timeLimitMinutes: 15,
    scenarioText: `You are the Senior Financial Analyst at Apex Logistics, a regional cold-chain pharmaceutical freight distributor. 

The Chief Operating Officer (the judge) is deciding between two mutually exclusive $180,000 capital projects for this year's budget:
- Project Alpha (Robotic Sortation System): Upfront cost $180,000. Generates $55,000 in net annual cost savings and operating cash inflows for 5 years with zero salvage value.
- Project Beta (Refrigerated Van Fleet Expansion): Upfront cost $180,000. Generates $72,000 in annual net cash flow for 3 years with an estimated $30,000 vehicle salvage resale value at the end of Year 3.

The company’s Weighted Average Cost of Capital (WACC) hurdle rate is 8.0%. The COO wants to know the Net Present Value (NPV), Internal Rate of Return (IRR), Payback Period, and MACRS depreciation tax shield impacts for both projects to justify which investment delivers superior shareholder value.`,
    clientProblem: 'Capital allocation decision between automated robotics (5-year horizon) vs. delivery fleet expansion (3-year horizon) with identical $180,000 initial capital outlays.',
    constraints: [
      'Apex corporate capital expenditure budget is capped at $200,000 this fiscal cycle.',
      'Company hurdle rate (WACC) is strictly 8.0%.',
      'Pharmaceutical clients require automated temperature audit logs starting in 18 months.',
    ],
    performanceIndicators: [
      { 
        code: 'FI:068', 
        description: 'Calculate Net Present Value (NPV) and Internal Rate of Return (IRR) for capital budgeting projects.', 
        guidelines: 'Project Alpha NPV = $39,600 (IRR ~16.1%). Project Beta NPV = $29,300 (IRR ~14.8%). Demonstrate that Alpha provides higher total dollar value addition.' 
      },
      { 
        code: 'FI:085', 
        description: 'Evaluate payback period, terminal salvage value, and fixed asset depreciation tax shields.', 
        guidelines: 'Calculate Alpha Payback = 3.27 years vs Beta Payback = 2.50 years. Explain how 5-year MACRS depreciation shields cash flows from income taxes.' 
      },
      { 
        code: 'FI:064', 
        description: 'Assess project operational risk profiles and strategic alignment with industry regulatory trends.', 
        guidelines: 'Highlight that Alpha robotics automate cold-chain compliance logs, reducing pharmaceutical spoilage liabilities by $40,000/yr.' 
      },
      { 
        code: 'SM:001', 
        description: 'Deliver a structured capital allocation defense to executive leadership.', 
        guidelines: 'Formulate an executive summary advising Project Alpha selection, backed by higher NPV, longer cash generation life, and regulatory compliance synergy.' 
      },
    ],
  },
  {
    id: 'cs-fin-02',
    title: 'Veloce Robotics: Seed-Stage Capital Structure — Convertible Note vs. SBA 7(a) Senior Debt',
    category: 'Finance / Financial Services Team Decision Making (FTDM) / Entrepreneurial Finance',
    timeLimitMinutes: 15,
    scenarioText: `You are the Chief Financial Officer for Veloce Robotics, a seed-stage autonomous warehouse drone startup. 

The Founder and CEO (the judge) needs $500,000 in runway capital to fulfill a 50-unit commercial warehouse pilot order. Two financing offers are on the table:
- Offer 1 (Debt Financing): A 7-year SBA 7(a) commercial bank loan at 8.75% variable interest. Requires $7,980 monthly debt service and personal assets pledged as collateral, but dilutes 0% equity.
- Offer 2 (Equity / Convertible Debt): A Convertible Promissory Note from a prominent venture angel syndicate providing $500,000 with a $4.0M valuation cap, a 20% conversion discount on the upcoming Series A round, and 6% annual paid-in-kind (PIK) interest, requiring no monthly cash outflows.

The CEO is terrified of giving away equity too early but is equally worried that monthly debt service will drain the company’s tight $35,000 monthly cash operating cushion. You must analyze the cash flow implications, equity dilution trade-offs, and covenant restrictions to recommend the optimal path.`,
    clientProblem: 'Evaluating debt financing ($7,980/month fixed cash drain with personal risk) vs. a Convertible Note (future equity dilution without monthly cash burden) for $500,000 startup expansion.',
    constraints: [
      'Startup currently generates $18,000/month gross margin with $22,000 monthly operating burn ($4,000 net monthly deficit before pilot rollout).',
      'Founder owns 100% of common stock and desires to maintain voting control through Series A.',
      'Commercial pilot revenues of $45,000/month will begin generating in 6 months.',
    ],
    performanceIndicators: [
      { 
        code: 'FI:085', 
        description: 'Compare debt financing liabilities vs. convertible equity dilution mechanisms.', 
        guidelines: 'Explain that the SBA loan drains $95,760 in cash during Year 1 when the startup is cash-poor, whereas the Convertible Note conserves 100% liquid cash for engineering.' 
      },
      { 
        code: 'FI:064', 
        description: 'Analyze liquidity runway, default risk, and debt service coverage ratios (DSCR).', 
        guidelines: 'Demonstrate that taking debt while running a net cash burn creates severe insolvency default risk before the pilot revenue arrives.' 
      },
      { 
        code: 'BL:001', 
        description: 'Explain investor covenant clauses, valuation caps, conversion discounts, and personal guarantees.', 
        guidelines: 'Clarify that the SBA loan requires personal home liens, while the $4M valuation cap protects the founder by limiting dilution to ~12.5% at Series A.' 
      },
      { 
        code: 'SM:001', 
        description: 'Formulate an executive capital financing recommendation with sensitivity modeling.', 
        guidelines: 'Recommend accepting the Convertible Note, negotiating the valuation cap up to $4.5M, and using non-dilutive grant matching for additional runway.' 
      },
    ],
  },
  {
    id: 'cs-fin-03',
    title: 'Beacon Medical Supply: Cash Conversion Cycle & Working Capital Optimization',
    category: 'Finance / Accounting Applications Series (ACT) / Business Finance',
    timeLimitMinutes: 15,
    scenarioText: `You are the Corporate Controller for Beacon Medical Supply, a regional distributor of clinical diagnostics equipment and surgical consumables. 

The Managing Director (the judge) is alarmed that despite record quarterly sales of $1.5M, the company has overdrafted its operating bank account twice this month. Your balance sheet and ledger audit reveals:
- Days Sales Outstanding (DSO) has ballooned to 78 days (hospital clients taking 2.5 months to pay invoices; industry benchmark is 40 days).
- Days Inventory Outstanding (DIO) is 65 days (too many slow-moving specialty surgical kits sitting on warehouse shelves).
- Days Payables Outstanding (DPO) is 28 days (Beacon pays medical manufacturers almost immediately to maintain vendor status).
- This results in a crippling 115-day Cash Conversion Cycle (CCC = 78 + 65 - 28 = 115 days), trapping $420,000 of working capital.

The MD demands a working capital turnaround plan, receivables factoring evaluation, and invoice collection tightening without damaging relationships with key hospital health systems.`,
    clientProblem: 'A 115-day Cash Conversion Cycle has locked up $420,000 in working capital, causing liquidity shortages despite strong paper profitability.',
    constraints: [
      'Hospital health systems represent 65% of accounts receivable and enforce strict procurement bureaucracy.',
      'Bank credit line interest has risen to Prime + 2.5% (11.0% APR).',
      'Turnaround plan must free up at least $150,000 in liquid cash within 60 days.',
    ],
    performanceIndicators: [
      { 
        code: 'FI:064', 
        description: 'Calculate and optimize the Cash Conversion Cycle (CCC = DSO + DIO - DPO).', 
        guidelines: 'Demonstrate how reducing DSO from 78 to 48 days and extending DPO to 45 days reduces CCC to 68 days, immediately liberating $170,000 in trapped operating cash.' 
      },
      { 
        code: 'FI:010', 
        description: 'Formulate accounts receivable aging analysis, early payment discounts, and collection protocols.', 
        guidelines: 'Institute "2/10 Net 30" invoice terms (2% prompt payment discount) and automated digital billing reminders at 15 and 25 days.' 
      },
      { 
        code: 'FI:058', 
        description: 'Evaluate non-recourse receivables factoring vs. asset-backed working capital lines of credit.', 
        guidelines: 'Compare factoring fees (1.5% - 3.0% discount fee) against line of credit interest to select the most cost-effective bridge financing.' 
      },
      { 
        code: 'OP:045', 
        description: 'Establish inventory management controls (Just-In-Time JIT and ABC classification) to accelerate inventory turnover.', 
        guidelines: 'Classify inventory into High-Velocity Category A consumables vs. Category C special orders to lower DIO by 15 days.' 
      },
    ],
  },
  {
    id: 'cs-fin-04',
    title: 'Heritage Community Bank: Commercial Real Estate Credit Risk Underwriting & DSCR Stress Test',
    category: 'Finance / Financial Services Team Decision Making (FTDM) / Commercial Banking',
    timeLimitMinutes: 15,
    scenarioText: `You are the Senior Commercial Credit Underwriter at Heritage Community Bank. 

A prominent local real estate investor, Mr. Sterling (the judge), has submitted an application for a $2,400,000 25-year commercial mortgage at 6.75% interest (annual debt service: $199,200) to acquire "Oakridge Plaza", an 8-unit suburban retail shopping center listed for $3,200,000 (75% Loan-to-Value). 

The property’s financial pro forma shows:
- Gross Potential Rent: $320,000/yr.
- Operating Expenses (Property Taxes, Insurance, CAM, Maintenance): $108,000/yr.
- Current Net Operating Income (NOI): $212,000/yr ($320K - $108K).
- Current Base DSCR: 1.06x ($212,000 / $199,200), which fails the bank's minimum 1.25x policy threshold.
- Furthermore, the anchor tenant (a national pharmacy chain paying 38% of total rent) has a lease expiring in 14 months with no guaranteed renewal.

You must present the bank's credit committee findings, execute an interest rate & vacancy stress-test, and negotiate loan restructuring covenants (e.g. lowering LTV to 65%, establishing a debt service reserve escrow, and requiring a limited personal guarantee).`,
    clientProblem: 'Commercial real estate loan request exhibits insufficient Debt Service Coverage (1.06x vs. 1.25x bank minimum) and substantial anchor tenant lease rollover risk.',
    constraints: [
      'Heritage Bank statutory policy requires minimum 1.25x DSCR and maximum 75% LTV on commercial retail properties.',
      'Borrower has $300,000 additional liquid cash available for down payment enhancement if required.',
      'Bank wants to retain the valuable relationship without compromising underwriting risk standards.',
    ],
    performanceIndicators: [
      { 
        code: 'FI:068', 
        description: 'Calculate Debt Service Coverage Ratio (DSCR), Net Operating Income (NOI), and Loan-to-Value (LTV).', 
        guidelines: 'Demonstrate that current 1.06x DSCR leaves only a $12,800 annual cushion, vulnerable to even a single tenant vacancy.' 
      },
      { 
        code: 'FI:085', 
        description: 'Stress-test loan underwriting against anchor tenant lease rollover and interest rate volatility.', 
        guidelines: 'Model a scenario where pharmacy vacates (NOI drops to $110,000), causing DSCR to collapse to 0.55x (severe default territory).' 
      },
      { 
        code: 'BL:001', 
        description: 'Structure commercial loan covenants, debt service reserve escrows, and personal guarantees.', 
        guidelines: 'Propose a 68% LTV loan ($2,176,000) with a 6-month principal & interest debt service escrow account ($99,600) released upon anchor lease renewal.' 
      },
      { 
        code: 'EI:001', 
        description: 'Communicate underwriting decisions with professional diplomacy, transparency, and collaborative problem-solving.', 
        guidelines: 'Frame the conditional approval as a win-win structure that protects the borrower from overleveraging while meeting bank risk guidelines.' 
      },
    ],
  },
  {
    id: 'cs-fin-05',
    title: 'Summit Sports & Apparel: Seasonal Cash Flow Budgeting & Inventory Liquidation',
    category: 'Finance / Business Finance Series (BFS) / Principles of Finance',
    timeLimitMinutes: 15,
    scenarioText: `You are acting as the Assistant Financial Manager for Summit Sports, a local sporting goods retailer. 

The store manager, Mr. Marcus (the judge), explains that over the past six months, excess inventory of winter sports gear ($45,000 tied up on shelves) caused a severe cash crunch. The store currently has only $6,000 in liquid cash in the checking account, and a $12,000 supplier invoice for high school spring baseball uniforms is due in 30 days. 

Mr. Marcus needs your recommendation on how to free up cash, manage inventory markdowns without breaching cost floors, negotiate trade credit extensions, and build a rolling cash flow budget to prevent future insolvencies.`,
    clientProblem: 'Excess unsold winter inventory has tied up $45,000 in cash, leaving only $6,000 in reserves to cover an upcoming $12,000 supplier invoice due in 30 days.',
    constraints: [
      'Store liquid cash balance is currently $6,000.',
      'Supplier invoice of $12,000 must be paid in 30 days to avoid vendor hold penalties.',
      'Winter inventory markdowns cannot be priced below wholesale cost (minimum 10% gross margin target).',
    ],
    performanceIndicators: [
      { code: 'FI:064', description: 'Explain the difference between cash flow and net profit on financial statements.', guidelines: 'Explain how having unsold inventory on shelves locks up cash needed for monthly vendor bills and operating payroll.' },
      { code: 'FI:092', description: 'Formulate cash-flow recovery and inventory clearance strategies.', guidelines: 'Propose a 25% end-of-season clearance sale, promotional bundle discounts, and trade credit terms.' },
      { code: 'FI:058', description: 'Analyze short-term financing options to cover seasonal operating deficits.', guidelines: 'Recommend a small business working capital line of credit or negotiating a 15-day supplier payment extension.' },
      { code: 'SM:001', description: 'Present a structured 30-day action plan to the store owner.', guidelines: 'Deliver a clear, professional presentation with specific dollar targets and inventory turnaround metrics.' },
    ],
  },
  {
    id: 'cs-fin-06',
    title: 'Pinnacle Wealth Advisory: Comprehensive Retirement Asset Allocation, Tax-Efficient Decumulation & Sequence of Returns Risk',
    category: 'Finance / Personal Financial Literacy (PFL) / Financial Consulting Series (FCS)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Lead Certified Financial Planner (CFP) at Pinnacle Wealth Advisory. 

A married couple in their early 60s, Dr. and Mrs. Harrison (the judge), have accumulated $1,800,000 across multiple investment vehicles:
- $1,100,000 in pre-tax Traditional 401(k) / Traditional IRA accounts
- $450,000 in a taxable joint brokerage account (with $120,000 in unrealized long-term capital gains)
- $250,000 in Roth IRAs

They plan to retire in 10 months and require $95,000/year after taxes to maintain their lifestyle, cover private healthcare premiums until Medicare eligibility at age 65, and travel. 

The Harrisons are deeply anxious about two major risks:
1. Sequence of Returns Risk: Experiencing an equity bear market during their first 3 years of retirement while actively selling shares for living expenses.
2. Tax & RMD Inefficiencies: Withdrawing randomly from accounts without a coordinated tax strategy, which could trigger high ordinary income tax brackets and steep Medicare Part B/D IRMAA premium surcharges once Required Minimum Distributions (RMDs) begin at age 75.

You must present a comprehensive retirement decumulation plan:
1. Establish a 3-Bucket Asset Allocation Strategy (Bucket 1: 2-year cash & Treasury bill buffer for guaranteed immediate spending; Bucket 2: 5-year intermediate bond ladder for income stability; Bucket 3: Global equities & dividend growth for long-term purchasing power inflation protection).
2. Design a multi-year Roth IRA conversion ladder during the "retirement tax valley" (ages 62–70) to fill up the lower 12% and 22% federal tax brackets before Social Security and RMDs kick in.
3. Optimize Social Security claiming ages (comparing age 62 vs. Full Retirement Age 67 vs. age 70 with an 8%/year delayed retirement credit) to maximize guaranteed longevity income.`,
    clientProblem: 'Retiring couple needs a $95,000/yr tax-efficient decumulation strategy that protects against Sequence of Returns Risk and optimizes multi-year Roth conversions prior to RMDs.',
    constraints: [
      'Couple requires $95,000 net after-tax income annually indexed to 3% inflation.',
      'Healthcare bridge coverage prior to age 65 costs $16,800 per year.',
      'Plan must prevent irreversible capital depletion during potential early-retirement market drawdowns.',
    ],
    performanceIndicators: [
      { 
        code: 'FI:064', 
        description: 'Formulate tax-efficient withdrawal sequencing across Taxable, Tax-Deferred, and Tax-Free Roth accounts.', 
        guidelines: 'Demonstrate optimal decumulation order: Draw from taxable brokerage first (utilizing lower long-term capital gains rates), execute selective Roth conversions up to the 22% tax bracket ceiling, and preserve Roth IRAs for tax-free legacy or high-bracket emergency needs.' 
      },
      { 
        code: 'FI:078', 
        description: 'Mitigate Sequence of Returns Risk through cash buffer buckets and dynamic withdrawal rules.', 
        guidelines: 'Explain how maintaining a 24-month liquid cash/Treasury buffer ($190,000) prevents the forced liquidation of depreciated equity assets during market downturns.' 
      },
      { 
        code: 'FI:092', 
        description: 'Model multi-year Roth conversion ladders and analyze the impact on future Required Minimum Distributions (RMDs) and Medicare IRMAA tiers.', 
        guidelines: 'Show that converting $60,000/year from Traditional 401(k) to Roth IRA between ages 62-70 reduces future taxable RMDs by over $400,000, saving substantial taxes in their 70s and 80s.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present an executive retirement roadmap with asset allocation glide-paths and Social Security breakeven calculations.', 
        guidelines: 'Deliver a clear, empathetic, and quantitative presentation demonstrating that delaying the higher earner’s Social Security benefit to age 70 provides an inflation-adjusted longevity insurance baseline of $48,000/year.' 
      },
    ],
  },
  {
    id: 'cs-fin-07',
    title: 'Vanguard Biotech Corp: M&A DCF Enterprise Valuation, Synergies Analysis & LBO Debt Structuring',
    category: 'Finance / Corporate Finance & Valuation / Financial Services Team Decision Making (FTDM)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Director of Mergers & Acquisitions (M&A) and Corporate Strategy at Vanguard Biotech Corp ($1.4B market cap). 

The Chief Financial Officer (the judge) has asked you to lead the acquisition evaluation of OncoGen Labs, a privately held precision oncology diagnostics company with $80M in trailing twelve months (TTM) revenue and $18M in EBITDA. 

OncoGen’s private equity owners have set an asking enterprise purchase price of $216M, representing a 12.0x EV/EBITDA multiple. 

Your financial due diligence models reveal:
- Base Standalone DCF Intrinsic Valuation: $178M (using an 8.5% Weighted Average Cost of Capital and 2.5% terminal growth rate).
- Annual Quantifiable Pre-Tax Synergies: $22M/yr by Year 2 ($14M cost synergies via R&D lab consolidation and redundant administrative cuts; $8M revenue synergies through Vanguard’s global hospital salesforce).
- Proposed Financing Structure: $110M Senior Secured Term Loan A (SOFR + 275 bps, 5.8x debt-to-EBITDA pro-forma with synergies), $45M Mezzanine Subordinated Debt (11.5% coupon with 3% equity warrant coverage), and $61M Vanguard balance sheet cash.

The CFO requires your investment committee pitch addressing valuation justification, synergy probability risk adjustments, financing leverage covenant limits, and post-transaction Earnings Per Share (EPS) accretion/dilution.`,
    clientProblem: 'Evaluating a $216M M&A buyout (12.0x EV/EBITDA): determining DCF intrinsic valuation with synergies, optimal debt financing structure, and EPS accretion impact.',
    constraints: [
      'Vanguard Board policy limits Total Debt / Pro-Forma EBITDA leverage to a maximum of 4.25x.',
      'Synergy integration costs are estimated at $12M one-time cash expense in Year 1.',
      'Deal must be EPS accretive within 18 months of transaction close.',
    ],
    performanceIndicators: [
      { 
        code: 'FI:085', 
        description: 'Value acquisition target using Discounted Cash Flow (DCF), terminal value, and EV/EBITDA precedent transaction multiples.', 
        guidelines: 'Demonstrate that while standalone OncoGen is worth $178M at 12x, the Net Present Value of $22M annual synergies adds $92M in enterprise value, making the $216M bid financially compelling.' 
      },
      { 
        code: 'FI:068', 
        description: 'Structure acquisition financing: Senior bank debt tranches, mezzanine subordinated notes, and leverage covenant sizing.', 
        guidelines: 'Show that pro-forma combined EBITDA with synergies of $40M brings the $110M senior debt leverage down to 2.75x, safely within the board’s 4.25x maximum leverage ceiling.' 
      },
      { 
        code: 'FI:012', 
        description: 'Quantify operational cost synergies, revenue cross-selling synergies, and integration execution risks.', 
        guidelines: 'Apply a 20% risk-haircut to revenue synergies while banking on high-confidence R&D overhead and corporate insurance consolidation.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present an M&A investment committee recommendation with EPS accretion/dilution sensitivity modeling.', 
        guidelines: 'Deliver a decisive recommendation: Proceed with acquisition at $216M, showing +$0.24 EPS accretion in Year 2 and a 16.8% Internal Rate of Return (IRR).' 
      },
    ],
  },
  {
    id: 'cs-fin-08',
    title: 'Meridian Global Supply: Foreign Exchange (FX) Exposure, Currency Forward Contracts & Margin Protection',
    category: 'Finance / Business Finance Series (BFS) / International Financial Risk Management',
    timeLimitMinutes: 15,
    scenarioText: `You are the Corporate Treasurer for Meridian Global Supply, a North American industrial distributor. 

The Vice President of International Operations (the judge) has just executed a major procurement contract with a German precision manufacturing firm for €15,000,000 in specialized robotic assembly units, payable in full in 180 days upon final sea delivery.

When contract terms were agreed to last week, the EUR/USD exchange rate stood at $1.05 per €1, representing an expected liability of $15,750,000 USD. However, recent geopolitical shifts, energy price shocks, and European Central Bank interest rate increases have triggered strong upward momentum in the Euro. 

Wall Street consensus forecasts warn that the Euro could surge to $1.16 per €1 over the next 6 months. If unhedged, Meridian’s purchase cost would escalate to $17,400,000 USD—a massive $1,650,000 unbudgeted cash outflow that would wipe out 80% of the projected gross profit margin on the customer resale contract.

The VP demands an immediate FX risk mitigation presentation comparing three corporate Treasury alternatives:
1. Unhedged Spot Exposure (relying on open currency markets, accepting full downside volatility).
2. 180-Day FX Currency Forward Contract (binding commitment locking in a forward rate of $1.062 per €1 with the commercial bank).
3. FX Currency Call Option Collar (purchasing a EUR Call option strike at $1.070 for a $180,000 premium, partially financed by selling a EUR Put option strike at $1.030).`,
    clientProblem: 'Unhedged €15,000,000 supplier payable exposed to Euro currency appreciation, threatening a $1,650,000 gross margin loss over the next 180 days.',
    constraints: [
      'Meridian’s overall profit margin on the robotic units is 14% ($2.45M gross profit at base $1.05 rate).',
      'Maximum allowable currency hedge cost/premium is $200,000.',
      'Treasury policy requires protecting at least 85% of projected gross contract margin.',
    ],
    performanceIndicators: [
      { 
        code: 'FI:095', 
        description: 'Identify and quantify foreign exchange (FX) transaction exposure and gross margin sensitivity.', 
        guidelines: 'Demonstrate that every 1-cent increase in EUR/USD adds $150,000 in USD expense, proving that leaving a €15M invoice unhedged is an unacceptable corporate gamble.' 
      },
      { 
        code: 'FI:098', 
        description: 'Compare derivative hedging instruments: Currency Forward Contracts vs. FX Call Options vs. Zero-Cost Collars.', 
        guidelines: 'Explain trade-offs: The Forward Contract eliminates 100% of risk at a fixed $1.062 rate ($15.93M total), while the Option Collar preserves upside if the Euro weakens below $1.030.' 
      },
      { 
        code: 'FI:064', 
        description: 'Calculate forward rate differentials, interest rate parity (IRP), and hedge accounting compliance.', 
        guidelines: 'Show how the forward rate is priced using the US-Eurozone short-term interest rate differential and qualifies for cash-flow hedge accounting under GAAP.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present an executive Treasury hedging policy and risk governance framework to the board of directors.', 
        guidelines: 'Recommend executing the 180-day FX Forward Contract to lock in a guaranteed $2.27M gross profit margin (saving $1.47M compared to the $1.16 unhedged worst-case).' 
      },
    ],
  },

  // ==========================================
  // 3. MARKETING & MERCHANDISING SECTOR (MMS / AAM / SEM / RMS / IMC)
  // ==========================================
  {
    id: 'cs-mkt-01',
    title: 'Aura Athleisure: Direct-to-Consumer (DTC) Gen-Z Brand Repositioning & Omnichannel Launch',
    category: 'Marketing / Apparel and Accessories Marketing (AAM) / Marketing Management (MMS)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Chief Marketing Officer for Aura Athleisure, a 15-year-old premium activewear brand. 

Over the past two years, Aura’s sales among 16-25-year-olds dropped 24% as younger consumers gravitated toward viral TikTok brands, social commerce, and eco-conscious apparel. The Chief Executive Officer (the judge) has allocated a $150,000 Q3 marketing budget to execute a comprehensive brand repositioning campaign.

You must present a 4-pillar omnichannel marketing plan:
1. Transition from legacy department store wholesale to high-margin Direct-to-Consumer (DTC) e-commerce with frictionless mobile checkout.
2. Launch a creator-led micro-influencer affiliate campaign on TikTok Shop and Instagram Reels targeting fitness enthusiasts and high school athletes.
3. Introduce a new eco-friendly product line ("Aura Earth") made from 100% recycled ocean plastics with transparent supply chain QR codes.
4. Establish experiential community popup activations (e.g. 5K fun runs, campus yoga takeovers) to drive authentic user-generated content (UGC).`,
    clientProblem: 'Reversing a 24% revenue drop among Gen-Z consumers through brand repositioning, social commerce, sustainable product differentiation, and influencer marketing.',
    constraints: [
      'Total campaign budget is capped at $150,000 across digital ads, influencer gifting, and experiential popups.',
      'Customer Acquisition Cost (CAC) target must remain under $28 per customer.',
      'Campaign must launch within 60 days ahead of the back-to-school fall shopping peak.',
    ],
    performanceIndicators: [
      { 
        code: 'MK:014', 
        description: 'Formulate brand repositioning strategies and psychographic customer persona targeting for Gen-Z.', 
        guidelines: 'Define the target persona ("The Eco-Active Student"), emphasizing authenticity, body positivity, sustainability, and digital-first brand discovery.' 
      },
      { 
        code: 'PR:008', 
        description: 'Design a high-ROI social commerce and creator affiliate campaign measuring CAC and ROAS.', 
        guidelines: 'Allocate $60K to 50 micro-influencers (10K-50K followers) with tracked affiliate discount codes, targeting a 3.8x Return on Ad Spend (ROAS).' 
      },
      { 
        code: 'PM:017', 
        description: 'Integrate sustainable product differentiation and transparent eco-labeling into product lifecycle management.', 
        guidelines: 'Position the "Aura Earth" collection with scannable garment tags showcasing ocean cleanup impact metrics.' 
      },
      { 
        code: 'SM:001', 
        description: 'Deliver a multi-channel marketing budget allocation model with customer lifetime value (CLV) targets.', 
        guidelines: 'Present an executive budget breakdown: $60K Influencer/Social Ads, $40K Experiential Popups, $30K DTC Mobile App Enhancements, $20K PR & Community Giveaways.' 
      },
    ],
  },
  {
    id: 'cs-mkt-02',
    title: 'Lumina Cinema & Entertainment Complex: Dynamic Matinee Yield Pricing & Concession Merchandising',
    category: 'Marketing / Sports and Entertainment Marketing Series (SEM) / Marketing Management',
    timeLimitMinutes: 15,
    scenarioText: `You are the Vice President of Marketing for Lumina Entertainment, a 16-screen luxury cinema and arcade entertainment center. 

The General Manager (the judge) is distressed by severe weekday attendance slumps: Monday through Thursday matinees and evenings operate at only 19% auditorium capacity, while Friday and Saturday evening shows are 94% sold out. Concession stand sales per attendee during weekdays average only $8.20 compared to $16.50 on weekends.

You must present an innovative revenue-generating marketing strategy:
1. Implement dynamic yield pricing algorithms (offering $8.00 weekday tickets vs. $16.50 weekend peak tickets) to stimulate off-peak student, remote-worker, and senior demand.
2. Launch a tiered monthly subscription program ("Lumina All-Access Pass" at $21.99/mo) with guaranteed concession perks.
3. Design high-margin cross-merchandised food & beverage bundles (e.g., "Gourmet Artisan Flatbread + Drink + Movie Pass" for $22.00).
4. Create themed community weekday events (e.g., "Trivia & Retro Movie Tuesdays", "Esports Gaming Tournament Thursdays").`,
    clientProblem: 'Severe weekday attendance drop (19% capacity) and low concession spend causing severe revenue drag on an entertainment complex.',
    constraints: [
      'Studio film licensing agreements require fixed minimum per-ticket royalty percentages (cannot discount below $6.50 floor without studio approval).',
      'Dynamic pricing software integration cost cannot exceed $8,000.',
      'Weekday strategy must not cannibalize full-price Friday/Saturday box office receipts.',
    ],
    performanceIndicators: [
      { 
        code: 'PI:001', 
        description: 'Apply dynamic pricing and demand-elasticity principles to maximize off-peak entertainment venue yield.', 
        guidelines: 'Explain how price elasticity of demand allows lowering off-peak prices to dramatically expand total audience volume and concession gross margin.' 
      },
      { 
        code: 'PM:018', 
        description: 'Develop tiered subscription membership packages and loyalty rewards to stabilize recurring monthly revenue.', 
        guidelines: 'Model recurring cash flows from 2,500 subscribers ($54,975/mo steady recurring baseline) who visit 2.2x more frequently.' 
      },
      { 
        code: 'SE:012', 
        description: 'Create cross-merchandising food & beverage bundles that increase average order value (AOV).', 
        guidelines: 'Design high-margin combo bundles with 82% gross margins (popcorn + fountain drinks + hot food combos) boosting weekday per-capita spend to $18.00.' 
      },
      { 
        code: 'CO:014', 
        description: 'Present a promotional digital marketing and local partnership campaign.', 
        guidelines: 'Target local high school clubs, university campus organizations, and senior centers with geo-fenced mobile ads and student ID discounts.' 
      },
    ],
  },
  {
    id: 'cs-mkt-03',
    title: 'Pulse Clean Energy Drink: Collegiate Campus Tour Integrated Marketing Campaign (IMC) & ROAS',
    category: 'Marketing / Integrated Marketing Campaign / Marketing Management Series (MMS)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Brand Marketing Director for Pulse, an all-natural zero-sugar clean energy drink formulated with organic green tea, electrolytes, and lion’s mane mushroom. 

The Vice President of Global Marketing (the judge) has tasked you with designing the national "Pulse Midterm Recharge" Integrated Marketing Campaign across 30 major university and college campuses during fall midterm and finals exam weeks. With a $200,000 budget, you must drive rapid consumer adoption, displace legacy synthetic energy drink brands, and secure retail velocity in campus convenience stores.

Your campaign must incorporate:
1. Experiential sampling stations with branded electric solar charging pods and quiet study lounges in student unions.
2. Collegiate student-athlete NIL (Name, Image, Likeness) and campus club micro-ambassador programs.
3. A viral TikTok / Instagram Reel challenge (#PulseBrainBoost) with gamified study playlist rewards.
4. Co-op retail promotional displays with university bookstore convenience retailers featuring scannable student app discounts.`,
    clientProblem: 'Launching a high-impact $200,000 multi-channel campus marketing campaign to build clean energy drink market share among collegiate consumers.',
    constraints: [
      'Campaign budget is strictly $200,000 across 30 campus markets ($6,600 per campus average).',
      'NCAA NIL sponsorship compliance and university commercial solicitation guidelines must be strictly obeyed.',
      'Campaign must achieve minimum 3.5x Return on Ad Spend (ROAS) and 40,000 direct product trial samplings.',
    ],
    performanceIndicators: [
      { 
        code: 'MK:015', 
        description: 'Design a comprehensive Integrated Marketing Campaign (IMC) across experiential, digital, and retail channels.', 
        guidelines: 'Align brand messaging ("Clean Focus, Zero Crash") across physical sampling, social media creator posts, and retail endcap displays.' 
      },
      { 
        code: 'PR:024', 
        description: 'Leverage student brand ambassadors and NCAA NIL athlete sponsorships compliant with FTC disclosure rules.', 
        guidelines: 'Recruit 120 student ambassadors and 15 collegiate athletes with clear contract deliverables, FTC #ad disclosures, and free product stipends.' 
      },
      { 
        code: 'MK:019', 
        description: 'Establish quantifiable marketing analytics: CAC, ROAS, QR-code coupon redemption rate, and retail velocity.', 
        guidelines: 'Track metrics: $1.80 cost per sample, 28% QR-code coupon conversion rate, and 4.2x ROAS in regional retail sales volume.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present an executive promotional timeline, crisis contingencies, and retailer co-op advertising plan.', 
        guidelines: 'Deliver a structured 4-phase rollout: Teaser Phase, Campus Activation Week, Viral Digital Push, and Retail Velocity Sustainment.' 
      },
    ],
  },
  {
    id: 'cs-mkt-04',
    title: 'Summit Expedition Gear: Flagship Store Planogram Redesign & Visual Merchandising Optimization',
    category: 'Marketing / Retail Merchandising Series (RMS) / Marketing Management',
    timeLimitMinutes: 15,
    scenarioText: `You are the Visual Merchandising Director for Summit Expedition Gear, an outdoor recreation and wilderness apparel retailer with 45 regional store locations. 

The Regional Director of Retail (the judge) shares that the flagship store's sales per square foot ($/sq ft) have declined from $480 to $355 over the past two quarters. Store traffic heatmaps reveal that 65% of shoppers walk directly down the main center aisle toward rear clearance racks, bypassing high-margin technical mountaineering outerwear, GPS satellite communicators, and backpacking gear displayed in the front perimeter.

You must present a comprehensive store layout and planogram redesign:
1. Reconfigure the rigid grid floor layout into an experiential "Racetrack Loop" that increases shopper browse time and visual exposure to high-margin departments.
2. Establish interactive "Touch & Trail" gear testing stations (e.g. an inclined stone walking ramp for hiking boots, a cold-room simulation for thermal sleeping bags).
3. Implement visual merchandising principles: eye-level "strike zones", high-impact pyramid power displays, and warm ambient LED accent lighting.
4. Execute cross-merchandising (e.g. displaying water filtration bottles and electrolyte snacks directly adjacent to lightweight trekking poles) to boost Gross Margin Return on Investment (GMROI).`,
    clientProblem: 'Declining retail sales per square foot ($355 vs. $480 benchmark) caused by poor customer flow, ignored high-margin product categories, and uninspiring store layout.',
    constraints: [
      'Store remodel budget is capped at $35,000 for new modular fixtures and lighting.',
      'Remodel must be completed in phases overnight without closing the retail store during business hours.',
      'Inventory SKU count cannot be reduced by more than 10%.',
    ],
    performanceIndicators: [
      { 
        code: 'RM:005', 
        description: 'Design retail store layouts, customer flow patterns, and focal point planograms that maximize sales per square foot.', 
        guidelines: 'Transition to an intuitive loop layout with strategic speed-bumps and focal point displays that expose shoppers to 85% of store departments.' 
      },
      { 
        code: 'PM:022', 
        description: 'Apply visual merchandising psychology: eye-level shelf hierarchy, sensory engagement, and speed bumps.', 
        guidelines: 'Place high-margin products in the 4ft-6ft "eye-level strike zone" and use warm directional spotlights to accentuate premium technical apparel.' 
      },
      { 
        code: 'FI:064', 
        description: 'Calculate Gross Margin Return on Investment (GMROI) and inventory turnover by merchandise department.', 
        guidelines: 'Demonstrate how cross-merchandising high-margin accessories (65% margin) next to tents (40% margin) increases overall basket size and GMROI from $2.10 to $3.40.' 
      },
      { 
        code: 'SM:001', 
        description: 'Deliver a visual blueprint presentation with projected revenue lift and staff training guidelines.', 
        guidelines: 'Present an executive implementation roadmap with 90-day post-launch audit checkpoints and sales staff customer engagement training.' 
      },
    ],
  },
  {
    id: 'cs-mkt-05',
    title: 'Hyperion Esports & Gaming Arena: Brand Sponsorship Valuation & Twitch Activation Strategy',
    category: 'Marketing / Sports and Entertainment Marketing Team Decision Making (STDM)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Sponsorship & Partnerships Director for Hyperion Esports, a premier competitive gaming league and arena venue hosting international tournaments. 

The Chief Revenue Officer (the judge) is currently in final negotiations with a global semiconductor & gaming PC hardware brand looking to sign a $750,000 2-year naming rights and live stream broadcast sponsorship deal. However, the sponsor’s brand marketing director is hesitant, questioning whether traditional logo banners provide measurable Return on Investment (ROI) among cynical Gen-Z and digital-native gamers.

You must present an innovative, interactive sponsorship activation package:
1. Replace passive logo bugs with interactive Twitch live-chat predictions, custom Bits emotes, and automated hardware giveaway triggers when pro players execute highlight-reel plays.
2. Establish the on-site "Ultra-Performance Hardware VIP Lounge" where tournament attendees test cutting-edge gaming rigs and VR flight simulators.
3. Design exclusive co-branded limited-edition merchandise drops (hoodies, mousepads, keycaps) with QR-code discount links.
4. Deliver a transparent real-time attribution analytics dashboard tracking cost-per-thousand (CPM), engagement rates, click-through rates (CTR), and direct promo code e-commerce conversions.`,
    clientProblem: 'Closing a $750,000 esports sponsorship deal by demonstrating authentic community engagement, interactive live stream activations, and verifiable ROI metrics.',
    constraints: [
      'Sponsor requires a minimum guaranteed 15 million digital impressions across tournament live streams.',
      'Activations must feel organic and entertaining to avoid fan backlash or chat spam.',
      'Sponsorship agreement must be finalized before the upcoming Fall Championship kickoff in 3 weeks.',
    ],
    performanceIndicators: [
      { 
        code: 'SE:048', 
        description: 'Value and structure sports/esports corporate sponsorship tiers, naming rights, and digital activations.', 
        guidelines: 'Structure the $750K package into 4 measurable asset classes: Broadcast Integration ($350K), Arena VIP Activation ($200K), Digital Commerce ($120K), and Content Co-creation ($80K).' 
      },
      { 
        code: 'MK:014', 
        description: 'Analyze digital gaming demographic engagement habits and interactive live streaming consumer behaviors.', 
        guidelines: 'Demonstrate how gamified chat integration and authentic pro-player hardware endorsements drive 4x higher purchase intent than static banners.' 
      },
      { 
        code: 'PR:008', 
        description: 'Develop tangible ROI attribution frameworks measuring CPM, engagement rate, and direct e-commerce conversions.', 
        guidelines: 'Provide a sample weekly analytics report tracking unique promo code redemptions, average order value, and brand sentiment sentiment scores.' 
      },
      { 
        code: 'CO:014', 
        description: 'Pitch a high-stakes sponsorship proposal that aligns sponsor brand values with gaming community culture.', 
        guidelines: 'Deliver a polished, enthusiastic executive pitch addressing sponsor ROI concerns with confidence, statistical proof, and mutual value creation.' 
      },
    ],
  },
  {
    id: 'cs-mkt-06',
    title: 'Luminary Beauty & Cosmetics: Clean Beauty Product Line Launch, Sephora Co-Op Merchandising & Viral Blind Testing',
    category: 'Marketing / Apparel and Accessories / Retail Merchandising / Marketing Management (MMS)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Brand Marketing Director for Luminary Cosmetics, an emerging luxury clean skincare brand. 

The Chief Executive Officer (the judge) has secured a prestigious retail agreement to launch Luminary’s breakthrough botanical anti-aging serum into 400 Sephora stores nationwide and on Sephora.com. 

With a $250,000 launch budget, the CEO expects the product to achieve "Top 3 Skincare New Release" velocity within the first 60 days. However, the prestige skincare market is intensely crowded, and legacy cosmetic giants spend millions on celebrity endorsements.

You must present an omnichannel launch and retail activation strategy:
1. Orchestrate "The 14-Day Blind Skincare Challenge": Gift 200 unbranded clinical sample vials to licensed estheticians and dermatology content creators on TikTok/Instagram, generating authentic organic hype before revealing the Luminary brand.
2. Negotiate premier Sephora front-of-store endcap displays and design an interactive beauty advisor incentive contest ("Luminary Glow Spiff") with product education webinars.
3. Deploy an augmented reality (AR) skin-tone analyzer and custom routine quiz on Sephora.com and TikTok with instant product basket integration.
4. Establish an automated post-purchase replenishment lifecycle campaign (SMS/Email auto-replenish reminders at Day 45 with a 15% subscriber discount) to maximize Customer Lifetime Value (CLV).`,
    clientProblem: 'Launching a new prestige clean skincare line across 400 Sephora stores on a $250K budget, competing against legacy brands through creator credibility and retail co-op merchandising.',
    constraints: [
      'Total omnichannel marketing budget is capped at $250,000.',
      'Sephora retail margin agreement requires a minimum 52% wholesale discount structure.',
      'Product must achieve a minimum sell-through velocity of 18 units per store per week.',
    ],
    performanceIndicators: [
      { 
        code: 'MK:014', 
        description: 'Formulate an omnichannel cosmetic product launch strategy integrating retail endcaps and digital creator marketing.', 
        guidelines: 'Synchronize physical in-store Sephora endcaps with synchronized social media creator reveals and digital sampling.' 
      },
      { 
        code: 'RM:005', 
        description: 'Design retail co-op merchandising displays, beauty advisor training protocols, and point-of-sale visual merchandising.', 
        guidelines: 'Incentivize 2,000 Sephora beauty advisors with free full-size product gratis and tiered monthly commission spiffs for verified sales.' 
      },
      { 
        code: 'PR:008', 
        description: 'Execute creator-led viral product sampling ("Blind Clinical Challenge") measuring ROAS and user-generated content volume.', 
        guidelines: 'Demonstrate how blind dermatologist reviews establish scientific credibility, driving a projected 4.5x Return on Ad Spend (ROAS).' 
      },
      { 
        code: 'SM:001', 
        description: 'Present a comprehensive promotional launch budget, sales velocity targets (units/store/week), and replenishment lifecycle roadmap.', 
        guidelines: 'Deliver a complete budget allocation ($100K Sephora Endcaps, $80K Influencer/PR, $45K Digital Ads/AR, $25K Advisor Incentives) with a 60-day milestone timeline.' 
      },
    ],
  },
  {
    id: 'cs-mkt-07',
    title: 'Apex Urban Mobility: B2B Enterprise Corporate E-Bike Fleet Marketing & ESG Sustainability Positioning',
    category: 'Marketing / Business-to-Business (B2B) Marketing / Principles of Marketing (PMK)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Director of B2B Marketing & Commercial Partnerships for Apex Urban Mobility, a manufacturer of commercial electric cargo bikes and enterprise commuter fleets. 

The Chief Commercial Officer (the judge) wants to scale beyond consumer retail by launching a dedicated B2B enterprise program targeting Fortune 500 corporate headquarters, university campuses, and urban last-mile delivery fleets. 

Enterprises are facing increasing stakeholder pressure to meet stringent ESG (Environmental, Social, and Governance) carbon reduction mandates, while corporate employees are demanding flexible, eco-friendly commuter campus transit options.

You must present a comprehensive B2B marketing and consultative sales strategy:
1. Develop an Account-Based Marketing (ABM) campaign targeting Corporate Sustainability Officers (CSOs), Facility Directors, and HR Benefits Leaders at 250 top regional employers.
2. Build a high-converting digital thought-leadership funnel: publish proprietary whitepapers ("The Net-Zero Campus: Decarbonizing Corporate Transit") and an interactive web-based "Corporate Carbon & Fuel Savings Calculator".
3. Structure a flexible "Mobility-as-a-Service" (MaaS) subscription package including turnkey smart charging docks, automated fleet management software, maintenance warranties, and geofenced employee mobile apps.
4. Execute on-site "Clean Commute Demo Days" where corporate executives and employees test-ride e-bikes on campus with free artisan coffee and sustainable giveaways.`,
    clientProblem: 'Positioning Apex e-bike fleets as an enterprise B2B ESG solution, generating qualified sales pipeline leads among corporate sustainability and HR leaders.',
    constraints: [
      'B2B launch budget is $80,000 for digital ABM ads, industry trade conferences, and demo fleets.',
      'Target sales cycle must convert enterprise leads from initial demo to signed fleet contract within 90 days.',
      'Fleet package must demonstrate verifiable Scope 1 emissions reductions for corporate ESG reporting.',
    ],
    performanceIndicators: [
      { 
        code: 'MK:018', 
        description: 'Develop B2B customer segmentation, buyer personas (ESG Officers vs. Fleet Operations Managers), and consultative value propositions.', 
        guidelines: 'Tailor messaging: For CSOs, emphasize verifiable Scope 1 carbon offsets; for Operations, emphasize 45% last-mile delivery cost reduction compared to cargo vans.' 
      },
      { 
        code: 'PR:012', 
        description: 'Design an Account-Based Marketing (ABM) campaign utilizing LinkedIn Sponsored Content, executive whitepapers, and targeted direct outreach.', 
        guidelines: 'Target 250 verified enterprise accounts with personalized direct mailers containing custom fleet financial savings pro formas.' 
      },
      { 
        code: 'SE:045', 
        description: 'Create a consultative B2B sales enablement toolkit: Total Cost of Ownership (TCO) calculators and carbon offset audit reports.', 
        guidelines: 'Demonstrate that an Apex e-bike fleet pays for itself in 14 months through eliminated parking facility subsidies and reduced fuel expense.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present a complete B2B marketing budget, pipeline lead conversion targets (MQL to SQL to Closed-Won), and customer acquisition metrics.', 
        guidelines: 'Project pipeline: 250 target accounts -> 45 Demo Days -> 18 enterprise contracts generated in Year 1 ($1.2M pipeline revenue).' 
      },
    ],
  },
  {
    id: 'cs-mkt-08',
    title: 'Horizon Artisan Coffee: Direct-to-Consumer (DTC) Subscription Churn Reduction & Predictive AI Personalization',
    category: 'Marketing / E-Commerce & Direct Marketing / Marketing Management Series (MMS)',
    timeLimitMinutes: 15,
    scenarioText: `You are the Chief Growth & Marketing Officer for Horizon Artisan Coffee, an e-commerce subscription roaster delivering ethically sourced single-origin coffee to 35,000 monthly subscribers. 

The Founder and CEO (the judge) is alarmed that monthly subscriber churn has spiked from 4.2% to 8.9% over the past two quarters. Despite spending $120,000/month on digital customer acquisition (Facebook/Instagram/Google Ads), the rising churn is severely depressing Customer Lifetime Value (CLV to CAC ratio has fallen from 4.1x to 1.9x). 

Post-cancellation customer exit surveys reveal:
- 42% of subscribers felt they accumulated too much coffee and couldn't easily pause or slow down deliveries.
- 31% were dissatisfied receiving roasts that didn't match their preferred brewing method (e.g., receiving light roasts when they make French press dark roasts).
- 18% left for competing discount promotional offers.

You must present an end-to-end customer retention, churn reduction, and lifecycle re-engagement strategy:
1. Implement a 60-second interactive "Brewing & Roast Profiler" onboarding quiz that dynamically customizes recurring shipments based on customer taste notes and equipment.
2. Eliminate cancellation friction by introducing flexible self-serve subscription controls: "Skip This Delivery", "Adjust Frequency (1, 2, 3, or 4 weeks)", and "Swap Roast Flavor with 1-Click SMS".
3. Launch the "Roaster’s Reserve VIP Loyalty Tier" offering exclusive micro-lot tasting flights, free member-only brewing webinars, and anniversary appreciation gifts.
4. Deploy automated predictive churn interventions (e.g. detecting when a customer hasn't rated their roast or logged in for 45 days, automatically triggering a complimentary cold-brew sample or personalized check-in email).`,
    clientProblem: 'E-commerce subscription churn escalated to 8.9%, eroding subscriber lifetime value and customer acquisition payback periods.',
    constraints: [
      'Retention tech stack and loyalty budget is capped at $45,000.',
      'Goal is reducing monthly churn from 8.9% below 4.5% within 90 days.',
      'Turnaround must recover at least $350,000 in annualized recurring subscription revenue (ARR).',
    ],
    performanceIndicators: [
      { 
        code: 'MK:019', 
        description: 'Analyze e-commerce subscription metrics: Monthly Recurring Revenue (MRR), Churn Rate, Cohort Retention Curves, and CLV to CAC ratios.', 
        guidelines: 'Demonstrate how reducing churn from 8.9% to 4.5% extends average subscriber lifespan from 11 months to 22 months, doubling Customer Lifetime Value from $330 to $660.' 
      },
      { 
        code: 'PM:018', 
        description: 'Develop customer onboarding, personalized product recommendations, and friction-reducing subscription management features.', 
        guidelines: 'Explain how the taste-profiling quiz and self-serve skip/pause options resolve the top two drivers of voluntary subscriber cancellation.' 
      },
      { 
        code: 'PR:020', 
        description: 'Design automated lifecycle retention workflows: SMS re-engagement, win-back discounts, and anniversary appreciation gifts.', 
        guidelines: 'Set up automated SMS triggers ("Running low on beans? Text REFILL to ship early or SKIP to delay 1 week") achieving a 92% open rate.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present a quantifiable 90-day retention roadmap projecting churn reduction and revenue recovery.', 
        guidelines: 'Deliver an executive retention plan showing an ROI of over 700% on the $45,000 retention investment by preserving 1,500 subscribers per month.' 
      },
    ],
  },

  // ==========================================
  // 4. BUSINESS MANAGEMENT & ADMINISTRATION SECTOR (BSM / HRM / BLTDM / PBM)
  // ==========================================
  {
    id: 'cs-bma-01',
    title: 'Titan Industrial Valves: Global Supply Chain Disruption, Force Majeure & Dual-Sourcing Transition',
    category: 'Business Management / Business Services Operations (BSM) / Principles of Management',
    timeLimitMinutes: 15,
    scenarioText: `You are the Director of Global Procurement & Supply Chain for Titan Industrial Valves, a precision manufacturer supplying municipal water authorities, energy utilities, and chemical plants. 

The Chief Operating Officer (the judge) calls an emergency executive crisis meeting: your primary overseas foundry in East Asia (which manufactures 80% of Titan’s specialized stainless-steel valve castings) has officially declared Force Majeure due to sudden severe port strikes and export embargoes, halting all outbound maritime shipments for at least 90 days. 

Titan has only 18 days of raw casting safety stock remaining at its domestic assembly plant. If assembly lines halt, Titan faces $45,000 per week in contractual late-delivery penalties and risks losing a $3.2M multi-year municipal water contract.

You must present an emergency operational continuity and dual-sourcing roadmap:
1. Conduct an immediate audit of qualified domestic and nearshore (Mexico/Canada) foundries capable of producing precision sand-castings on short notice.
2. Negotiate expedited short-run tooling contracts and analyze unit cost variance (domestic castings cost 28% more per unit, but eliminate 45-day ocean shipping lead times).
3. Manage commercial customer contracts: review Force Majeure clauses, prioritize high-margin Tier 1 orders, and issue transparent milestone delivery schedules.
4. Establish a permanent "China+1" dual-sourcing framework with dynamic buffer stock modeling to prevent future single-point supply vulnerabilities.`,
    clientProblem: 'Primary overseas supplier declared Force Majeure with only 18 days of safety stock remaining, threatening factory shutdowns and major contractual breach penalties.',
    constraints: [
      'Titan has $180,000 in emergency operational cash reserves for expedited tooling and air-freight.',
      'Domestic foundries require 14 days to test and calibrate mold tooling before initial production runs.',
      'Customer delivery commitments must be fulfilled within 45 days to avoid contract cancellation.',
    ],
    performanceIndicators: [
      { 
        code: 'OP:015', 
        description: 'Formulate supply chain risk mitigation, buffer stock modeling, and supplier redundancy protocols.', 
        guidelines: 'Establish a permanent dual-sourcing rule (60% low-cost offshore / 40% reliable nearshore) and increase minimum safety stock from 18 to 45 days.' 
      },
      { 
        code: 'BL:002', 
        description: 'Interpret commercial contract terms: Force Majeure clauses, liquidated damages, and breach notification obligations.', 
        guidelines: 'Review customer purchase agreements, issue formal 48-hour delivery delay notices under commercial law, and negotiate penalty waivers with municipal clients.' 
      },
      { 
        code: 'FI:064', 
        description: 'Analyze cost variances: domestic premium casting costs vs. international freight savings and delayed order penalties.', 
        guidelines: 'Demonstrate that paying a 28% premium for domestic castings ($36,000 total variance) prevents $180,000 in customer breach penalties and protects $3.2M in annual revenue.' 
      },
      { 
        code: 'SM:001', 
        description: 'Deliver a high-impact 90-day operational continuity plan to executive management.', 
        guidelines: 'Present a phased 4-stage crisis timeline: Days 1-15 Tooling & Nearshore Ramp, Days 16-45 Priority Assembly, Days 46-75 Customer Delivery, Days 76-90 Dual-Source Standardization.' 
      },
    ],
  },
  {
    id: 'cs-bma-02',
    title: 'Nexus Enterprise Software: Return-to-Office (RTO) Policy Transition, Employee Retention & Output KPIs',
    category: 'Business Management / Human Resources Management Series (HRM) / Principles of Management',
    timeLimitMinutes: 15,
    scenarioText: `You are the Vice President of People Operations & Human Resources for Nexus Cloud, a 450-person B2B enterprise software company. 

The Chief Executive Officer (the judge) recently issued a company-wide memo mandating a strict 4-day-per-week Return-to-Office (RTO) policy after 3 years of 100% remote flexibility. The announcement has triggered severe organizational backlash:
- Within 48 hours, 42 senior software developers and product designers (including 3 lead cloud architects) signed an open petition threatening collective resignation within 30 days.
- Anonymous employee ratings on Glassdoor plummeted from 4.6 to 3.1, harming active recruitment pipelines.
- Several high-performing parents and long-distance commuters expressed deep distress over sudden child-care and 90-minute commute costs.

The CEO is deeply worried about losing top engineering talent to fully remote competitors, but firmly believes in-person whiteboarding and cross-functional serendipity are vital for upcoming AI product launches. You must present a balanced, data-driven hybrid workplace compromise that preserves culture, rebuilds trust, and retains top talent.`,
    clientProblem: 'Severe employee rebellion and impending mass executive resignations triggered by an abrupt mandatory 4-day Return-to-Office mandate.',
    constraints: [
      'Nexus has 2 major enterprise software releases scheduled in 4 months; losing key engineers would delay launches and jeopardize $4.5M in ARR.',
      'Company holds a 5-year commercial lease on its downtown headquarters costing $120,000/month.',
      'Compromise policy must be implemented across all 6 corporate departments within 14 days.',
    ],
    performanceIndicators: [
      { 
        code: 'HR:356', 
        description: 'Formulate progressive employee retention strategies and talent acquisition risk mitigation.', 
        guidelines: 'Propose a flexible "Core Collaboration Days" hybrid model (2 designated in-office days for sprint planning and cross-team workshops, 3 remote deep-work days).' 
      },
      { 
        code: 'HR:410', 
        description: 'Mediate executive-employee policy conflicts and design modern hybrid work agreements.', 
        guidelines: 'Conduct open-door listening townhalls, provide 60-day transitional grace periods, and institute formal remote accommodation request protocols.' 
      },
      { 
        code: 'EI:015', 
        description: 'Apply empathetic change management communication frameworks that rebuild organizational trust.', 
        guidelines: 'Coach the CEO to deliver an authentic, humble video address acknowledging employee feedback and framing the revised policy as a collaborative compromise.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present an objective HR framework measuring engineering output/velocity rather than physical desk presence.', 
        guidelines: 'Establish transparent Key Performance Indicators (sprint velocity, code review turnaround time, customer ticket resolution) rather than badge-swipe tracking.' 
      },
    ],
  },
  {
    id: 'cs-bma-03',
    title: 'Veritas Biopharmaceuticals: Cold-Chain Audit Anomaly, FDA Whistleblower Ethics & Regulatory Compliance',
    category: 'Business Management / Business Law and Ethics Team Decision Making (BLTDM) / Human Resources',
    timeLimitMinutes: 15,
    scenarioText: `You are the Chief Compliance & Ethics Officer at Veritas Biopharmaceuticals, a commercial life sciences manufacturer. 

During an internal pre-audit inspection, a junior quality control technician discreetly approaches you with verified digital data logs: during a weekend power surge, temperature data-loggers in Warehouse Cold Room B recorded temperatures exceeding the mandatory 2°C - 8°C cold-chain specification for 14 consecutive hours. 

The cold room contained a $4,200,000 production lot of pediatric vaccines scheduled for international shipment on Wednesday. 

The Plant Production Director (the judge) urges you to classify the temperature spike as a "minor sensor calibration glitch" and omit it from the upcoming mandatory FDA audit report. The Director argues that internal accelerated stability test models suggest the vaccines are "almost certainly still 99% potent" and that quarantine and disposal would cause a catastrophic $4.2M financial write-off, missing quarterly Wall Street earnings guidance and triggering layoffs.

You must navigate this high-stakes legal, medical, and ethical crisis, uphold patient safety above all else, enforce FDA Good Manufacturing Practice (cGMP) regulations, protect the junior whistleblower from retaliation, and present an uncompromising executive action plan.`,
    clientProblem: 'Plant director pressuring compliance officer to conceal a $4.2M pediatric vaccine cold-chain failure from federal FDA regulators to avoid financial loss.',
    constraints: [
      'FDA regulations mandate immediate quarantine and documented Out-of-Specification (OOS) investigations for all temperature excursions.',
      'Federal Sarbanes-Oxley (SOX) and Whistleblower Protection laws strictly forbid any retaliation against reporting employees.',
      'Patient health and public safety cannot be compromised under any circumstances.',
    ],
    performanceIndicators: [
      { 
        code: 'BL:001', 
        description: 'Explain federal regulatory compliance mandates (FDA/cGMP) and legal obligations for product defect disclosures.', 
        guidelines: 'State unequivocally that falsifying regulatory audit logs carries severe federal criminal liability, FDA consent decrees, and total brand destruction.' 
      },
      { 
        code: 'ET:001', 
        description: 'Apply ethical decision-making frameworks under intense executive financial pressure to protect public health.', 
        guidelines: 'Demonstrate ethical fortitude by immediately placing the $4.2M vaccine lot on mandatory quarantine hold pending comprehensive laboratory potency testing.' 
      },
      { 
        code: 'HR:356', 
        description: 'Establish anti-retaliation whistleblower protections, psychological safety, and confidential reporting channels.', 
        guidelines: 'Formalize confidential whistleblower safeguards for the technician, commend their vigilance, and ensure zero workplace hostility or adverse career actions.' 
      },
      { 
        code: 'SM:001', 
        description: 'Deliver a decisive crisis management roadmap to the executive board upholding ethical compliance over short-term earnings.', 
        guidelines: 'Present an executive plan: Immediate Lot Quarantine, Transparent FDA Notification, Secondary Generator Engineering Upgrades, and Transparent Investor Communications.' 
      },
    ],
  },
  {
    id: 'cs-bma-04',
    title: 'SwiftPack Regional Fulfillment Hub: Lean Six Sigma 5S Bottleneck Removal & Warehouse Error Reduction',
    category: 'Business Management / Business Services Operations (BSM) / Operations Management',
    timeLimitMinutes: 15,
    scenarioText: `You are the Continuous Improvement & Operations Manager at SwiftPack's 250,000 sq ft regional e-commerce distribution center. 

The Hub General Manager (the judge) reveals that during the recent peak holiday shipping quarter, customer order pick-and-pack errors skyrocketed to 4.8% (costing the company $145,000 in return shipping freight, restocking, and customer appeasement credits). Furthermore, average order fulfillment cycle time surged from 32 minutes to 68 minutes, creating a severe 3-day backlog of unfulfilled customer orders.

A comprehensive floor audit reveals:
- Cluttered packing stations with unstandardized tool locations, missing tape dispensers, and mixed box sizes causing frequent worker hesitation.
- High-velocity holiday SKUs (top 20% of bestsellers) were slotted in the farthest corners of the warehouse, forcing pickers to walk an unnecessary 8.5 miles per shift.
- Overworked packaging staff experienced severe fatigue during 10-hour shifts, leading to mislabeled shipping labels.

You must present a Lean Six Sigma operational overhaul utilizing the 5S workplace methodology (Sort, Set in order, Shine, Standardize, Sustain), dual-scan barcode verification, ergonomic workstation redesign, and dynamic warehouse slotting.`,
    clientProblem: 'High packing error rates (4.8%) and order fulfillment cycle times ballooning to 68 minutes, causing $145,000 in operational waste and customer dissatisfaction.',
    constraints: [
      'Turnaround implementation budget is $40,000 for barcode scanners, mobile carts, and ergonomic matting.',
      'Warehouse operations cannot be shut down during the 30-day process improvement rollout.',
      'Target is reducing packing errors below 0.5% and restoring cycle time under 30 minutes before next quarter.',
    ],
    performanceIndicators: [
      { 
        code: 'OP:015', 
        description: 'Apply Lean Six Sigma methodology, 5S workspace standardization, and root-cause DMAIC problem solving.', 
        guidelines: 'Execute 5S principles at all 30 packing stations: standardizing tape, bubble wrap, and barcode guns in identical ergonomic locations.' 
      },
      { 
        code: 'OP:045', 
        description: 'Optimize warehouse inventory slotting, conveyor workflow routing, and cycle time metrics.', 
        guidelines: 'Re-slot high-velocity Category A SKUs adjacent to main packing conveyor lines, cutting picker walking distance by 60%.' 
      },
      { 
        code: 'HR:356', 
        description: 'Design employee ergonomic safety, error-proofing (Poka-Yoke) protocols, and accuracy bonus incentives.', 
        guidelines: 'Introduce dual-scan barcode verification (cannot print shipping label unless UPC matches order) and a monthly $200 zero-error team bonus.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present a quantifiable operational turnaround plan with measurable ROI and milestone tracking.', 
        guidelines: 'Demonstrate that spending $32,000 on 5S and scanning hardware recovers $145,000 in error costs in less than 4 months (350% ROI).' 
      },
    ],
  },
  {
    id: 'cs-bma-05',
    title: 'AeroDynamics Systems: Post-Merger Corporate Restructuring, Culture Integration & Change Management',
    category: 'Business Management / Human Resources Management (HRM) / Business Services Operations',
    timeLimitMinutes: 15,
    scenarioText: `You are the Director of Organizational Development & Human Resources at AeroDynamics Systems following a $1.8 Billion merger between AeroTech (a fast-moving, non-hierarchical drone startup) and Dynamics Corp (a legacy 60-year-old defense contractor with unionized manufacturing plants and strict chain-of-command bureaucracy). 

The Executive Vice President of Integration (the judge) is grappling with acute organizational paralysis:
- Legacy Dynamics managers complain that incoming AeroTech engineers are "reckless, bypass formal documentation protocols, and ignore quality control sign-offs."
- AeroTech engineers complain that Dynamics bureaucracy is "suffocating, requiring 8 levels of email approvals for simple software pushes, crushing innovation."
- Cross-functional project teams are missing critical aerospace milestone deadlines due to passive-aggressive communication and territorial infighting.
- Furthermore, the board has mandated a 12% consolidation of redundant corporate overhead departments (Finance, HR, Legal, IT) within 90 days.

You must present a comprehensive Post-Merger Integration (PMI) change management roadmap, a fair and transparent voluntary severance/redeployment program, and cross-functional cultural alignment initiatives.`,
    clientProblem: 'Severe cultural clashes, managerial territorial warfare, and communication breakdowns paralyzing an aerospace enterprise following a $1.8B corporate merger.',
    constraints: [
      'Merger synergy plan requires cutting $15M in redundant overhead expenses within 6 months.',
      'Union collective bargaining agreements and non-union employment laws must be strictly honored.',
      'Key engineering talent retention rate must stay above 90% during the restructuring.',
    ],
    performanceIndicators: [
      { 
        code: 'HR:410', 
        description: 'Design post-merger integration (PMI) frameworks, organizational restructuring, and cultural alignment programs.', 
        guidelines: 'Formulate a unified operating philosophy combining AeroTech’s agile rapid-prototyping with Dynamics Corp’s rigorous aerospace safety checks.' 
      },
      { 
        code: 'HR:356', 
        description: 'Manage workforce consolidation, voluntary severance packages, and talent redeployment ethically and legally.', 
        guidelines: 'Offer generous voluntary early retirement and internal redeployment programs with career outplacement services before conducting involuntary cuts.' 
      },
      { 
        code: 'EI:005', 
        description: 'Establish empathetic internal communications and cross-functional change management rituals.', 
        guidelines: 'Launch bi-weekly cross-pollination "Innovation Showcases", co-located project squads, and executive fireside Q&A sessions to dissolve suspicion.' 
      },
      { 
        code: 'SM:001', 
        description: 'Present a 180-day change management milestone schedule with clear KPI retention benchmarks.', 
        guidelines: 'Establish clear milestones: Day 30 Culture Charters, Day 60 Department Consolidation, Day 90 Unified Tooling, Day 180 Cross-Team Milestone Reviews.' 
      },
    ],
  },
];
