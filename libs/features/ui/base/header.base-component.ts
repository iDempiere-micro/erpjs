import { EventEmitter, Input, Output } from '@angular/core';
// libs
import { BaseComponent } from '@erp/core/base';

export abstract class HeaderBaseComponent extends BaseComponent {
  /**
   * These are just samples to give you an idea of what can be done.
   * Change, remove and customize however you'd like!
   */
  @Input() title: string;
  @Input() rightButton: string;
  @Output() tappedRight: EventEmitter<boolean> = new EventEmitter();
}
