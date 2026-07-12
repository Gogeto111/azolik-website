import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not set. Contact form will not work.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

export type ContactFormData = {
  name: string
  email: string
  company: string
  message: string
  type: 'demo' | 'contact' | 'signup'
}

export async function submitContactForm(data: ContactFormData) {
  const { error } = await supabase.from('contacts').insert({
    name: data.name,
    email: data.email,
    company: data.company,
    message: data.message,
    type: data.type,
    created_at: new Date().toISOString(),
  })

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}