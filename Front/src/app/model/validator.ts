import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static dateTimeRange(control: AbstractControl): ValidationErrors | null {
    const selectedDateTime = new Date(control.value);
    const hour = selectedDateTime.getHours();

    // Vérifie si le jour est samedi ou dimanche
    const dayOfWeek = selectedDateTime.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return { 'invalidDay': true };
    }

    // Vérifie si l'heure est entre 9h et 16h, excluant 13h
    if (hour < 9 || (hour >= 13 && hour < 16)) {
      return { 'invalidTime': true };
    }

    // Vérifie si l'heure est seulement 9h, 9h30, 10h, 10h30, ..., 15h30
    const minutes = selectedDateTime.getMinutes();
    if (minutes !== 0 && minutes !== 30) {
      return { 'invalidMinutes': true };
    }

    return null;
  }
}