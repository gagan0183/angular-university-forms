import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPromoRangeValidator } from '../../validators/date-range.validator';

@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss']
})
export class CreateCourseStep2Component implements OnInit {
  form: FormGroup = this.fb.group({
    courseType: ['premium', Validators.required],
    price: [null, [
      Validators.required,
      Validators.min(1),
      Validators.max(9999),
      Validators.pattern('[0-9]+')
    ]],
    promoStartAt: [null, Validators.required],
    promoEndAt: [null, Validators.required]
  },
  {
    validators: [createPromoRangeValidator()],
    updateOn: "blur"
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      const priceControl = this.form.controls["price"];
      if (value.courseType === "free" && priceControl.enabled) {
        priceControl.disable({ emitEvent: false });
      } else if (value.courseType === "premium" && priceControl.disabled) {
        priceControl.enable({ emitEvent: false })
      }
    })
  }
}
