import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}

const App: React.FC = () => {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    // Проверяем наличие Telegram WebApp API
    const checkTelegram = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        setTg(window.Telegram.WebApp);
        window.Telegram.WebApp.ready();
        console.log("Telegram WebApp detected", window.Telegram.WebApp);
      } else {
        console.log("Telegram WebApp not detected yet, retrying...");
        setTimeout(checkTelegram, 100); // пробуем снова через 100мс
      }
    };

    checkTelegram();
  }, []);

  const sendDataToBot = () => {
    if (tg) {
      tg.sendData(JSON.stringify({ text: "Привет от WebApp!" }));
    }
  };

  if (!tg) return <div>Ожидание Telegram Web App...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Привет из Telegram WebApp!</h1>
      <p>Платформа: {tg.platform}</p>
      <button onClick={sendDataToBot}>Отправить данные боту</button>
    </div>
  );
};

export default App;
