export interface Candle {
  Date: string;

  Open: number;
  Close: number;
  High: number;
  Low: number;
  Volume: number;
  EMA_9: number;
  EMA_21: number;
  EMA_50: number;
}

export interface Ticker {
  ticker: string;
}
