import {TemplateRef} from '@angular/core';

export interface Dialog {
  title?: string;
  content: string;
  yesText: string;
  noText?: string;
}
