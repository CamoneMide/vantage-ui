import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export default function Inspector() {
  useEffect(() => {
    const messageListener = (message: any) => {
      if (message.type === "TOGGLE_INSPECTOR") {
        // eslint-disable-next-line no-console
        console.log("Inspector toggled")
      }
    }

    chrome.runtime.onMessage.addListener(messageListener)
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener)
    }
  }, [])

  return null
}
