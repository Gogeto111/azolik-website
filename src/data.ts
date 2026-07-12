export const DEPARTMENTS = [
  {
    id: 'support',
    name: 'Support',
    tagline: 'Resolves tickets, handles refunds, answers questions — 24/7, with genuine care.',
    hex: '#4fd1c5',
    tasks: [
      'Reply to customer messages on WhatsApp, email, and chat',
      'Process returns and issue refund confirmations',
      'Answer product questions with up-to-date inventory data',
      'Escalate complex cases with full context attached',
      'Log every interaction to CRM automatically',
    ],
    integrations: ['WhatsApp Business', 'Gmail', 'Intercom', 'Zendesk', 'Shopify'],
    workflow: [
      'Customer sends a message',
      'Support reads history and product data',
      'Drafts a personalised reply in your brand voice',
      'Sends response — or flags for human review if needed',
    ],
    stat: '24/7',
    statLabel: 'always active',
  },
  {
    id: 'sales',
    name: 'Sales',
    tagline: 'Qualifies leads, writes outreach, follows up, and books meetings automatically.',
    hex: '#a78bfa',
    tasks: [
      'Research and score inbound leads against your ICP',
      'Write personalised cold emails referencing real context',
      'Send multi-touch follow-up sequences automatically',
      'Book discovery calls directly into your calendar',
      'Update CRM pipeline after every touchpoint',
    ],
    integrations: ['HubSpot', 'Salesforce', 'Calendly', 'LinkedIn', 'Gmail'],
    workflow: [
      'New lead enters the pipeline',
      'Sales researches company and identifies hook',
      'Sends personalised outreach with tailored subject line',
      'Follows up 3× over 10 days, stops on reply',
    ],
    stat: 'Auto',
    statLabel: 'lead follow-up',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    tagline: 'Builds campaigns, writes copy, and grows your audience across every channel.',
    hex: '#fb923c',
    tasks: [
      'Write SEO blog posts and social media content',
      'Plan and schedule full content calendars',
      'Draft email campaigns with subject-line variants',
      'Analyse campaign performance and suggest changes',
      'Repurpose long-form content into social snippets',
    ],
    integrations: ['Mailchimp', 'Buffer', 'Notion', 'WordPress', 'Airtable'],
    workflow: [
      'You describe the goal or product update',
      'Marketing builds a content plan for the week',
      'Drafts copy for every channel simultaneously',
      'Schedules and publishes — you approve optional review',
    ],
    stat: 'Multi',
    statLabel: 'channel publishing',
  },
  {
    id: 'finance',
    name: 'Finance',
    tagline: 'Tracks expenses, reconciles accounts, and surfaces insights before they hurt.',
    hex: '#34d399',
    tasks: [
      'Categorise and reconcile transactions daily',
      'Generate weekly and monthly P&L summaries',
      'Flag unusual expenses and duplicate charges',
      'Match invoices to payments automatically',
      'Prepare data export for your accountant',
    ],
    integrations: ['QuickBooks', 'Stripe', 'Xero', 'Mercury', 'Notion'],
    workflow: [
      'New transaction hits your account',
      'Finance categorises and tags it instantly',
      'Checks against budget and flags anomalies',
      'Updates your weekly dashboard in real time',
    ],
    stat: 'Daily',
    statLabel: 'reconciliation',
  },
  {
    id: 'operations',
    name: 'Operations',
    tagline: 'Coordinates vendors, manages schedules, and keeps everything running smoothly.',
    hex: '#60a5fa',
    tasks: [
      'Coordinate vendor communications and follow-ups',
      'Manage and update project timelines',
      'Automate recurring admin and compliance tasks',
      'Send internal status updates and summaries',
      'Optimise workflows by spotting bottlenecks',
    ],
    integrations: ['Slack', 'Notion', 'Linear', 'Jira', 'Google Calendar'],
    workflow: [
      'New project or task lands in your system',
      'Operations breaks it into steps with owners',
      'Sends reminders and chases blockers automatically',
      'Reports progress daily — you only see exceptions',
    ],
    stat: 'Auto',
    statLabel: 'task coordination',
  },
  {
    id: 'hr',
    name: 'HR',
    tagline: 'Screens candidates, onboards hires, and keeps your team running smoothly.',
    hex: '#f472b6',
    tasks: [
      'Screen CVs and score candidates against your criteria',
      'Schedule interviews and send calendar invites',
      'Send onboarding checklists to new hires',
      'Track leave requests and flag conflicts',
      'Remind team of reviews and compliance deadlines',
    ],
    integrations: ['Greenhouse', 'Slack', 'Google Calendar', 'Notion', 'DocuSign'],
    workflow: [
      'Application arrives in your inbox or ATS',
      'HR scores it against your job brief',
      'Sends a screening email to top candidates',
      'Books interviews and preps briefing docs for you',
    ],
    stat: 'Auto',
    statLabel: 'candidate screening',
  },
]

export const TIMELINE_STEPS = [
  {
    num: '01',
    title: 'Describe your business',
    body: 'Tell us what you do, how you work, and what tasks eat your time. Takes under 5 minutes.',
  },
  {
    num: '02',
    title: 'We staff your team',
    body: 'AzoliK deploys purpose-built AI agents for each department — pre-trained on your industry and brand voice.',
  },
  {
    num: '03',
    title: 'Your workforce operates',
    body: 'Your AI team handles tasks autonomously, escalating to you only when a human decision is genuinely needed.',
  },
  {
    num: '04',
    title: 'You focus on vision',
    body: 'Review a clean dashboard, approve key decisions, and spend your energy on what only you can do.',
  },
]

export const INDUSTRIES = [
  {
    name: 'E-commerce',
    text: "Support handles returns 24/7. Marketing runs product launches. Finance reconciles Shopify payouts. Operations coordinates fulfilment partners. You ship products — AzoliK runs the business behind them.",
  },
  {
    name: 'Legal',
    text: "Support triages client enquiries and books consultations. Finance tracks billable hours and chases invoices. HR manages associate scheduling. You focus on client work — not the business that surrounds it.",
  },
  {
    name: 'Healthcare',
    text: "Support answers appointment questions and sends reminders. Operations coordinates clinic scheduling. Finance tracks insurance claims and flags discrepancies. You care for patients — we handle everything else.",
  },
  {
    name: 'Real Estate',
    text: "Sales researches and qualifies buyer leads. Support answers listing enquiries immediately. Marketing creates property content and social posts. Operations keeps deal timelines on track. You close — we handle the pipeline.",
  },
  {
    name: 'Consulting',
    text: "Sales follows up with warm leads and books intro calls. Marketing builds thought-leadership content. Finance tracks retainers and sends invoices. Operations keeps project deliverables on schedule.",
  },
  {
    name: 'Restaurants',
    text: "Support handles reservations and customer messages. Marketing builds campaigns around seasonal specials. Finance tracks daily revenue and flags unusual variances. Operations manages supplier communications.",
  },
]

export const INTEGRATIONS = [
  { name: 'Slack', hex: '#4a154b', i: 'Sl' },
  { name: 'HubSpot', hex: '#ff7a59', i: 'Hs' },
  { name: 'Notion', hex: '#ffffff', i: 'No' },
  { name: 'Gmail', hex: '#ea4335', i: 'Gm' },
  { name: 'Stripe', hex: '#635bff', i: 'St' },
  { name: 'Shopify', hex: '#96bf48', i: 'Sh' },
  { name: 'Salesforce', hex: '#00a1e0', i: 'Sf' },
  { name: 'Zapier', hex: '#ff4a00', i: 'Za' },
  { name: 'Intercom', hex: '#1f8ded', i: 'Ic' },
  { name: 'Linear', hex: '#5e6ad2', i: 'Li' },
  { name: 'Jira', hex: '#0052cc', i: 'Ji' },
  { name: 'Airtable', hex: '#18bfff', i: 'At' },
  { name: 'Mailchimp', hex: '#ffe01b', i: 'Mc' },
  { name: 'Calendly', hex: '#006bff', i: 'Ca' },
  { name: 'QuickBooks', hex: '#2ca01c', i: 'QB' },
  { name: 'WhatsApp', hex: '#25d366', i: 'WA' },
  { name: 'Twilio', hex: '#f22f46', i: 'Tw' },
  { name: 'DocuSign', hex: '#ffb900', i: 'DS' },
]

export const FEATURES = [
  {
    id: 'always-on',
    title: 'Always on, always working',
    description:
      'AI agents run across every department 24/7. A customer message at midnight, a lead arriving on a Sunday — your workforce never stops.',
    hex: '#4fd1c5',
  },
  {
    id: 'ready-fast',
    title: 'Live in under 48 hours',
    description:
      'Describe your business in plain English. AzoliK configures your AI workforce — trained on your brand, products, and workflows — within two days.',
    hex: '#a78bfa',
  },
  {
    id: 'smart-escalation',
    title: 'Escalates only when it matters',
    description:
      'Your AI handles the volume and flags only genuine edge cases — with full conversation history and a suggested next action attached.',
    hex: '#fb923c',
  },
  {
    id: 'your-stack',
    title: 'Plugs into your existing stack',
    description:
      'Connects to the tools you already use — HubSpot, Gmail, Shopify, Slack, Stripe, and 145+ more. No migration. No disruption.',
    hex: '#34d399',
  },
  {
    id: 'gets-smarter',
    title: 'Gets smarter over time',
    description:
      'Every resolved ticket, closed deal, and processed invoice trains the system on your specific business context, improving accuracy week over week.',
    hex: '#60a5fa',
  },
  {
    id: 'no-engineers',
    title: 'No engineers needed',
    description:
      'Set up and adjust your AI workforce entirely in plain English. If you can describe what needs to happen, AzoliK can do it.',
    hex: '#f472b6',
  },
]

export const PRICING = [
  {
    name: 'Solo',
    monthly: 199,
    annual: 1899,
    description: 'For solopreneurs who need a team but have one brain. Free for 6 months.',
    features: [
      '2 AI Departments of your choice',
      'Up to 500 tasks per month',
      'Email & chat output delivery',
      'Weekly performance digest',
      '50+ standard integrations',
    ],
    cta: 'Start free — 6 months',
    highlighted: false,
    badge: null as string | null,
  },
  {
    name: 'Team',
    monthly: 399,
    annual: 3899,
    description: 'For growing teams that need more hands. 14-day free trial. Coffee not included.',
    features: [
      'All 6 AI Departments',
      'Unlimited tasks',
      'Multi-channel output delivery',
      'Real-time operations dashboard',
      'CRM & full tool suite (150+ apps)',
      'Priority support',
    ],
    cta: 'Start free — 14 days',
    highlighted: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    monthly: null as number | null,
    annual: null as number | null,
    description: 'Custom AI workforce for complex organisations.',
    features: [
      'Custom department builds',
      'Custom task limits & SLAs',
      'White-label options',
      'Dedicated success manager',
      'SSO & compliance controls',
      'Contract flexibility',
    ],
    cta: 'Talk to us',
    highlighted: false,
    badge: null,
  },
]

export const FAQS = [
  {
    q: "Isn't this just a chatbot?",
    a: "No. AzoliK deploys autonomous agents that complete tasks — not a chat interface. Your AI sales department doesn't answer questions; it finds prospects, writes personalised outreach, sends follow-ups, and books meetings into your calendar.",
  },
  {
    q: 'How quickly can I get started?',
    a: 'Most businesses are fully operational within 48 hours. Our onboarding team configures your AI workforce with your brand voice, tools, data, and workflows.',
  },
  {
    q: 'What tools does it connect to?',
    a: 'AzoliK integrates natively with Slack, HubSpot, Notion, Gmail, Stripe, Shopify, Salesforce, and 150+ others via our integration library and Zapier.',
  },
  {
    q: 'Do I need to be technical?',
    a: "Not even slightly. If you can describe what needs to happen, AzoliK can do it. The interface is built for operators and founders — not engineers.",
  },
  {
    q: 'What happens when the AI gets stuck?',
    a: 'Your AI workforce escalates edge cases to you with full context, conversation history, and a suggested next action. You stay in control; the AI handles the volume.',
  },
  {
    q: 'How is this different from hiring?',
    a: 'A single full-time marketing hire costs £60–90k/year. A full AI marketing department with AzoliK costs a fraction of that, works 24/7, never calls in sick, and scales instantly.',
  },
]

export const NAV_LINKS = [
  { label: 'Product', href: '#departments' },
  { label: 'Industries', href: '#industries' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

