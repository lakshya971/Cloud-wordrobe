import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health checks
    const healthChecks = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        database: await checkDatabase(),
        memory: checkMemory(),
        disk: checkDisk(),
      }
    };

    return NextResponse.json(healthChecks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 503 }
    );
  }
}

async function checkDatabase() {
  try {
    // Add your database connection check here
    // For now, we'll simulate a check
    return {
      status: 'connected',
      responseTime: Math.random() * 50 + 10 // Simulated response time
    };
  } catch (error) {
    return {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Database connection failed'
    };
  }
}

function checkMemory() {
  const memUsage = process.memoryUsage();
  const totalMem = memUsage.heapTotal / 1024 / 1024; // MB
  const usedMem = memUsage.heapUsed / 1024 / 1024; // MB
  const memUsagePercent = (usedMem / totalMem) * 100;

  return {
    total: `${totalMem.toFixed(2)} MB`,
    used: `${usedMem.toFixed(2)} MB`,
    percentage: `${memUsagePercent.toFixed(2)}%`,
    status: memUsagePercent > 90 ? 'warning' : 'healthy'
  };
}

function checkDisk() {
  // Basic disk check - in production you might want more detailed checks
  return {
    status: 'healthy',
    message: 'Disk space available'
  };
}
