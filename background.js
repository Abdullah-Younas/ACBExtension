// Initialize banned words
let bannedWords = [
  "porn", "pornhub", "adult", "nsfw", "xxx",
    "porn", "pornhub", "sex", "tits", "boobs", "ass", "ntr", "milf", "hentai",
    "fap haven", "aunt hina", "princess peach", "force", "comic", "damp lips",
    "spankbang", "plainprxy", "plainproxy", "jill valentine", "3d porn",
    "porn comic", "brutality", "chuhai", "hung", "yamato", "valentine", "jill",
    "zombie porn", "cartoonporn", "pln prxy", "proxy", "prxy", "big boobs",
    "huge ass", "skylar vox", "alexa croft", "porn comics", "xxx", "9xbddy",
    "9xbuddy", "nsfw", "xlecx.one", "hen", "jav", "echii", "mssethi",
    "ms sethi", "mssethi", "gabbie carter", "garbe carter", "coproxy",
    "baldurs gate", "amazon", "faphaven", "elf", "fap", "haven", "faphave",
    "faphav", "copro", "coprox", "xx", "laurie pixen", "laurie", "twitter"
];

// Save to storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ bannedWords: bannedWords });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkContent") {
    chrome.storage.sync.get(['bannedWords'], (result) => {
      const words = result.bannedWords || bannedWords;
      
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