import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IQuestion, QuestionService } from "@app/admin/providers/question.service";
import { Question } from "@app/home/entietis/question";



@Component({
  selector: "app-quiz-edit",
  templateUrl: "./quiz-edit.component.html",
  styleUrls: ["./quiz-edit.component.scss"]
})
export class QuizEditComponent implements OnInit {

  public form: FormGroup;
  public loading = false;
  private readonly _id: number;

  get answers(): FormArray {
    return this.form.get("answers") as FormArray;
  }

  constructor(
    private _questionService: QuestionService,
    private _router: Router,
    private _fb: FormBuilder,
    route: ActivatedRoute
  ) {
    this._id = +route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      question: ["", Validators.required],
      answers: this._fb.array([])
    });

    this.init();
  }

  public init() {
    if (!this._id) {
      this.addAnswer();
      return;
    }

    this._questionService.find(this._id).subscribe(
      (question: Question) => {
        const prepared = {
          question: question.question,
          answers: question.answers.map((answer) => {
            this.addAnswer(answer.value, answer.correct);
          })
        }
        this.form.patchValue(prepared)
      }
    )
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    const body = this.form.value;

    const fn = !this._id
      ? this._questionService.create(body)
      : this._questionService.edit(this._id, this.form.value);

    this.loading = true;



    fn.subscribe(
      () => {
        this._router.navigate(['/admin/master']);
      },
      (err: Error) => {
        this._validate(err);
        return err;
      }
    );
  }

  public addAnswer(answer = '', correct= false) {
    this.answers.push(
      this._fb.group({
        value: [answer],
        correct: [correct]
      })
    );
  }


  // todo should be part of common rest service
  private _validate(err) {
    if (err instanceof HttpErrorResponse) {
      const formError = err.error.data;

      for (const key in formError) {
        if (formError.hasOwnProperty(key)) {
          console.info(key);
          const control = this.form.get(key);
          if (!control) {
            continue;
          }

          control.setErrors({ server: formError[key] });
        }
      }
    }
  }

  public removeAnswer(i: number) {
    this.answers.removeAt(i)
  }
}
