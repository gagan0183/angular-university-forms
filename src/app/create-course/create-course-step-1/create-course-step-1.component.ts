import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CoursesService } from '../../services/courses.service';
import { courseTitleValidator } from '../../validators/course-title.validator';

interface CourseCategory {
  code: string;
  description: string;
}

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
    }],
    category: ['BEGINNER', Validators.required],
    releasedAt: [new Date(), Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['', Validators.minLength(5)]
  })

  courseCategories$: Observable<CourseCategory[]>;

  constructor(private fb: FormBuilder, private courseService: CoursesService) {
  }

  ngOnInit() {
    this.courseCategories$ = this.courseService.findCourseCategories();
    if (localStorage.getItem("STEP_1")) {
      this.form.patchValue(JSON.parse(localStorage.getItem("STEP_1")));
    }
    this.form.valueChanges
    .pipe(filter(() => this.form.valid))
    .subscribe(value => localStorage.setItem("STEP_1", JSON.stringify(value)));
  }

  get courseTitle() {
    return this.form.controls['title'];
  }
}
