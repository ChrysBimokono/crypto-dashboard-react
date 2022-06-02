import { useState, useEffect } from "react";

import "./styles.css";

// Use this API
// https://api2.binance.com/api/v3/ticker/24hr

const COIN_NAMES = {
  BTCUSDT: "Bitcoin",
  ETHUSDT: "Ethereum",
  SOLUSDT: "Solana",
  ADAUSDT: "Cardano",
  DOGEUSDT: "DogeCoin"
};
const COINS = ["BTCUSDT ", "ETHUSDT", "SOLUSDT", "ADAUSDT", "DOGEUSDT"];
const NAMES = ["Bitcoin", "Ethereum", "Solana", "Cardano", "DogeCoin"];
export default function App() {
  // 1. STATE AND USEEFFECT HERE
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch("https://api2.binance.com/api/v3/ticker/24hr")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        const filteredData = data.filter((ticker) => {
          if (COINS.includes(ticker.symbol)) {
            return true;
          }
        });
        setCryptoData(filteredData);
      });
  }, []);

  console.log(cryptoData);

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
          </tr>
          {cryptoData.map((crypto, i) => {
            return (
              <tr key={crypto.symbol}>
                <td>{i}</td>
                <td>{COIN_NAMES[crypto.symbol]}</td>
                <td>${Number(crypto.lastPrice).toLocaleString()}</td>
                <td
                  style={
                    Number(crypto.priceChangePercent) > 0
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {Number(crypto.priceChangePercent) > 0 ? "▲" : "▼"}
                  {crypto.priceChangePercent}%
                </td>
              </tr>
            );
          })}
          {/* HINT: Map to JSX */}

          {/* Up? Green + ▲ */}
          {/* Down? Red + ▼ */}
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
