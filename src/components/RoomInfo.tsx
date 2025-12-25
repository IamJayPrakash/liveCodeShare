import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Info, Users, Clock, Shield } from 'lucide-react';

interface RoomInfoProps {
  roomId: string;
  userCount: number;
}

export function RoomInfo({ roomId, userCount }: RoomInfoProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" title="Room Info">
          <Info size={20} />
          <span className="sr-only">Room Info</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Room Details</SheetTitle>
          <SheetDescription>
            Information about your current collaboration session.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 py-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Session ID
            </h3>
            <div className="p-3 bg-muted rounded-md font-mono text-sm break-all border">
              {roomId}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Users size={18} />
                <span className="font-medium">Active Users</span>
              </div>
              <p className="text-2xl font-bold">{userCount}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Clock size={18} />
                <span className="font-medium">Session Time</span>
              </div>
              <p className="text-2xl font-bold">Live</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex gap-3">
              <Shield className="text-green-500 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium">Secure Connection</h4>
                <p className="text-sm text-muted-foreground">
                  Your code is transmitted securely via WebSockets.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Info className="text-blue-500 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium">Temporary Storage</h4>
                <p className="text-sm text-muted-foreground">
                  Code is cached temporarily for active collaboration but not permanently stored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
