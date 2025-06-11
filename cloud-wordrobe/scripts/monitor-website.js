const https = require('https');
const http = require('http');

class WebsiteMonitor {
  constructor(config) {
    this.websites = config.websites || [];
    this.interval = config.interval || 60000; // 1 minute default
    this.webhookUrl = config.webhookUrl; // For Discord/Slack notifications
    this.emailConfig = config.email;
  }

  async checkWebsite(website) {
    return new Promise((resolve) => {
      const protocol = website.url.startsWith('https') ? https : http;
      const startTime = Date.now();

      const req = protocol.get(website.url, (res) => {
        const responseTime = Date.now() - startTime;
        const isHealthy = res.statusCode >= 200 && res.statusCode < 400;
        
        resolve({
          url: website.url,
          status: res.statusCode,
          responseTime,
          isHealthy,
          timestamp: new Date().toISOString()
        });
      });

      req.on('error', () => {
        resolve({
          url: website.url,
          status: 0,
          responseTime: Date.now() - startTime,
          isHealthy: false,
          error: 'Connection failed',
          timestamp: new Date().toISOString()
        });
      });

      req.setTimeout(10000, () => {
        req.destroy();
        resolve({
          url: website.url,
          status: 0,
          responseTime: 10000,
          isHealthy: false,
          error: 'Timeout',
          timestamp: new Date().toISOString()
        });
      });
    });
  }

  async sendNotification(message) {
    if (this.webhookUrl) {
      try {
        const fetch = (await import('node-fetch')).default;
        await fetch(this.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: message,
            username: 'Website Monitor',
            icon_emoji: ':warning:'
          })
        });
      } catch (error) {
        console.error('Failed to send webhook notification:', error);
      }
    }
    
    // Log to console (you can extend this to send emails, SMS, etc.)
    console.log(`🚨 ALERT: ${message}`);
  }

  async monitorAll() {
    for (const website of this.websites) {
      const result = await this.checkWebsite(website);
      
      if (!result.isHealthy) {
        const message = `🔴 ${website.name || website.url} is DOWN! Status: ${result.status}, Error: ${result.error || 'Unknown'}`;
        await this.sendNotification(message);
      } else if (result.responseTime > 5000) {
        const message = `🟡 ${website.name || website.url} is SLOW! Response time: ${result.responseTime}ms`;
        await this.sendNotification(message);
      } else {
        console.log(`✅ ${website.name || website.url} is healthy (${result.responseTime}ms)`);
      }
    }
  }

  start() {
    console.log('🚀 Website monitoring started...');
    this.monitorAll(); // Check immediately
    setInterval(() => this.monitorAll(), this.interval);
  }
}

// Configuration
const monitor = new WebsiteMonitor({
  websites: [
    { 
      name: 'Cloud Wardrobe - Home',
      url: 'http://localhost:3000' // Change to your production URL
    },
    {
      name: 'Cloud Wardrobe - API Health',
      url: 'http://localhost:3000/api/health'
    },
    {
      name: 'Cloud Wardrobe - Shop',
      url: 'http://localhost:3000/shop'
    }
  ],
  interval: 60000, // Check every minute
  webhookUrl: process.env.WEBHOOK_URL // Set this in your environment variables
});

// Start monitoring
if (require.main === module) {
  monitor.start();
}

module.exports = WebsiteMonitor;
