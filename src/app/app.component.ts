import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private fb: FormBuilder) {}
  title = 'myApp';
  form = this.fb.group({
    products: this.fb.array([this.createBasicControl()])
  });


  ngOnInit(): void {
    this.listenChanges();

  }

  public createBasicControl(): FormGroup {
    return this.fb.group({
      licensesNumber: 0,
      type: '',
      value: [1, Validators.compose([
        Validators.min(1), Validators.max(100), Validators.maxLength(2)])]
    });
  }

  public addBasicSubControl(formcontrol: string): void {
    const items = this.form.get(formcontrol) as FormArray;
    items.push(this.createBasicControl());
  }

  get formProducts() {
// tslint:disable-next-line: no-angle-bracket-type-assertion
    return <FormArray> this.form.get('products');
  }

  listenChanges() {
    this.formProducts.valueChanges.subscribe((data) => {
      data.forEach((element, index) => {
        if (element.value > 100) {
          this.formProducts.get([index]).patchValue({value:100});
    }
        if (element.value < 1) {
      this.formProducts.get([index]).patchValue({value:1});
    }
    debugger;
    if (element.type === 's') {
      this.formProducts.get([index]).patchValue({type:'sebas'});
    }

 });
    });
  }
  manipulateForm(type, index) {
    switch (type) {
      case 1:
      console.log('Incrementar');
      this.formProducts.get([index]).patchValue({value:parseInt(this.form.get('value').value, 10) + 1});
      break;
      case 2:
      console.log('Decrementar');
      this.formProducts.get([index]).patchValue({value:parseInt(this.form.get('value').value, 10) - 1});

      break;
    }
    this.formProducts.get([index]).updateValueAndValidity();
  }
}
