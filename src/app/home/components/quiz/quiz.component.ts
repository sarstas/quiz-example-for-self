import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

import { Question } from '@app/home/entietis/question';
import { AnswersQuiz } from '@app/home/entietis/answers-quiz';
import { QuestionService } from '@app/home/providers/question.service';
import { MyValidators } from '../../../shared/validators/my.validators'
import { AnswerQuestion } from "@app/home/entietis/answer-question";

@Component({
  selector: 'app-home',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {

  loading: boolean = false;
  questions: Question[] = [];
  toServer: AnswersQuiz = { questions: [] };
  form: FormGroup;
  private _incorrect: number;
  private _currentQuestionIdx: number = 0;

  get answersFormArray() {
    return this.form.controls.answers as FormArray;
  }

  get getCurrentQuestion() {
    return this.questions[this._currentQuestionIdx];
  }

  get getIncorrectAnswers() {
    return this.questions.length - this._incorrect
  }

  constructor(
    private questionService: QuestionService,
    private _fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.form = this._fb.group({
      answers: new FormArray([], [
        MyValidators.minSelectedCheckboxes(1)
      ]),
    });
    this._getQuizAll();
  }

  handleSubmitForm(questionId: number) {
    this.loading = true;
    const selectedAnswersIds = this.form.value.answers
      .map((checked, i) =>
        checked
          ? this.questions.find((question) => question.id === questionId).answers[i].id
          : null
      )
      .filter((res) => res !== null);
    this.toServer.questions.push({
      id: questionId,
      answerIds: selectedAnswersIds
    });
    if(this._currentQuestionIdx + 1 < this.questions.length) {
      this._nextCardQuiz();
    } else {
      this._sendDataToServer();
    }
  }

  private _nextCardQuiz() {
    this.form.reset();
    this._currentQuestionIdx++;
    this._addCheckboxes();
    this.loading = false;
  }

  private _sendDataToServer() {
    this.questionService.sendAnswers(this.toServer).subscribe((res) => {
      this._incorrect = res.length
      this.loading = false;
      this._currentQuestionIdx++;
    });
  }

  private _addCheckboxes() {
    while (this.answersFormArray.at(0)) {
      this.answersFormArray.removeAt(0);
    }

    this.getCurrentQuestion.answers.forEach(()=> {
      this.answersFormArray.push(new FormControl(false))
    })
  }

  private _previousCheckboxes(previousQuestion: AnswerQuestion) {
    while (this.answersFormArray.at(0)) {
      this.answersFormArray.removeAt(0);
    }

    this.getCurrentQuestion.answers.forEach((item)=> {
      if(previousQuestion.answerIds.find( (id) => id === item.id )) {
        this.answersFormArray.push(new FormControl(true))
      } else {
        this.answersFormArray.push(new FormControl(false))
      }

    })
  }

  private _getQuizAll(): void {
    this.loading = true;
    this.questionService.getQuestions().subscribe((questions) => {
      this.questions = questions;
      this._addCheckboxes();
      this._currentQuestionIdx = 0;
      this.loading = false;
    });
  }

  retry(): void {
    while (this.answersFormArray.at(0)) {
      this.answersFormArray.removeAt(0);
    }
    this._currentQuestionIdx = 0;
    this._addCheckboxes();
    this.toServer = { questions: [] };
  }

  back() {
    if (this._currentQuestionIdx !== 0 ) {
      this.form.reset();
      this._currentQuestionIdx--;
      // this._addCheckboxes();

      const previousQuestion: AnswerQuestion = this.toServer.questions.find((item) =>  item.id === this.getCurrentQuestion.id )

      this._previousCheckboxes(previousQuestion);
      this.loading = false;
    }

  }
}

