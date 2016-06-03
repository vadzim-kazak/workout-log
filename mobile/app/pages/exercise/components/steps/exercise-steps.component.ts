import {Component, Input} from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {NormalizePipe} from '../../../../common/pipes/normalize.pipe';

@Component({
  selector:'exercise-steps',
  templateUrl: 'build/pages/exercise/components/steps/exercise-steps.html',
  pipes: [NormalizePipe, TranslatePipe]
})
export class ExerciseSteps {
  @Input() exercise;
}