// Utility for sending push notifications via various services like Pushover, Twilio, and Discord.

// Types for configuration
interface PushoverConfig {
  token: string;
  user: string;
}

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromNumber: string;
  toNumber: string;
}

interface NotificationConfig {
  pushover?: PushoverConfig;
  twilio?: TwilioConfig;
  discordWebhook?: string;
}

export class NotificationService {
  private pushoverConfig?: PushoverConfig;
  private twilioConfig?: TwilioConfig;
  private discordWebhook?: string;

  constructor(config: NotificationConfig) {
    this.pushoverConfig = config.pushover;
    this.twilioConfig = config.twilio;
    this.discordWebhook = config.discordWebhook;
  }
  // Pushover - Great for mobile notifications
  async sendPushover(message: string, priority: number = 0): Promise<any> {
    if (!this.pushoverConfig) return;

    try {
      const response = await fetch('https://api.pushover.net/1/messages.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          token: this.pushoverConfig.token,
          user: this.pushoverConfig.user,
          message: message,
          title: 'Website Monitor',
          priority: priority.toString(),
          sound: priority > 0 ? 'alarm' : 'pushover'
        })
      });

      return await response.json();
    } catch (error) {
      console.error('Pushover notification failed:', error);
    }
  }

  // SMS via Twilio
  async sendSMS(message: string, phoneNumber: string): Promise<any> {
    if (!this.twilioConfig) return;

    try {
      const accountSid = this.twilioConfig.accountSid;
      const authToken = this.twilioConfig.authToken;
      const fromNumber = this.twilioConfig.fromNumber;

      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`
        },
        body: new URLSearchParams({
          From: fromNumber,
          To: phoneNumber,
          Body: message
        })
      });

      return await response.json();
    } catch (error) {
      console.error('SMS notification failed:', error);
    }
  }

  // Discord webhook
  async sendDiscord(message: string): Promise<boolean | undefined> {
    if (!this.discordWebhook) return;

    try {
      const response = await fetch(this.discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: message,
          username: 'Website Monitor',
          avatar_url: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        })
      });

      return response.status === 204;
    } catch (error) {
      console.error('Discord notification failed:', error);
    }
  }

  // Send to all configured services
  async sendAlert(message: string, isUrgent: boolean = false): Promise<PromiseSettledResult<any>[]> {
    const promises: Promise<any>[] = [];

    // Pushover with high priority if urgent
    if (this.pushoverConfig) {
      promises.push(this.sendPushover(message, isUrgent ? 1 : 0));
    }

    // SMS only for urgent alerts
    if (isUrgent && this.twilioConfig) {
      promises.push(this.sendSMS(message, this.twilioConfig.toNumber));
    }

    // Discord for all alerts
    if (this.discordWebhook) {
      promises.push(this.sendDiscord(message));
    }

    return Promise.allSettled(promises);
  }
}

// Example usage configuration
export const notificationConfig: NotificationConfig = {
  pushover: {
    token: process.env.PUSHOVER_TOKEN || '',
    user: process.env.PUSHOVER_USER || ''
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    fromNumber: process.env.TWILIO_FROM_NUMBER || '',
    toNumber: process.env.TWILIO_TO_NUMBER || ''
  },
  discordWebhook: process.env.DISCORD_WEBHOOK_URL
};
