import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-finish-block',
  templateUrl: './finish-block.component.html',
  styleUrls: ['./finish-block.component.scss']
})
export class FinishBlockComponent implements OnInit {

  @Input() loading: boolean;
  @Input() getIncorrectAnswers: number;
  @Input() questionsLength: number;
  @Output() toRetry: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  retry() {
    this.toRetry.emit()
  }
}
