// Load existing words and whitelist
chrome.storage.sync.get(['bannedWords', 'whitelistedDomains'], (result) => {
  if (result.bannedWords) {
    document.getElementById('wordsList').value = result.bannedWords.join('\n');
  }
  if (result.whitelistedDomains) {
    document.getElementById('whitelistList').value = result.whitelistedDomains.join('\n');
  }
});

// Save words and whitelist
document.getElementById('saveBtn').addEventListener('click', () => {
  const wordsList = document.getElementById('wordsList').value;
  const words = wordsList.split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0);
  
  const whitelistList = document.getElementById('whitelistList').value;
  const whitelist = whitelistList.split('\n')
    .map(domain => domain.trim().toLowerCase())
    .filter(domain => domain.length > 0);
  
  chrome.storage.sync.set({ 
    bannedWords: words,
    whitelistedDomains: whitelist
  }, () => {
    const status = document.getElementById('status');
    status.textContent = '✅ Settings saved!';
    status.className = 'status success';
    status.style.display = 'block';
    
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);
  });
});