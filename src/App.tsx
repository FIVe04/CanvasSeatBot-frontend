import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}

function App() {
  const tg = window.Telegram?.WebApp;
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const seats = ["A1", "A2", "B1", "B2"]; 

  useEffect(() => {
    console.log("window.Telegram:", window.Telegram);
    console.log("window.Telegram?.WebApp:", window.Telegram?.WebApp);
  }, []);

  useEffect(() => {
    if (!window.Telegram?.WebApp) {
      setConnected(false);
      return;
    }

    setConnected(true);
    tg.expand(); 
    tg.MainButton.hide();

    tg.MainButton.onClick(() => {
      if (selectedSeat) {
        console.log("Sending data to bot:", selectedSeat);
        tg.sendData(JSON.stringify({ seat: selectedSeat }));
      }
    });
  }, [selectedSeat]);

  const handleSelect = (seat: string) => {
    setSelectedSeat(seat);
    console.log("Selected seat:", seat);

    if (tg) {
      tg.MainButton.setText(`Забронировать ${seat}`);
      tg.MainButton.show();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl mb-4">
        Telegram: {connected ? "Connected ✅" : "Not connected ❌"}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => handleSelect(seat)}
            className={`p-4 rounded-xl border transition ${
              selectedSeat === seat ? "bg-green-400" : "bg-gray-200"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
