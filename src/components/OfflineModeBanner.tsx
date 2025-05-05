
import { useEffect, useState } from "react";
import { Wifi, WifiOff, X } from "lucide-react";
import OfflineMode from "@/services/OfflineMode";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const OfflineModeBanner = () => {
  const [isOffline, setIsOffline] = useState(OfflineMode.isOffline);
  const [isForced, setIsForced] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Initial state
    setIsOffline(OfflineMode.isOffline);
    
    // Check if we should remember banner visibility
    const bannerHidden = localStorage.getItem('offlineBannerHidden') === 'true';
    if (bannerHidden) {
      setIsVisible(false);
    }
    
    // Setup event listener for online/offline status changes
    const handleOnlineStatusChange = () => {
      setIsOffline(OfflineMode.isOffline);
      
      // If we go offline, show the banner again
      if (OfflineMode.isOffline) {
        setIsVisible(true);
        localStorage.removeItem('offlineBannerHidden');
      }
    };
    
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    // Custom event for force offline mode changes
    const handleForceModeChange = () => {
      setIsOffline(OfflineMode.isOffline);
      setIsForced(OfflineMode.isOffline);
    };
    
    document.addEventListener('offlineModeChange', handleForceModeChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
      document.removeEventListener('offlineModeChange', handleForceModeChange);
    };
  }, []);
  
  // Don't show banner if not offline and not forcing it
  if (!isOffline || !isVisible) {
    return null;
  }
  
  const toggleOfflineMode = () => {
    const newState = !isForced;
    setIsForced(newState);
    OfflineMode.setForceOffline(newState);
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('offlineModeChange'));
  };
  
  const dismissBanner = () => {
    setIsVisible(false);
    localStorage.setItem('offlineBannerHidden', 'true');
  };
  
  return (
    <div className="bg-amber-50 border-b border-amber-300 px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-800">
          {isForced ? (
            <WifiOff size={16} className="text-amber-600" />
          ) : (
            <Wifi size={16} className="text-amber-600" />
          )}
          <span className="text-sm font-medium">
            {isForced 
              ? "Offline mode is enabled. Using local data only."
              : "You are currently offline. Using cached data."
            }
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-700">Force Offline</span>
            <Switch 
              checked={isForced}
              onCheckedChange={toggleOfflineMode}
              className="data-[state=checked]:bg-amber-600"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 text-amber-800 hover:text-amber-900 hover:bg-amber-200"
            onClick={dismissBanner}
          >
            <X size={16} />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfflineModeBanner;
