import React, { StrictMode, useState } from "react"

export default function Popup() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const handleGetTab = async () => {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
      })
      if (tabs.length > 0) {
        setActiveTab(tabs[0].title || "Unknown Tab")
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching tab:", error)
    }
  }

  return (
    <StrictMode>
      <div
        style={{
          width: "320px",
          height: "480px",
          backgroundColor: "#FFFFFF",
          padding: "16px",
          boxSizing: "border-box"
        }}>
        <h2>VantageUI Popup</h2>
        <button
          type="button"
          onClick={handleGetTab}
          style={{ marginTop: "16px", padding: "8px" }}>
          Get Active Tab
        </button>
        {activeTab && (
          <p style={{ marginTop: "16px", fontSize: "14px" }}>
            Active Tab: {activeTab}
          </p>
        )}
      </div>
    </StrictMode>
  )
}
