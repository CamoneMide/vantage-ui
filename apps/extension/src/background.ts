chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-inspector") {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "TOGGLE_INSPECTOR" })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error sending toggle command to tab:", error)
    }
  }
})
