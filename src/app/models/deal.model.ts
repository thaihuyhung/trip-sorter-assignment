export class DealModel {
  /**
   * train, bus, car.
   */
  transport: string;
  /**
   * departure city’s name
   */
  departure: string;
  /**
   * arrival city’s name
   */
  arrival: string;
  /**
   * trip’s duration
   */
  duration: {
    h: string;
    m: string
  }
  /**
   * cost not discounted, this is the base price
   */
  cost: number;
  /**
   * discount in % to apply to the base price
   */
  discount: number;
  /**
   * deal unique reference number
   */
  reference: string;
}