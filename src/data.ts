export const NAV_LINKS = [
  { label: 'Departments', href: '#departments' },
  { label: 'A Core', href: '#acore' },
  { label: 'How It Works', href: '#howitworks' },
  { label: 'Industries', href: '#industries' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
];

export const SERVICES = [
  {
    id: 'ai-support',
    title: 'AI Support Department',
    description:
      '24/7 autonomous customer support across WhatsApp, email, chat. Resolves tickets, handles refunds, answers questions with your brand voice.',
    icon: 'Support',
    color: '#4fd1c5',
  },
  {
    id: 'ai-sales',
    title: 'AI Sales Department',
    description:
      'Qualifies leads, writes personalized outreach, follows up automatically, books meetings. Your pipeline runs while you sleep.',
    icon: 'Voice',
    color: '#a78bfa',
  },
  {
    id: 'ai-marketing',
    title: 'AI Marketing Department',
    description:
      'Writes SEO content, plans campaigns, drafts emails, analyzes performance, repurposes content across channels. Full-stack marketing, zero headcount.',
    icon: 'Ad',
    color: '#fb923c',
  },
  {
    id: 'ai-finance',
    title: 'AI Finance Department',
    description:
      'Categorizes transactions daily, generates P&L summaries, flags anomalies, matches invoices, prepares accountant-ready exports.',
    icon: 'Whop',
    color: '#34d399',
  },
];

export const FAQS = [
  {
    q: 'What exactly do I get with Azolic?',
    a: 'You get four pre-trained AI departments — Support, Sales, Marketing, Finance — that handle real work autonomously. They connect to your existing tools (Slack, Gmail, HubSpot, QuickBooks, etc.) and start working within 48 hours of onboarding.',
  },
  {
    q: 'Do I need engineers to set this up?',
    a: 'No. Our onboarding team handles the entire setup. You describe your business, we configure the agents, connect your integrations, and deploy. Zero engineering required on your end.',
  },
  {
    q: 'How is this different from hiring a virtual assistant or agency?',
    a: "Virtual assistants and agencies rely on human hours — they're limited by capacity, availability, and cost. Azolic departments are AI agents that work 24/7, scale instantly, and cost a fraction. You're not buying hours; you're buying outcomes.",
  },
  {
    q: 'What tools do the AI departments integrate with?',
    a: 'Each department connects to 15+ tools out of the box: Slack, Gmail, HubSpot, Salesforce, Notion, Linear, QuickBooks, Stripe, Shopify, WhatsApp, Calendly, and more. Custom integrations are available on Enterprise plans.',
  },
  {
    q: 'How does pricing work?',
    a: 'Simple monthly plans: Solo at $299/mo (1 department), Team at $799/mo (4 departments), Enterprise custom. All plans include setup, integrations, and ongoing optimization. Solo gets 6 months free. Team gets 14-day trial. No contracts, cancel anytime.',
  },
  {
    q: 'What if the AI makes a mistake?',
    a: 'Every department has built-in guardrails. For high-stakes actions (refunds, contracts, payments), the AI flags for your approval before executing. You set the autonomy thresholds. Full audit logs are always available.',
  },
  {
    q: 'Can I start with just one department?',
    a: 'Yes. The Solo plan gives you one department of your choice. Most customers start with Support or Sales, then expand as they see results.',
  },
];

export const CTA_SERVICES = [
  'Support Department',
  'Sales Department',
  'Marketing Department',
  'Finance Department',
];

export const FOOTER_LINKS = {
  Product: [
    'Support Dept',
    'Sales Dept',
    'Marketing Dept',
    'Finance Dept',
  ],
  Company: ['About', 'Pricing', 'FAQ', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Changelog', 'Blog'],
};

export const FOOTER_LINK_MAP: Record<string, string> = {
  'Support Dept': '#departments',
  'Sales Dept': '#departments',
  'Marketing Dept': '#departments',
  'Finance Dept': '#departments',
  About: '#problem',
  Pricing: '#pricing',
  FAQ: '#faqs',
  Contact: '#cta',
  Documentation: '/docs',
  'API Reference': '/docs/api',
  Changelog: '/changelog',
  Blog: '/blog',
};

export const PRICING = [
  {
    name: 'Solo',
    description: 'One AI department for solo founders',
    monthly: 299,
    annual: 2990,
    badge: null,
    highlighted: false,
    features: [
      '1 AI Department (your choice)',
      'Up to 10 integrations',
      'Email support',
      '10K tasks/month',
      'Standard response time',
      'Weekly insights report',
    ],
    cta: 'Start 6 Months Free',
  },
  {
    name: 'Team',
    description: 'Full AI workforce for growing teams',
    monthly: 799,
    annual: 6990,
    badge: 'Most Popular',
    highlighted: true,
    features: [
      'All 4 AI Departments',
      'Unlimited integrations',
      'Priority support + Slack channel',
      '100K tasks/month',
      'Fast-track response time',
      'Daily insights + custom alerts',
      'Team collaboration (up to 5 seats)',
      'Custom workflow builder',
    ],
    cta: 'Start 14-Day Trial',
  },
  {
    name: 'Enterprise',
    description: 'Custom deployment for organizations',
    monthly: null,
    annual: null,
    badge: null,
    highlighted: false,
    features: [
      'Unlimited departments & tasks',
      'Dedicated deployment engineer',
      'Custom SLA & uptime guarantees',
      'SSO / SCIM / audit logs',
      'Private cloud / VPC option',
      'Custom model fine-tuning',
      'Unlimited seats',
      'White-glove onboarding',
    ],
    cta: 'Contact Sales',
  },
];

export const SOCIAL_LINKS = [
  { name: 'Twitter', href: 'https://twitter.com/azolic_ai', icon: 'Twitter' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/azolic', icon: 'LinkedIn' },
  { name: 'GitHub', href: 'https://github.com/azolic', icon: 'GitHub' },
  { name: 'Email', href: 'mailto:aarishvimal1@gmail.com', icon: 'Email' },
];

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
      'Drafts a personalized reply in your brand voice',
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
      'Write personalized cold emails referencing real context',
      'Send multi-touch follow-up sequences automatically',
      'Book discovery calls directly into your calendar',
      'Update CRM pipeline after every touchpoint',
    ],
    integrations: ['HubSpot', 'Salesforce', 'Calendly', 'LinkedIn', 'Gmail'],
    workflow: [
      'New lead enters the pipeline',
      'Sales researches company and identifies hook',
      'Sends personalized outreach with tailored subject line',
      'Follows up 3x over 10 days, stops on reply',
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
      'Analyze campaign performance and suggest changes',
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
      'Categorize and reconcile transactions daily',
      'Generate weekly and monthly P&L summaries',
      'Flag unusual expenses and duplicate charges',
      'Match invoices to payments automatically',
      'Prepare data export for your accountant',
    ],
    integrations: ['QuickBooks', 'Stripe', 'Xero', 'Mercury', 'Notion'],
    workflow: [
      'New transaction hits your account',
      'Finance categorizes and tags it instantly',
      'Checks against budget and flags anomalies',
      'Updates your weekly dashboard in real time',
    ],
    stat: 'Daily',
    statLabel: 'reconciliation',
  },
];

export const TIMELINE_STEPS = [
  {
    num: '01',
    title: 'Describe your business',
    body: 'Tell us what you do, how you work, and what tasks eat your time. Takes under 5 minutes.',
  },
  {
    num: '02',
    title: 'We staff your team',
    body: 'Azolic deploys purpose-built AI agents for each department — pre-trained on your industry and brand voice.',
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
];

export const INDUSTRIES = [
  {
    name: 'E-commerce',
    text: 'Support handles returns 24/7. Marketing runs product launches. Finance reconciles Shopify payouts and tracks revenue.',
  },
  {
    name: 'Legal',
    text: 'Support triages client enquiries and books consultations. Finance tracks billable hours and chases invoices.',
  },
  {
    name: 'Healthcare',
    text: 'Support answers appointment questions and sends reminders. Finance tracks insurance claims and billing.',
  },
  {
    name: 'Real Estate',
    text: 'Sales researches and qualifies buyer leads. Support answers listing enquiries immediately. Marketing creates property content.',
  },
  {
    name: 'Consulting',
    text: 'Sales follows up with warm leads and books intro calls. Marketing builds thought-leadership content. Finance tracks retainers.',
  },
  {
    name: 'Restaurants',
    text: 'Support handles reservations and customer messages. Marketing builds campaigns around seasonal specials. Finance tracks daily revenue.',
  },
];

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
];

// Real stats - update these with actual numbers when available
export const STATS = [
  { value: 0, suffix: '+', label: 'Businesses using Azolic', color: '#a78bfa' },
  { value: 0, suffix: '+', label: 'Tasks completed by AI', color: '#4fd1c5' },
  { value: 48, suffix: 'h', label: 'Average deploy time', color: '#fb923c' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', color: '#34d399' },
];

// Placeholder testimonials - replace with real customer quotes when available
export const TESTIMONIALS = [
  {
    quote:
      "We're currently onboarding our first customers. This space will feature real testimonials from teams using Azolic.",
    name: '—',
    role: 'Coming soon',
    metric: '—',
  },
  {
    quote:
      'Early access customers are seeing 80%+ ticket resolution rates and 3x faster response times. Real results coming soon.',
    name: '—',
    role: 'Beta program',
    metric: '—',
  },
  {
    quote:
      'Join the waitlist to be among the first to deploy your AI workforce and share your results.',
    name: '—',
    role: 'Waitlist',
    metric: '—',
  },
];

export const CONTACT_INFO = {
  phone: '+91 9711700199',
  email: 'aarishvimal1@gmail.com',
  phoneHref: 'tel:+919711700199',
  emailHref: 'mailto:aarishvimal1@gmail.com',
};
