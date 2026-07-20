import './style.css';

const DEFAULT_WIDGET_ID = '01KY0HXPSVMD7HR2RQ5C4RHAP2';
const WIDGET_ID_PATTERN = /^[0-9A-HJKMNP-TV-Z]{26}$/;

const form = document.querySelector('#widget-form');
const input = document.querySelector('#widget-id');
const error = document.querySelector('#widget-error');
const requestedWidgetId =
  new URLSearchParams(window.location.search).get('widgetId')?.trim().toUpperCase() ||
  DEFAULT_WIDGET_ID;

document.querySelector('#year').textContent = String(new Date().getFullYear());
input.value = requestedWidgetId;

function showError(message) {
  error.textContent = message;
  error.hidden = false;
  input.setAttribute('aria-invalid', 'true');
}

function clearError() {
  error.hidden = true;
  error.textContent = '';
  input.removeAttribute('aria-invalid');
}

function loadWidget(widgetId) {
  const script = document.createElement('script');
  script.src = 'https://widget.try-argos.ai/widget.js';
  script.async = true;
  script.dataset.widgetId = widgetId;
  document.body.appendChild(script);
}

if (WIDGET_ID_PATTERN.test(requestedWidgetId)) {
  loadWidget(requestedWidgetId);
} else {
  showError('Enter a valid 26-character Argos widget ID.');
}

input.addEventListener('input', clearError);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const widgetId = input.value.trim().toUpperCase();

  if (!WIDGET_ID_PATTERN.test(widgetId)) {
    showError('Enter a valid 26-character Argos widget ID.');
    input.focus();
    return;
  }

  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set('widgetId', widgetId);
  window.location.assign(nextUrl);
});
