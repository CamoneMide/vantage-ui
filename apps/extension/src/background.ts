chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'open-side-panel') {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs.length > 0 && tabs[0].id) {
        await chrome.sidePanel.open({ tabId: tabs[0].id });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error opening side panel:', error);
    }
    return;
  }

  if (command === 'toggle-inspector') {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0 && tabs[0].id) {
        await chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_INSPECTOR' });
        // Clear any error badge on success
        chrome.action.setBadgeText({ text: '' });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending toggle command to tab:', error);
      // Show badge indicator that inspector can't activate on this page
      chrome.action.setBadgeText({ text: '!' });
      chrome.action.setBadgeBackgroundColor({ color: '#DC2626' });
      // Clear badge after 3 seconds
      setTimeout(() => {
        chrome.action.setBadgeText({ text: '' });
      }, 3000);
    }
  }
});
