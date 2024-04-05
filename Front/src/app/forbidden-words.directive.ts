import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appForbiddenWords]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenWordsDirective, multi: true }]
})
export class ForbiddenWordsDirective implements Validator {
  @Input('appForbiddenWords') set forbiddenWords(value: string | string[]) {
    this._forbiddenWords = typeof value === 'string' ? value.split(',') : value;
  }
  private _forbiddenWords: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this._forbiddenWords || this._forbiddenWords.length === 0) {
      return null; // Pas de mots interdits spécifiés, pas de validation nécessaire
    }

    const forbiddenWordsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
      if (!value) {
        return null; // Si la valeur est vide, pas de validation nécessaire
      }

      const foundForbiddenWords: string[] = this._forbiddenWords.filter(word => new RegExp('\\b' + word + '\\b', 'i').test(value));
      return foundForbiddenWords.length > 0 ? { 'forbiddenWords': { value: foundForbiddenWords } } : null;
    };

    return forbiddenWordsValidator(control);
  }
}
