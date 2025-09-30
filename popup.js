// Load existing words
chrome.storage.sync.get(['bannedWords'], (result) => {
  if (result.bannedWords) {
    document.getElementById('wordsList').value = result.bannedWords.join('\n');
  }
});

// Save words
document.getElementById('saveBtn').addEventListener('click', () => {
  const wordsList = document.getElementById('wordsList').value;
  const words = wordsList.split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0);
  
  chrome.storage.sync.set({ bannedWords: words }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Words saved!';
    status.className = 'status success';
    status.style.display = 'block';
    
    setTimeout(() => {
      status.style.display = 'none';
    }, 2000);
  });
});