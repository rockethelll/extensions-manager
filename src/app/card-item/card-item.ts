import { HlmSwitchComponent } from '../../../libs/ui/ui-switch-helm/src/lib/hlm-switch.component';

import { HlmButtonDirective } from '../../../libs/ui/ui-button-helm/src/lib/hlm-button.directive';

import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Extension } from '../extension.model';
import { ExtensionService } from '../extension.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-item',
  imports: [HlmSwitchComponent, HlmButtonDirective],
  templateUrl: './card-item.html',
  standalone: true,
})
export class CardItem implements OnChanges {
  constructor(
    private extensionService: ExtensionService,
    private router: Router
  ) {}

  @Input() extension!: Extension;
  isActive = false;
  @Output() extensionRemoved = new EventEmitter<number>();

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
    this.extensionService
      .removeExtensionById(extension.id)
      .subscribe(() => this.extensionRemoved.emit(extension.id));
  }
}
