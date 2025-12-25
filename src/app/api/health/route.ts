import { NextResponse } from 'next/server';

export async function GET() {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

    try {
        // Check if socket server is reachable
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(socketUrl, {
            signal: controller.signal,
            method: 'GET',
        });

        clearTimeout(timeoutId);

        if (response.ok || response.status === 404) {
            // 404 is ok because socket.io server doesn't have a GET route at root
            return NextResponse.json({
                status: 'healthy',
                socketUrl,
                message: 'Socket server is reachable'
            });
        }

        return NextResponse.json({
            status: 'unhealthy',
            socketUrl,
            message: 'Socket server returned unexpected status'
        }, { status: 503 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const isTimeout = error instanceof Error && error.name === 'AbortError';

        return NextResponse.json({
            status: 'unhealthy',
            socketUrl,
            message: isTimeout ? 'Socket server timeout' : errorMessage,
            isStarting: true // Render might be starting up
        }, { status: 503 });
    }
}
