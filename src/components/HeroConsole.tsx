import { useEffect, useRef, useState } from 'react';

const SCENARIOS = [
  {
    department: 'Support',
    color: '#4fd1c5',
    customer: 'Do you have this product in blue, size 9?',
    tasks: [
      'Searching inventory database...',
      'Product found in stock · Blue · Size 9 · 3 units',
      'Drafting reply in your brand voice',
      'CRM updated · Ticket resolved',
    ],
    response:
      'Great news! We have this product in blue, size 9 — 3 left in stock. Want me to reserve one for you?',
    time: '2.4s',
    count: 4,
  },
  {
    department: 'Sales',
    color: '#a78bfa',
    customer: "New lead: Hi, I'd like a demo of your platform",
    tasks: [
      'Researching lead profile and company data',
      'Lead scored 94/100 · Buying signals detected on pricing page',
      'Personalised email drafted',
      'Follow-up sequence created · Days 3 and 7',
    ],
    response:
      "Thanks for your interest! I'd love to walk you through how our platform can help your team. When works for a quick 15-minute call?",
    time: '3.1s',
    count: 4,
  },
  {
    department: 'Finance',
    color: '#34d399',
    customer: 'New payment received via Stripe',
    tasks: [
      'Matched to invoice · Payment cleared',
      'Categorised: Revenue · Subscription',
      'Cash position updated',
      'P&L refreshed · Revenue up month-over-month',
    ],
    response: 'Payment reconciled. Invoice marked paid. P&L report ready for your review.',
    time: '1.8s',
    count: 4,
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path
        d="M1.5 4.5L3.8 7L7.5 2.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroConsole() {
  const [idx, setIdx] = useState(0);
  const [customerText, setCustomerText] = useState('');
  const [phase, setPhase] = useState<
    'idle' | 'customer' | 'thinking' | 'tasks' | 'response' | 'stats'
  >('idle');
  const [tasksVisible, setTasksVisible] = useState(0);
  const [responseText, setResponseText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[idx];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [customerText, tasksVisible, responseText, phase]);

  useEffect(() => {
    let cancelled = false;
    const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

    const run = async () => {
      await delay(600);
      if (cancelled) return;
      setCustomerText('');
      setTasksVisible(0);
      setResponseText('');
      setPhase('customer');

      const msg = scenario.customer;
      for (let i = 1; i <= msg.length; i++) {
        await delay(55 + Math.random() * 30);
        if (cancelled) return;
        setCustomerText(msg.slice(0, i));
      }

      await delay(700);
      if (cancelled) return;
      setPhase('thinking');

      await delay(1400);
      if (cancelled) return;
      setPhase('tasks');

      for (let i = 1; i <= scenario.tasks.length; i++) {
        await delay(900 + i * 80);
        if (cancelled) return;
        setTasksVisible(i);
      }

      await delay(800);
      if (cancelled) return;
      setPhase('response');

      const resp = scenario.response;
      for (let i = 1; i <= resp.length; i++) {
        await delay(35 + Math.random() * 20);
        if (cancelled) return;
        setResponseText(resp.slice(0, i));
      }

      await delay(900);
      if (cancelled) return;
      setPhase('stats');

      await delay(5000);
      if (cancelled) return;
      setIdx(prev => (prev + 1) % SCENARIOS.length);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [idx, scenario]);

  const showCustomer = phase !== 'idle' && customerText.length > 0;
  const showThinking = phase === 'thinking';
  const showTasks = ['tasks', 'response', 'stats'].includes(phase);
  const showResponse = ['response', 'stats'].includes(phase) && responseText.length > 0;
  const showStats = phase === 'stats';

  return (
    <div
      className="relative w-full max-w-[520px] rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(10,12,18,0.96)',
        border: `1px solid ${scenario.color}28`,
        boxShadow: `0 0 80px ${scenario.color}10, 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: 'rgba(255,255,255,0.025)',
          borderBottom: `1px solid ${scenario.color}18`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div
                key={c}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: c, opacity: 0.65 }}
              />
            ))}
          </div>
          <span
            className="text-xs font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,255,255,0.4)' }}
          >
            AzoliK · {scenario.department.toLowerCase()}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-badge-pulse"
            style={{ background: scenario.color }}
          />
          <span
            className="text-[10px]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: scenario.color,
              opacity: 0.7,
            }}
          >
            ONLINE
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="p-5 space-y-4 overflow-y-auto"
        style={{ minHeight: '300px', maxHeight: '360px' }}
      >
        {/* Customer message */}
        {showCustomer && (
          <div className="space-y-1.5">
            <span
              className="block text-[10px] text-white/22"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              &gt; customer
            </span>
            <div
              className="text-sm text-white/68 leading-[1.65]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
                padding: '10px 14px',
              }}
            >
              {customerText}
              {phase === 'customer' && (
                <span
                  className="cursor-blink inline-block w-0.5 h-[14px] ml-0.5 align-middle"
                  style={{ background: scenario.color }}
                />
              )}
            </div>
          </div>
        )}

        {/* Thinking */}
        {showThinking && (
          <div className="flex items-center gap-2.5 pl-1">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: scenario.color,
                    opacity: 0.7,
                    animationDelay: `${i * 150}ms`,
                  }}
                />
              ))}
            </div>
            <span
              className="text-[11px]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: scenario.color,
                opacity: 0.6,
              }}
            >
              Analyzing...
            </span>
          </div>
        )}

        {/* Tasks */}
        {showTasks && (
          <div className="space-y-2.5">
            {scenario.tasks.slice(0, tasksVisible).map((task, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5"
                style={{ animation: 'step-in 0.4s var(--ease) both' }}
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `${scenario.color}20`,
                    border: `1px solid ${scenario.color}45`,
                  }}
                >
                  <CheckIcon color={scenario.color} />
                </div>
                <span className="text-[12px] text-white/52 leading-[1.55]">{task}</span>
              </div>
            ))}
          </div>
        )}

        {/* Response */}
        {showResponse && (
          <div className="space-y-1.5" style={{ animation: 'step-in 0.4s var(--ease) both' }}>
            <span
              className="block text-[10px] text-white/22"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              &gt; AzoliK / {scenario.department.toLowerCase()}
            </span>
            <div
              className="text-sm leading-[1.65]"
              style={{
                background: `${scenario.color}0c`,
                border: `1px solid ${scenario.color}28`,
                borderRadius: '10px',
                padding: '10px 14px',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {responseText}
              {phase === 'response' && (
                <span
                  className="cursor-blink inline-block w-0.5 h-[14px] ml-0.5 align-middle"
                  style={{ background: scenario.color }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      {showStats && (
        <div
          className="flex items-center justify-between px-5 py-2.5"
          style={{
            borderTop: `1px solid ${scenario.color}18`,
            animation: 'panel-up 0.4s var(--ease) both',
          }}
        >
          <span
            className="text-[10px]"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: scenario.color,
              opacity: 0.65,
            }}
          >
            ✓ {scenario.count} tasks automated in {scenario.time}
          </span>
          <div className="flex gap-1">
            {SCENARIOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: i === idx ? scenario.color : 'rgba(255,255,255,0.15)',
                  opacity: i === idx ? 1 : 0.5,
                  cursor: 'none',
                }}
                aria-label={`Switch to scenario ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
