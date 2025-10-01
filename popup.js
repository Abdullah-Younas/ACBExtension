// Load existing words and whitelist
chrome.storage.sync.get(['bannedWords', 'exactMatchWords', 'whitelistedDomains'], (result) => {
  // Load partial match words
  if (result.bannedWords) {
    document.getElementById('wordsList').value = result.bannedWords.join('\n');
  }
  
  // Load exact match words
  if (result.exactMatchWords) {
    document.getElementById('exactWordsList').value = result.exactMatchWords.join('\n');
  }
  
  // Load whitelisted domains
  if (result.whitelistedDomains) {
    document.getElementById('whitelistList').value = result.whitelistedDomains.join('\n');
  }
});

// Save words and whitelist
document.getElementById('saveBtn').addEventListener('click', () => {
  // Get partial match words
  const wordsList = document.getElementById('wordsList').value;
  const words = wordsList.split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0);
  
  // Get exact match words
  const exactWordsList = document.getElementById('exactWordsList').value;
  const exactWords = exactWordsList.split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0);
  
  // Get whitelisted domains
  const whitelistList = document.getElementById('whitelistList').value;
  const whitelist = whitelistList.split('\n')
    .map(domain => domain.trim().toLowerCase())
    .filter(domain => domain.length > 0);
  
  // Save all settings
  chrome.storage.sync.set({ 
    bannedWords: words,
    exactMatchWords: exactWords,
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

// Add export/import functionality for backup
document.getElementById('exportBtn')?.addEventListener('click', () => {
  chrome.storage.sync.get(['bannedWords', 'exactMatchWords', 'whitelistedDomains'], (result) => {
    const data = JSON.stringify(result, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blocker-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  });
});

document.getElementById('importBtn')?.addEventListener('click', () => {
  document.getElementById('importFile').click();
});

document.getElementById('importFile')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        // Update text areas
        if (data.bannedWords) {
          document.getElementById('wordsList').value = data.bannedWords.join('\n');
        }
        if (data.exactMatchWords) {
          document.getElementById('exactWordsList').value = data.exactMatchWords.join('\n');
        }
        if (data.whitelistedDomains) {
          document.getElementById('whitelistList').value = data.whitelistedDomains.join('\n');
        }
        
        // Save to storage
        chrome.storage.sync.set(data, () => {
          const status = document.getElementById('status');
          status.textContent = '✅ Settings imported!';
          status.className = 'status success';
          status.style.display = 'block';
          
          setTimeout(() => {
            status.style.display = 'none';
          }, 2000);
        });
      } catch (error) {
        const status = document.getElementById('status');
        status.textContent = '❌ Invalid file format!';
        status.className = 'status error';
        status.style.display = 'block';
        
        setTimeout(() => {
          status.style.display = 'none';
        }, 3000);
      }
    };
    reader.readAsText(file);
  }
});