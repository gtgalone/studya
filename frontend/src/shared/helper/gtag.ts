// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url, gaTrackingID) => {
  window.gtag('config', gaTrackingID, {
    'page_location': url,
  })
  window.gtag('event', 'sign_in', { 'send_to': 'agency' })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}