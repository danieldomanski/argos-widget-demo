import './style.css';

const params = new URLSearchParams(window.location.search);
const widgetId = params.get('widgetId') || import.meta.env.VITE_ARGOS_WIDGET_ID;
const widgetOrigin = (
  import.meta.env.VITE_ARGOS_WIDGET_ORIGIN || 'https://widget.try-argos.ai'
).replace(/\/$/, '');

document.querySelector('#year').textContent = String(new Date().getFullYear());

if (widgetId && !widgetId.includes('REPLACE_WITH')) {
  const script = document.createElement('script');
  script.src = `${widgetOrigin}/widget.js`;
  script.async = true;
  script.dataset.widgetId = widgetId;
  document.head.appendChild(script);
} else if (import.meta.env.DEV || params.has('showWidgetSetup')) {
  document.querySelector('#widget-notice').hidden = false;
}
