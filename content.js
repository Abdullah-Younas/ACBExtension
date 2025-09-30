// Check page content after load
function checkPageContent() {
  // Get page text content (limits to visible text)
  const pageText = document.body.innerText || "";
  
  // Only check first 5000 characters to avoid performance issues
  const contentToCheck = pageText.substring(0, 5000);
  
  // Send to background script
  chrome.runtime.sendMessage({
    action: "checkContent",
    content: contentToCheck
  });
}

// Run check when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkPageContent);
} else {
  checkPageContent();
}