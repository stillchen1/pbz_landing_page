import { tracker } from './tracker.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Analytics (Fires PV and evaluates UV)
  tracker.init();

  // 2. Attach Click Listeners
  const discordBtn = document.getElementById('discord-join-btn');
  
  if (discordBtn) {
    discordBtn.addEventListener('click', (e) => {
      // It's a real link so we will let it navigate, 
      // but send beacon/event right before
      tracker.trackEvent('join_discord_click', {
        button_id: 'discord-join-btn',
        destination_url: discordBtn.href
      });
    });
  }
});
