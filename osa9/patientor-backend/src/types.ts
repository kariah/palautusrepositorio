// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';


// properties as optional by adding a question mark (?) to the end of their names.

// interface PaintOptions {
//   shape: Shape;
//   xPos?: number;
//   yPos?: number;
// }

export interface Diagnose {
    code: string;
    name: string; 
    latin?: string;
  }