import { HlmSwitchComponent } from '../../../libs/ui/ui-switch-helm/src/lib/hlm-switch.component';

import { HlmButtonDirective } from '../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Extension } from '../extension.model';

@Component({
  selector: 'app-card-item',
  imports: [HlmSwitchComponent, HlmButtonDirective],
  templateUrl: './card-item.html',
  standalone: true,
})
export class CardItem implements OnChanges {
  @Input() extension!: Extension;
  @Input() onDelete: (extension: Extension) => void = () => {};
  isActive = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['extension'] && this.extension) {
      this.isActive = this.extension.isActive;
    }
  }

  onCheckedChanged(checked: boolean) {
    this.isActive = checked;
    if (this.extension) {
      this.extension.isActive = checked;
    }
  }

  removeExtension(extension: Extension) {
    if (this.onDelete) {
      this.onDelete(extension);
    }
  }
}
