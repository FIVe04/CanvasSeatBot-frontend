import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram?.WebApp;

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (tg) {
      tg.ready(); 
      setUser(tg.initDataUnsafe?.user);
    }
  }, []);

  const sendMessage = () => {
    console.log('sent');
  };

  if (!tg) return <div>Это не Telegram WebApp</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Привет, {user?.first_name || 'Гость'}!</h1>
      <button onClick={sendMessage}>Отправить сообщение бэкенду</button>
    </div>
  );
};

export default App;
