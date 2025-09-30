// Initialize banned words
let bannedWords = [
  "porn", "pornhub", "adult", "nsfw", "xxx",
  "sex", "tits", "boobs", "ass", "ntr", "milf", "hentai",
  "fap haven", "aunt hina", "princess peach", "force", "comic", "damp lips",
  "spankbang", "plainprxy", "plainproxy", "jill valentine", "3d porn",
  "porn comic", "brutality", "chuhai", "hung", "yamato", "valentine", "jill",
  "zombie porn", "cartoonporn", "pln prxy", "proxy", "prxy", "big boobs",
  "huge ass", "skylar vox", "alexa croft", "porn comics", "9xbddy",
  "9xbuddy", "xlecx.one", "hen", "jav", "echii", "mssethi",
  "ms sethi", "gabbie carter", "garbe carter", "coproxy",
  "baldurs gate", "amazon", "faphaven", "elf", "fap", "haven", "faphave",
  "faphav", "copro", "coprox", "xx", "laurie pixen", "laurie", "twitter"
];

// Whitelisted domains that should never be closed
let whitelistedDomains = [
  "github.com",
  "youtube.com",
  "stackoverflow.com",
  "google.com",
  "gmail.com",
  "docs.google.com",
  "drive.google.com",
  "wikipedia.org",
  "reddit.com",
  "linkedin.com",
  "microsoft.com",
  "amazon.com",
  "twitter.com",
  "x.com"
];

// Save to storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 
    bannedWords: bannedWords,
    whitelistedDomains: whitelistedDomains 
  });
});

// Function to check if URL is whitelisted
function isWhitelisted(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    // Check if the hostname matches or is a subdomain of any whitelisted domain
    return whitelistedDomains.some(domain => {
      return hostname === domain || 
             hostname.endsWith('.' + domain) ||
             hostname === 'www.' + domain;
    });
  } catch (e) {
    return false;
  }
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkContent") {
    // First check if the site is whitelisted
    if (isWhitelisted(sender.tab.url)) {
      console.log("Site is whitelisted, skipping check:", sender.tab.url);
      return;
    }
    
    chrome.storage.sync.get(['bannedWords', 'whitelistedDomains'], (result) => {
      const words = result.bannedWords || bannedWords;
      
      // Update whitelisted domains from storage if available
      if (result.whitelistedDomains) {
        whitelistedDomains = result.whitelistedDomains;
      }
      
      // Double-check whitelist with updated domains
      if (isWhitelisted(sender.tab.url)) {
        return;
      }
      
      // Check URL and title
      const url = sender.tab.url.toLowerCase();
      const title = sender.tab.title.toLowerCase();
      
      for (let word of words) {
        if (url.includes(word.toLowerCase()) || title.includes(word.toLowerCase())) {
          // Close the tab
          chrome.tabs.remove(sender.tab.id);
          return;
        }
      }
      
      // Check page content
      const content = request.content.toLowerCase();
      for (let word of words) {
        if (content.includes(word.toLowerCase())) {
          chrome.tabs.remove(sender.tab.id);
          return;
        }
      }
    });
  }
});