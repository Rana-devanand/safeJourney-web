import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Contact form will fall back to local submission.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Invokes the send-feedback-email Supabase Edge Function
 * Sends corporate/license inquiry email to dev.cloudapp93@gmail.com
 */
export async function sendContactEmail(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    // Fallback: log to console if Supabase not configured
    console.log('Contact form submission (no Supabase configured):', values);
    return { success: true };
  }

  try {
    const { error } = await supabase.functions.invoke('send-feedback-email', {
      body: {
        rating: 5,
        feedbackType: 'feature',
        subject: `[Web Contact] ${values.subject || 'General Inquiry'}`,
        message: `
Name: ${values.name}
Email: ${values.email}
Subject: ${values.subject || 'General Inquiry'}
        
Message:
${values.message}
        `,
        userName: values.name,
        userEmail: values.email,
        phone: 'N/A',
      },
    });

    if (error) {
      throw new Error(error.message || 'Failed to send email');
    }

    return { success: true };
  } catch (err: any) {
    console.error('sendContactEmail error:', err);
    return { success: false, error: err.message || 'Failed to send message. Please try again later.' };
  }
}