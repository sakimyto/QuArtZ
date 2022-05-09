import GtagEvent from '@/@types/gtag';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const existsGaId = GA_ID !== '';

// event
export const event = ({ action, category, label, value = '' }: GtagEvent) => {
  if (!existsGaId) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : '',
    value,
  });
};
