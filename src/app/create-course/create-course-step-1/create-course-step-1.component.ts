import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { courseTitleValidator } from '../../validators/course-title.validator';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: ['', {
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(60)],
      asyncValidators: [courseTitleValidator(this.courseService)],
      updateOn: 'blur'
    }]
  })

  constructor(private fb: FormBuilder, private courseService: CoursesService) {
  }

  ngOnInit() {
  }

  get courseTitle() {
    return this.form.controls['title'];
  }
}
