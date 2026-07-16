import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionLabel } from '../ui';

const WORKFLOW_STEPS = [
  {
    label: 'Customer Message',
    color: '#4fd1c5',
    short: 'Arrives via email, chat, or WhatsApp',
    detail:
      'A customer asks about blue Nike shoes in size 9. The message lands in your support inbox at 2:47 AM. No human is awake to see it.',
    agents: ['Inbox Monitor', 'Intent Parser'],
    duration: 'Instant',
  },
  {
    label: 'Support Agent',
    color: '#a78bfa',
    short: 'Reads history + interprets intent',
    detail:
      "The support agent reads the customer's full conversation history, identifies this as a product availability question, and determines the right workflow to handle it.",
    agents: ['Context Retriever', 'Intent Classifier'],
    duration: '0.8s',
  },
  {
    label: 'Inventory Check',
    color: '#fb923c',
    short: 'Queries stock database in real time',
    detail:
      'The agent queries your Shopify inventory in real time. Finds Nike Air Max 90 in blue, size 9 — 3 units in stock, located in the main warehouse.',
    agents: ['Inventory Connector', 'Stock Validator'],
    duration: '1.2s',
  },
  {
    label: 'Draft Response',
    color: '#34d399',
    short: 'Writes reply in your brand voice',
    detail:
      "Using your brand guidelines and tone, the agent drafts a warm, helpful response that matches how you'd reply yourself — including an offer to reserve the item.",
    agents: ['Brand Voice Engine', 'Response Composer'],
    duration: '1.4s',
  },
  {
    label: 'Customer Notified',
    color: '#60a5fa',
    short: 'Sent via preferred channel',
    detail:
      "The reply is sent through the customer's preferred channel (email in this case). They receive it before they've even finished their morning coffee.",
    agents: ['Channel Router', 'Delivery Manager'],
    duration: '0.5s',
  },
  {
    label: 'CRM Updated',
    color: '#f472b6',
    short: 'Ticket closed · data logged',
    detail:
      'Ticket #2847 marked resolved. Customer record updated with the interaction. Inventory adjusted. Your dashboard reflects the new state — all automatically.',
    agents: ['CRM Sync', 'Analytics Logger'],
    duration: '0.6s',
  },
];

function WorkflowStep({
  step,
  active,
  done,
  index,
  onClick,
}: {
  step: (typeof WORKFLOW_STEPS)[0];
  active: boolean;
  done: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-4 text-left transition-all duration-500 group w-full"
      style={{ opacity: done || active ? 1 : 0.35, cursor: 'none' }}
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
          style={{
            background: active || done ? `${step.color}22` : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${active || done ? step.color : 'rgba(255,255,255,0.08)'}`,
            color: active || done ? step.color : 'rgba(255,255,255,0.2)',
            boxShadow: active ? `0 0 24px ${step.color}40` : 'none',
            transform: active ? 'scale(1.12)' : 'scale(1)',
          }}
        >
          {done ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7L6.5 10.5L11 4.5"
                stroke={step.color}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>
        {index < WORKFLOW_STEPS.length - 1 && (
          <div
            className="w-px mt-1 transition-all duration-700"
            style={{
              height: 36,
              background: done
                ? `linear-gradient(to bottom, ${step.color}60, ${WORKFLOW_STEPS[index + 1].color}40)`
                : 'rgba(255,255,255,0.07)',
            }}
          />
        )}
      </div>

      <div className="pb-8">
        <div
          className="font-semibold text-sm mb-0.5 transition-colors duration-300"
          style={{
            fontFamily: "'Outfit', sans-serif",
            color: active ? step.color : done ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.3)',
          }}
        >
          {step.label}
        </div>
        <div
          className="text-xs transition-colors duration-300"
          style={{ color: active || done ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.14)' }}
        >
          {step.short}
        </div>
      </div>
    </button>
  );
}

export function WorkflowDemo() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const panelRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(-1);
  const [selectedStep, setSelectedStep] = useState(-1);
  const [hasPlayed, setHasPlayed] = useState(false);
  const playRef = useRef(false);

  // Auto-play when scrolled into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playRef.current) {
          playRef.current = true;
          setCurrentStep(0);
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionRef]);

  // Step progression (only when not manually selected)
  useEffect(() => {
    if (currentStep < 0 || selectedStep >= 0) return;
    if (currentStep >= WORKFLOW_STEPS.length - 1) {
      const t = setTimeout(() => setHasPlayed(true), 4000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrentStep(s => s + 1), 1600);
    return () => clearTimeout(t);
  }, [currentStep, selectedStep]);

  // Display step: manual selection overrides auto-play
  const displayStep = selectedStep >= 0 ? selectedStep : currentStep;
  const step = WORKFLOW_STEPS[displayStep] ?? WORKFLOW_STEPS[0];

  const handleStepClick = (i: number) => {
    setSelectedStep(i);
    setHasPlayed(false);
  };

  const replay = () => {
    playRef.current = true;
    setHasPlayed(false);
    setSelectedStep(-1);
    setCurrentStep(0);
  };

  const onPanelMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) scale3d(1.01, 1.01, 1.01)`;
    el.style.transition = 'transform 0.08s ease';
  };

  const onPanelMouseLeave = () => {
    const el = panelRef.current;
    if (!el) return;
    el.style.transform = '';
    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  return (
    <section ref={sectionRef} id="workflow" className="reveal relative z-10 py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel color="rgba(96,165,250,0.9)">How AzoliK works</SectionLabel>
        <h2
          className="text-center font-bold text-white mb-4"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 'clamp(34px, 5vw, 60px)' }}
        >
          From message to resolved.
        </h2>
        <p className="text-center text-white/38 text-base max-w-md mx-auto mb-16 leading-[1.65]">
          Here's what happens when a customer sends a message — fully autonomous, no human in the
          loop.
          <br />
          <span className="text-white/25 text-sm">Click any step to explore it in detail.</span>
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Workflow steps — clickable */}
          <div>
            {WORKFLOW_STEPS.map((s, i) => (
              <WorkflowStep
                key={s.label}
                step={s}
                active={displayStep === i}
                done={currentStep > i}
                index={i}
                onClick={() => handleStepClick(i)}
              />
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="lg:sticky lg:top-28">
            <div
              ref={panelRef}
              onMouseMove={onPanelMouseMove}
              onMouseLeave={onPanelMouseLeave}
              className="rounded-2xl p-8 transition-all duration-400"
              style={{
                background: 'rgba(12,14,19,0.9)',
                border: `1px solid ${step.color}25`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 60px ${step.color}08`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              key={displayStep}
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: step.color,
                      opacity: 0.6,
                    }}
                  >
                    {selectedStep >= 0
                      ? 'Manual view'
                      : hasPlayed
                        ? 'Completed'
                        : currentStep < 0
                          ? 'Idle'
                          : 'Processing...'}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: step.color }}
                  >
                    step {displayStep + 1} / {WORKFLOW_STEPS.length}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(0, ((displayStep + 1) / WORKFLOW_STEPS.length) * 100)}%`,
                      background: `linear-gradient(90deg, ${step.color}, ${WORKFLOW_STEPS[Math.min(displayStep + 1, WORKFLOW_STEPS.length - 1)].color})`,
                    }}
                  />
                </div>
              </div>

              {/* Step detail — animated */}
              <div style={{ animation: 'step-in 0.35s var(--ease) both' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}40`,
                      boxShadow: `0 0 20px ${step.color}20`,
                    }}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: step.color }}
                    >
                      {String(displayStep + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <div
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Outfit', sans-serif", color: step.color }}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs text-white/30">{step.short}</div>
                  </div>
                </div>

                <p className="text-sm text-white/45 leading-[1.7] mb-6">{step.detail}</p>

                {/* Agents involved */}
                <div className="mb-6">
                  <div
                    className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Agents involved
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {step.agents.map(agent => (
                      <span
                        key={agent}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          background: `${step.color}10`,
                          border: `1px solid ${step.color}25`,
                          color: step.color,
                        }}
                      >
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div
                  className="flex items-center justify-between pt-5 mb-6"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase text-white/25"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Time to complete
                  </span>
                  <span
                    className="font-bold text-sm"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: step.color }}
                  >
                    {step.duration}
                  </span>
                </div>
              </div>

              {/* Key points */}
              <div
                className="grid grid-cols-3 gap-4 mb-6 pb-6"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                {[
                  { v: '6', l: 'Steps automated' },
                  { v: '0', l: 'Human steps' },
                  { v: '24/7', l: 'Always on' },
                ].map(s => (
                  <div key={s.l} className="text-center">
                    <div
                      className="font-bold text-xl text-white"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {s.v}
                    </div>
                    <div className="text-[11px] text-white/30 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              <p className="text-white/28 text-xs leading-[1.7] mb-6">
                This is a simplified view of one workflow. Every department runs similar pipelines
                autonomously — escalating to you only when a genuine human decision is needed.
              </p>

              {hasPlayed && selectedStep < 0 && (
                <button
                  onClick={replay}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shimmer-btn"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    cursor: 'none',
                  }}
                >
                  Replay workflow
                </button>
              )}
              {selectedStep >= 0 && (
                <button
                  onClick={replay}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `${step.color}12`,
                    color: step.color,
                    border: `1px solid ${step.color}30`,
                    cursor: 'none',
                  }}
                >
                  Resume auto-play
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
