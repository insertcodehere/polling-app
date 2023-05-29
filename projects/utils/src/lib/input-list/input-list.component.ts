import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';



@Component({
  selector: 'input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss']
})
export class InputListComponent implements OnInit, OnChanges {

  protected itemsForm = this._createInputForm();

  @Input()
  items: string[] = ['', ''];

  @Output()
  valueChanges = new EventEmitter<string[]>();

  get removeDisabled(): boolean {
    return this.itemsForm.length <= 2;
  }

  constructor() { }

  ngOnInit() {
    this.itemsForm.valueChanges.subscribe(changes => {
      this.valueChanges.next(changes as string[]);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const items = changes['items'];
    if (items) {
      this._updateInputForm(items.currentValue);
    }
  }

  addOption(): void {
    this.itemsForm.push(new FormControl(''));
  }

  removeOption(index: number): void {
    this.itemsForm.removeAt(index);
  }

  getControl(index: number): FormControl {
    return this.itemsForm.get([index]) as FormControl;
  }

  private _createInputForm(): FormArray<FormControl<string | null>> {
    return new FormArray([
      new FormControl(''),
      new FormControl('')
    ]);
  }

  private _updateInputForm(values: string[]): void {
    for (const [index, value] of values.entries()) {
      const control = this.itemsForm.get([index]) as FormControl;
      control.setValue(value);
    }

    while (this.itemsForm.length > values.length) {
      this.itemsForm.removeAt(-1);
    }
  }

}
