/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function InstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect if already installed
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsStandalone(standalone);

    // Detect iOS
    const ua = window.navigator.userAgent;
    setIsIOS(/iPhone|iPad|iPod/.test(ua));

    // Listen for the install event (Android/Chrome)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  // Show popup for iOS users automatically
  useEffect(() => {
    if (isIOS && !isStandalone) {
      setShowPopup(true);
    }
  }, [isIOS, isStandalone]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("User installed the app");
    }

    setDeferredPrompt(null);
    setShowPopup(false);
  };

  if (!showPopup || isStandalone) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-5 shadow-xl text-center max-w-sm w-full">

        <h2 className="text-lg font-bold mb-2">Install Jobjunction4u App</h2>
        <p className="text-sm text-gray-700 mb-4">
          Install Jobjuction4u app on your device for a faster and better experience.
        </p>

        {/* ANDROID / CHROME BUTTON */}
        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2"
          >
            Install App
          </button>
        )}

        {/* IOS INSTRUCTIONS */}
        {isIOS && !deferredPrompt && (
          <div className="text-sm text-gray-800 mb-3">
            Tap
            <span className="font-bold"> Share → Add to Home Screen</span>
            to install this app.
          </div>
        )}

        <button
          onClick={() => setShowPopup(false)}
          className="w-full bg-gray-300 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
