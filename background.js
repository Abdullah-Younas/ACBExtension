// Initialize banned words with more specific matching
let bannedWords = [
  // Remove overly generic words and add word boundaries for others
  "pornhub", "nsfw", "xxx",
  "tits", "boobs", "ntr", "milf", "hentai",
  "fap haven", "aunt hina", "spankbang", "plainprxy", "plainproxy",
  "3d porn", "porn comic", "chuhai", "jill valentine",
  "zombie porn", "cartoonporn", "pln prxy", "big boobs",
  "huge ass", "skylar vox", "alexa croft", "porn comics", "9xbddy",
  "9xbuddy", "xlecx.one", "jav", "echii", "mssethi",
  "ms sethi", "gabbie carter", "garbe carter", "coproxy",
  "baldurs gate", "faphaven", "elf", "faphave",
  "faphav", "copro", "coprox", "laurie pixen"
];

// Add separate list for exact word matching (with word boundaries)
let exactMatchWords = [
  "porn", "adult", "sex", "ass", "hen", "fap", "haven", "xx", "laurie"
];

// Whitelisted domains
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
  "x.com",
  "medium.com",
  "dev.to",
  "mdn.mozilla.org"
];

// Function to check for word boundaries
function containsBannedContent(text) {
  text = text.toLowerCase();
  
  // Check for partial match banned words
  for (let word of bannedWords) {
    if (text.includes(word.toLowerCase())) {
      return true;
    }
  }
  
  // Check for exact word matches with boundaries
  for (let word of exactMatchWords) {
    // Create regex with word boundaries
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(text)) {
      return true;
    }
  }
  
  return false;
}

// Save to storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 
    bannedWords: bannedWords,
    exactMatchWords: exactMatchWords,
    whitelistedDomains: whitelistedDomains 
  });
});

// Function to check if URL is whitelisted
function isWhitelisted(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
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
    
    chrome.storage.sync.get(['bannedWords', 'exactMatchWords', 'whitelistedDomains'], (result) => {
      const words = result.bannedWords || bannedWords;
      const exactWords = result.exactMatchWords || exactMatchWords;
      
      if (result.whitelistedDomains) {
        whitelistedDomains = result.whitelistedDomains;
      }
      
      // Double-check whitelist
      if (isWhitelisted(sender.tab.url)) {
        return;
      }
      
      // Check URL and title
      const url = sender.tab.url.toLowerCase();
      const title = sender.tab.title.toLowerCase();
      
      // Check URL
      if (containsBannedContent(url) || containsBannedContent(title)) {
        console.log("Blocked due to URL/title match:", sender.tab.url);
        chrome.tabs.remove(sender.tab.id);
        return;
      }
      
      // Check page content (only for exact matches to avoid false positives)
      const content = request.content.toLowerCase();
      
      // For content, be more strict - look for multiple indicators
      let suspiciousCount = 0;
      for (let word of exactWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = content.match(regex);
        if (matches && matches.length > 3) { // Only if word appears multiple times
          suspiciousCount++;
        }
      }
      
      // Only block if multiple suspicious words found
      if (suspiciousCount >= 2) {
        console.log("Blocked due to content match:", sender.tab.url);
        chrome.tabs.remove(sender.tab.id);
      }
    });
  }
});