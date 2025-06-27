import { HlmSwitchComponent } from '../../../libs/ui/ui-switch-helm/src/lib/hlm-switch.component';

import { HlmButtonDirective } from '../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';

import { Component } from '@angular/core';

@Component({
  selector: 'app-card-item',
  imports: [HlmSwitchComponent, HlmButtonDirective],
  templateUrl: './card-item.html',
  standalone: true,
})

export class CardItem {
  isChecked = false;

  onCheckedChanged(checked: boolean) {
    this.isChecked = checked;
  }
}
