import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectProgramService {

  selectedProgramId: number | null = null;
  duration: number | null = null;
  IdUser: number | null = null;

  constructor() { }}
