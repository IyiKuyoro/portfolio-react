const displayNotificationPage = () => {
  // Create elements
  const swNotification = document.createElement('div');
  const swNotificationText = document.createElement('span');
  const swRefreshBtn = document.createElement('button');

  // Edit notification
  swNotification.appendChild(swNotificationText);
  swNotification.appendChild(swRefreshBtn);
  swNotification.id = 'sw-notification';

  // Edit notification text
  swNotificationText.innerText = 'This web page has some new content. Refresh page to use fresh content.';
  swNotificationText.id = 'sw-notification-text';

  // Edit notification button
  swRefreshBtn.innerText = 'Refresh';
  swRefreshBtn.id = 'sw-refresh-btn';
  swRefreshBtn.tabIndex = 1;
  swRefreshBtn.setAttribute('aria-label', 'Page has stale content. Refresh page to update content');
  swRefreshBtn.addEventListener('click', () => {
    window.location.reload();
  });

  // Add notification to page
  const root = document.getElementById('root');
  root.appendChild(swNotification);
  swRefreshBtn.focus();
};

export default displayNotificationPage;
