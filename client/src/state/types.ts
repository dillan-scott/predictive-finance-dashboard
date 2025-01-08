export interface TradingDay {
  Date: string;

  Open: number;
  Close: number;
  High: number;
  Low: number;
  Volume: number;

  EMA_9: number | string;
  EMA_21: number | string;
  EMA_50: number | string;
}
