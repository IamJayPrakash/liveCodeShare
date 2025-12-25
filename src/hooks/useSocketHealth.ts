'use client';

import { useEffect, useState, useRef } from 'react';

interface HealthStatus {
    status: 'healthy' | 'unhealthy' | 'checking';
    message: string;
    isStarting?: boolean;
    estimatedWaitTime?: number;
}

export function useSocketHealth() {
    const [healthStatus, setHealthStatus] = useState<HealthStatus>({
        status: 'checking',
        message: 'Checking socket server status...',
    });
    const retryCountRef = useRef(0);

    useEffect(() => {
        let isMounted = true;
        let timeoutId: NodeJS.Timeout;

        const checkHealth = async () => {
            try {
                const response = await fetch('/api/health');
                const data = await response.json();

                if (!isMounted) return;

                if (data.status === 'healthy') {
                    setHealthStatus({
                        status: 'healthy',
                        message: 'Connected to socket server',
                    });
                } else if (data.isStarting) {
                    // Render free tier takes ~60 seconds to start
                    const currentRetries = retryCountRef.current;
                    const estimatedWait = Math.max(60 - currentRetries * 5, 10);

                    setHealthStatus({
                        status: 'unhealthy',
                        message: 'Socket server is starting up...',
                        isStarting: true,
                        estimatedWaitTime: estimatedWait,
                    });

                    // Increment retry count
                    retryCountRef.current += 1;

                    // Retry after 5 seconds
                    timeoutId = setTimeout(checkHealth, 5000);
                } else {
                    setHealthStatus({
                        status: 'unhealthy',
                        message: data.message || 'Socket server is unavailable',
                    });

                    // Retry after 10 seconds
                    timeoutId = setTimeout(checkHealth, 10000);
                }
            } catch {
                if (!isMounted) return;

                setHealthStatus({
                    status: 'unhealthy',
                    message: 'Failed to check socket server status',
                });

                // Retry after 10 seconds
                timeoutId = setTimeout(checkHealth, 10000);
            }
        };

        checkHealth();

        return () => {
            isMounted = false;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []); // Empty dependency array to prevent re-runs

    return healthStatus;
}
