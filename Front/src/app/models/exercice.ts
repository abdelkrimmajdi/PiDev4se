import { Intensity } from "./intensity.enum";

export class Exercice{
    idExer!: number;
    nameExer!: string;
    descriptionExe!: string;
    durationExer!: number;
    intensity!: Intensity;
    muscle!: string;
    picture!: string;
    videoExer!:string;
  }