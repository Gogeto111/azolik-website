import { createClient } from '@supabase/supabase-js';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

type FormType = 'demo' | 'contact' | 'signup';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactFormProps {
  type: FormType;
  title?: string;
  description?: string;
  buttonText?: string;
  onSuccess?: () => void;
}

const industries = [
  'E-commerce',
  'Legal',
  'Healthcare',
  'Real Estate',
  'Marketing Agency',
  'SaaS',
  'Consulting',
  'Restaurant',
  'Construction',
  'Manufacturing',
  'Other',
];

const baseInputClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.03] border transition-all duration-300 text-white placeholder-white/20 focus:outline-none';
const baseSelectClass =
  'w-full px-4 py-3 rounded-xl bg-white/[0.03] border transition-colors duration-200 text-white focus:outline-none appearance-none';

export function ContactForm({
  type = 'demo',
  title,
  description,
  buttonText,
  onSuccess,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    business_name: '',
    email: '',
    industry: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'business_name':
        if (!value.trim()) return 'Business name is required';
        if (value.trim().length < 2) return 'Business name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        break;
      case 'industry':
        if (!value && type === 'demo') return 'Please select your industry';
        break;
      case 'message':
        if (type === 'contact' && !value.trim()) return 'Message is required';
        break;
    }
    return null;
  };

  useEffect(() => {
    if (firstInputRef.current && status === 'idle') {
      firstInputRef.current.focus();
    }
  }, [status]);

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
    const error = validateField(e.target.name, e.target.value);
    if (error) setErrorMessage(error);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrorMessage(error || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length > 0) {
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      setErrorMessage(Object.values(errors)[0]);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      if (supabase) {
        const { error } = await supabase.from('leads').insert([
          {
            business_name: formData.business_name,
            email: formData.email,
            industry: formData.industry,
            message: formData.message,
            type,
            source: 'landing_page',
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setStatus('success');
      setFormData({ business_name: '', email: '', industry: '', message: '' });
      setTouched({});
      onSuccess?.();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  const getBorderColor = (fieldName: string) => {
    const error =
      touched[fieldName] && validateField(fieldName, formData[fieldName as keyof typeof formData]);
    return error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.07)';
  };

  const focusStyle = {
    borderColor: 'rgba(167,139,250,0.4)',
    boxShadow: '0 0 0 3px rgba(167,139,250,0.08), 0 0 20px rgba(167,139,250,0.05)',
  };

  const renderFields = () => {
    const fields: React.ReactNode[] = [];

    if (type === 'demo' || type === 'signup') {
      fields.push(
        <div key="business_name" className="relative">
          <label htmlFor="business_name" className="block text-white/40 text-xs mb-1.5">
            Business name *
          </label>
          <input
            ref={firstInputRef}
            id="business_name"
            name="business_name"
            type="text"
            value={formData.business_name}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            placeholder="Acme Inc."
            className={baseInputClass}
            style={{ borderColor: getBorderColor('business_name') }}
            autoComplete="organization"
            disabled={status === 'loading'}
          />
        </div>
      );

      fields.push(
        <div key="email" className="relative">
          <label htmlFor="email" className="block text-white/40 text-xs mb-1.5">
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            placeholder="you@company.com"
            className={baseInputClass}
            style={{ borderColor: getBorderColor('email') }}
            autoComplete="email"
            disabled={status === 'loading'}
          />
        </div>
      );

      if (type === 'demo') {
        fields.push(
          <div key="industry" className="relative">
            <label htmlFor="industry" className="block text-white/40 text-xs mb-1.5">
              Industry *
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              onBlur={handleBlur}
              className={baseSelectClass}
              style={{
                borderColor: getBorderColor('industry'),
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '40px',
                color: formData.industry ? '#f5f5f7' : 'rgba(255,255,255,0.4)',
              }}
              disabled={status === 'loading'}
            >
              <option
                value=""
                disabled
                style={{ backgroundColor: '#08090c', color: 'rgba(255,255,255,0.4)' }}
              >
                Select your industry
              </option>
              {industries.map(ind => (
                <option
                  key={ind}
                  value={ind}
                  style={{ backgroundColor: '#08090c', color: '#f5f5f7' }}
                >
                  {ind}
                </option>
              ))}
            </select>
          </div>
        );
      }
    }

    if (type === 'contact') {
      fields.push(
        <div key="message" className="relative">
          <label htmlFor="message" className="block text-white/40 text-xs mb-1.5">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
            placeholder="Tell us what you're looking for..."
            rows={4}
            className={`${baseInputClass} resize-none`}
            style={{ borderColor: getBorderColor('message') }}
            disabled={status === 'loading'}
          />
        </div>
      );
    }

    return fields;
  };

  const getSuccessMessage = () => {
    switch (type) {
      case 'demo':
        return "We'll reach out within 24 hours to set up your AI departments.";
      case 'signup':
        return 'Your AI workforce is being provisioned. Check your email for next steps.';
      default:
        return "Thanks for reaching out. We'll get back to you within 24 hours.";
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12" style={{ animation: 'fadeIn 0.4s ease-out' }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}
        >
          <CheckCircle size={32} color="#34d399" />
        </div>
        <h3
          className="font-bold text-white text-xl mb-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          You&apos;re in!
        </h3>
        <p className="text-white/45 mb-6">{getSuccessMessage()}</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-white/55 border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:text-white/78 transition-all duration-200"
          style={{ cursor: 'none' }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
      {title && (
        <div className="mb-4">
          <h3
            className="font-bold text-white text-lg mb-1"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {title}
          </h3>
          {description && <p className="text-white/40 text-sm">{description}</p>}
        </div>
      )}
      {renderFields()}

      {errorMessage && (
        <div className="flex items-center gap-2 text-sm text-red-400" role="alert">
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ripple"
        style={{
          background: status === 'loading' ? 'rgba(255,255,255,0.05)' : '#f5f5f7',
          color: status === 'loading' ? 'rgba(255,255,255,0.5)' : '#08090c',
          boxShadow:
            status === 'loading'
              ? 'none'
              : '0 0 40px rgba(245,245,247,0.14), 0 8px 32px rgba(0,0,0,0.3)',
          cursor: status === 'loading' ? 'not-allowed' : 'none',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' && <Loader2 size={20} className="animate-spin" />}
        {status !== 'loading' &&
          (buttonText ||
            (type === 'demo'
              ? 'Start free trial'
              : type === 'signup'
                ? 'Create account'
                : 'Send message'))}
      </button>

      <p className="text-center text-white/14 text-[10px] font-mono">
        By submitting, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-white/40">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="/terms" className="underline hover:text-white/40">
          Terms of Service
        </a>
        .
      </p>
    </form>
  );
}
