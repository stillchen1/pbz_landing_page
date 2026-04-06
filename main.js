import { tracker } from './tracker.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Analytics (Fires PV and evaluates UV)
  tracker.init();

  // 2. Attach Click Listeners to ALL Discord buttons
  const discordLinks = document.querySelectorAll('a[href*="discord.gg"]');
  
  discordLinks.forEach(link => {
    link.addEventListener('click', () => {
      // It's a real link so we will let it navigate, 
      // but send beacon/event right before
      tracker.trackEvent('join_discord_click', {
        button_id: link.id || 'secondary-discord-btn',
        destination_url: link.href
      });
    });
  });
});
