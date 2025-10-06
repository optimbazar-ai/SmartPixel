import cron from 'node-cron';
import { storage } from './storage';

export function initializeScheduler() {
  // Check for scheduled content every minute
  cron.schedule('* * * * *', async () => {
    try {
      const scheduledContent = await storage.getScheduledContent();
      
      if (scheduledContent.length > 0) {
        console.log(`Found ${scheduledContent.length} scheduled content items to publish`);
        
        for (const content of scheduledContent) {
          try {
            await storage.publishContent(content.id);
            console.log(`Published content: ${content.title}`);

            // Publish to Telegram if enabled
            if (content.publishToTelegram) {
              try {
                await publishToTelegram(content);
                console.log(`Sent to Telegram: ${content.title}`);
              } catch (error) {
                console.error(`Failed to publish to Telegram: ${content.title}`, error);
              }
            }
          } catch (error) {
            console.error(`Failed to publish content: ${content.title}`, error);
          }
        }
      }
    } catch (error) {
      console.error('Scheduler error:', error);
    }
  });

  console.log('Scheduler initialized - checking for scheduled content every minute');
}

async function publishToTelegram(content: any) {
  const botToken = await storage.getSetting('telegram_bot_token');
  const channelId = await storage.getSetting('telegram_channel_id');

  if (!botToken?.value || !channelId?.value) {
    throw new Error("Telegram settings not configured");
  }

  const message = `*${content.title}*\n\n${content.body}`;
  
  const response = await fetch(`https://api.telegram.org/bot${botToken.value}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: channelId.value,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Telegram API error: ${errorData}`);
  }

  return await response.json();
}
