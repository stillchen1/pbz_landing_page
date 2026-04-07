import { tracker } from './tracker.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Analytics (Fires PV and evaluates UV)
  tracker.init();

  // 2. Attach Click Listeners to ALL Discord buttons
  const discordLinks = document.querySelectorAll('a[href*="discord.gg"]');
  
  discordLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const bId = link.id || 'secondary-discord-btn';
      console.log(`[Main] Button Clicked: ${bId}`);
      
      tracker.trackEvent('join_discord_click', {
        button_id: bId,
        destination_url: link.href
      });
    });
  });
});
