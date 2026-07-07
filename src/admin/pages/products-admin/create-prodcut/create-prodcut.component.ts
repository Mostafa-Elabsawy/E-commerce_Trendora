import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-create-prodcut',
  imports: [],
  templateUrl: './create-prodcut.component.html',
  styleUrl: './create-prodcut.component.css',
})
export class CreateProdcutComponent {
  state = input<boolean>(false);
  stateChange = output<boolean>();
  closeModal() {
    this.stateChange.emit(false);
  }
}
