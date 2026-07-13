export const NAV_LINKS = [
  { label: 'Automation Agency', href: '#services' },
  { label: 'AI Salesforce', href: '#services' },
  { label: 'Whop Management', href: '#services' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Let\'s Talk', href: '#cta', cta: true },
]

export const SERVICES = [
  {
    id: 'automation-agency',
    title: 'Automation Agency',
    description: 'We create custom automation systems for lead generation, outreach, client onboarding, CRM workflows, and more — built to save you time and scale efficiently.',
    icon: 'Automation',
    color: '#4fd1c5',
  },
  {
    id: 'ai-voice-agent',
    title: 'AI Voice Agent',
    description: 'Our AI-powered voice agents can answer calls, qualify leads, book appointments, and handle support — giving your business a professional voice 24/7.',
    icon: 'Voice',
    color: '#a78bfa',
  },
  {
    id: 'ai-ad-services',
    title: 'AI Ad Services',
    description: 'We design AI-generated ad creatives using custom characters, realistic voices, lip-sync, and editing — optimized to match your brand and drive results.',
    icon: 'Ad',
    color: '#fb923c',
  },
  {
    id: 'whop-management',
    title: 'Whop Management',
    description: 'Run organic, ad-like campaigns with UGC creators and editors through our Whop service — a scalable, cost-effective way to grow with viral content.',
    icon: 'Whop',
    color: '#34d399',
  },
  {
    id: 'ai-customer-support',
    title: 'AI Customer Support',
    description: 'Deploy 24/7 AI customer service agents to manage tickets, answer FAQs, update customers, and store user data — all with unmatched consistency.',
    icon: 'Support',
    color: '#60a5fa',
  },
]

export const FAQS = [
  {
    q: 'What\'s in it for me?',
    a: 'You get a dedicated team of experts across every domain — from high-end editing to fully automated content workflows. We deliver end-to-end solutions tailored to scale your brand, saving you time and maximizing ROI.',
  },
  {
    q: 'What\'s our expertise?',
    a: 'We specialize in automation systems, AI voice agents, AI-generated ad creatives, Whop management for UGC campaigns, and 24/7 AI customer support. Our team has deep experience across content, advertising, and sales automation.',
  },
  {
    q: 'What makes us different?',
    a: 'Unlike traditional agencies, we build systems that run autonomously. You\'re not just buying services — you\'re investing in infrastructure that compounds value over time. We combine human expertise with AI efficiency.',
  },
  {
    q: 'How much do we charge?',
    a: 'Pricing is custom based on your needs and scale. We offer flexible models from project-based to ongoing retainers. Book a call and we\'ll give you a clear quote tailored to your goals — no hidden fees.',
  },
  {
    q: 'What if I need Corrections?',
    a: 'We include revision rounds in every engagement. Our workflows are built for iteration — you review, we refine, until it\'s perfect. For ongoing services, we have built-in feedback loops and QA processes.',
  },
  {
    q: 'Can Azolic manage my social presence?',
    a: 'Yes. Our content management service handles end-to-end social presence — strategy, creation, scheduling, engagement, and analytics across all major platforms. You stay hands-off while we grow your audience.',
  },
]

export const CTA_SERVICES = [
  'YouTube Shorts',
  'YouTube Videos',
  'Instagram Reels',
  'Blog',
  'TikTok',
  'Brandings',
  'Ads',
]

export const FOOTER_LINKS = {
  Product: ['Automation Agency', 'AI Voice Agent', 'AI Ad Services', 'Whop Management', 'AI Customer Support'],
  Company: ['About', 'Careers', 'Blog', 'Press', 'Contact'],
  Resources: ['Documentation', 'FAQs', 'Privacy Policy', 'Terms & Conditions'],
}

export const PRICING = [
  {
    name: 'Solo',
    description: 'Perfect for individual creators',
    monthly: 299,
    annual: 2999,
    badge: null,
    highlighted: false,
    features: [
      '1 AI Agent',
      'Basic automation workflows',
      'Email support',
      '5,000 words/mo',
      'Standard templates',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Team',
    description: 'For growing teams & agencies',
    monthly: 799,
    annual: 6000,
    badge: 'Most Popular',
    highlighted: true,
    features: [
      '5 AI Agents',
      'Advanced automation workflows',
      'Priority support',
      '50,000 words/mo',
      'Custom templates',
      'Team collaboration',
      'Analytics dashboard',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions at scale',
    monthly: null,
    annual: null,
    badge: null,
    highlighted: false,
    features: [
      'Unlimited AI Agents',
      'Full automation suite',
      'Dedicated account manager',
      'Unlimited usage',
      'Custom integrations',
      'SLA guarantee',
      'White-label options',
    ],
    cta: 'Contact Sales',
  },
]

export const SOCIAL_LINKS = [
  { name: 'Email', href: 'mailto:hello@azolik.com', icon: 'Email' },
]

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
    text: "Support handles returns 24/7. Marketing runs product launches. Finance reconciles Shopify payouts. Operations coordinates fulfilment partners.",
  },
  {
    name: 'Legal',
    text: "Support triages client enquiries and books consultations. Finance tracks billable hours and chases invoices. HR manages associate scheduling.",
  },
  {
    name: 'Healthcare',
    text: "Support answers appointment questions and sends reminders. Operations coordinates clinic scheduling. Finance tracks insurance claims.",
  },
  {
    name: 'Real Estate',
    text: "Sales researches and qualifies buyer leads. Support answers listing enquiries immediately. Marketing creates property content.",
  },
  {
    name: 'Consulting',
    text: "Sales follows up with warm leads and books intro calls. Marketing builds thought-leadership content. Finance tracks retainers.",
  },
  {
    name: 'Restaurants',
    text: "Support handles reservations and customer messages. Marketing builds campaigns around seasonal specials. Finance tracks daily revenue.",
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