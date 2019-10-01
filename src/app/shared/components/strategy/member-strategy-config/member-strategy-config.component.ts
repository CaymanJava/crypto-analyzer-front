import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MemberStrategy, MemberStrategyStatus } from "../../../../core/member-strategy/member-strategy.model";

@Component({
  selector: 'app-member-strategy-config',
  templateUrl: './member-strategy-config.component.html'
})
export class MemberStrategyConfigComponent implements OnInit {

  @Input() memberStrategy: MemberStrategy;
  @Input() strategyName: string;

  memberStrategyForm: FormGroup;

  constructor(private modal: NgbActiveModal,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  isDisabled() {
    return this.memberStrategy != null
      && (MemberStrategyStatus.isFailed(this.memberStrategy.status)
        || MemberStrategyStatus.isStopped(this.memberStrategy.status));
  }

  onSubmit() {
    this.modal.close({
      update: this.memberStrategy != null,
      config: {
        updateTimeUnit: this.memberStrategyForm.get('updateTimeUnit').value,
        updateTimeValue: this.memberStrategyForm.get('updateTimeValue').value,
        customStrategyName: this.memberStrategyForm.get('customStrategyName').value,
        immediatelyStart: this.memberStrategyForm.get('immediatelyStart').value,
        active: this.memberStrategyForm.get('active').value,
      }
    });
  }

  private initForm() {
    this.memberStrategyForm = this.fb.group({
      'updateTimeUnit': ['', Validators.required],
      'updateTimeValue': ['', [Validators.required, Validators.min(1)]],
      'customStrategyName': ['', Validators.required],
      'active': [''],
      'immediatelyStart': [true]
    });
    if (this.memberStrategy != null) {
      this.memberStrategyForm.setValue({
        updateTimeUnit: this.memberStrategy.updateTimeUnit,
        updateTimeValue: this.memberStrategy.updateTimeValue,
        customStrategyName: this.memberStrategy.customStrategyName,
        active: MemberStrategyStatus.isActive(this.memberStrategy.status),
        immediatelyStart: false
      });
    }
  }

}
