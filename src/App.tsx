import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}

const App: React.FC = () => {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setTg(window.Telegram.WebApp);
      window.Telegram.WebApp.ready();
      console.log("Telegram WebApp detected", window.Telegram.WebApp);
    }
  }, []);

  if (!tg) return <div>Ожидание Telegram Web App...</div>;

  return (
    <div>
      <h1>Привет из Telegram WebApp!</h1>
      <p>Платформа: {tg.platform}</p>
    </div>
  );
};

export default App;
