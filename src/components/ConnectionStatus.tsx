'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, Clock } from 'lucide-react';
import { useSocketHealth } from '@/hooks/useSocketHealth';
import { toast } from 'sonner';

export function ConnectionStatus() {
    const healthStatus = useSocketHealth();
    const [countdown, setCountdown] = useState(0);
    const [hasShownToast, setHasShownToast] = useState(false);

    useEffect(() => {
        if (healthStatus.estimatedWaitTime) {
            setCountdown(healthStatus.estimatedWaitTime);
        }
    }, [healthStatus.estimatedWaitTime]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(prev => Math.max(0, prev - 1)), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    useEffect(() => {
        if (healthStatus.status === 'unhealthy' && healthStatus.isStarting && !hasShownToast) {
            toast.info('Socket server is starting up...', {
                description: 'This may take up to 60 seconds on first load',
                duration: 5000,
            });
            setHasShownToast(true);
        } else if (healthStatus.status === 'healthy' && hasShownToast) {
            toast.success('Connected to socket server!');
            setHasShownToast(false);
        }
    }, [healthStatus.status, healthStatus.isStarting, hasShownToast]);

    if (healthStatus.status === 'healthy') {
        return null; // Don't show anything when healthy
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-16 left-1/2 -translate-x-1/2 z-50"
                role="status"
                aria-live="polite"
                aria-label="Connection status"
            >
                <div className="bg-card border border-border rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 min-w-[300px]">
                    {healthStatus.status === 'checking' && (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{healthStatus.message}</p>
                            </div>
                        </>
                    )}

                    {healthStatus.status === 'unhealthy' && healthStatus.isStarting && (
                        <>
                            <Clock className="h-5 w-5 text-orange-500" aria-hidden="true" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Server Starting Up</p>
                                {countdown > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Estimated wait: ~{countdown}s
                                    </p>
                                )}
                            </div>
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
                        </>
                    )}

                    {healthStatus.status === 'unhealthy' && !healthStatus.isStarting && (
                        <>
                            <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Connection Issue</p>
                                <p className="text-xs text-muted-foreground">{healthStatus.message}</p>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
