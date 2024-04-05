   import { Exercice } from "./exercice";
   export class WorkoutSession {
    idWork!: number; // TypeScript uses camelCase for variables
    date!: Date;
    duration!: number;
    exercises!: Exercice[]; // Use an array of Exercise objects
  }