export interface Candle {
  Date: string;

  Open: number;
  Close: number;
  High: number;
  Low: number;
  Volume: number;
}

export interface Ticker {
  ticker: string;
}
