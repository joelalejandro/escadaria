import Stair from './Stair';
import random from 'random-to';
import { restrictNumber } from './Utils';

class Staircase {

  /**
   * Creates a Staircase object.
   * @param settings
   */
  constructor(settings) {

    /**
     * Default values for Staircase.
     * @type {{maxTrials: number, minStimulusVal: number, maxStimulusVal: number, maxBoundaries: number, fixedStepSizes: number[], up: number, down: number, initialStairs: number[]}}
     */
    const defaults = {
      maxTrials: 100,
      minStimulusVal: 0.01,
      maxStimulusVal: 1,
      maxBoundaries: 3,
      fixedStepSizes: [0.1, 0.05, 0.05, 0.05, 0.025],
      up: 1,
      down: 3,
      initialStairs: [0.01, 0.5],
      side: [],
      response: [],
      correct: []
    };

    /**
     * Contains the settings for the instance.
     * @type {*}
     */
    this.options = Object.assign({}, defaults, settings);

    /**
     *
     * @type {Array.<Stair>}
     */
    this.stairs = [];
    this.trial = 0;

    this.options.initialStairs.forEach((initial) => {
      this.stairs.push(new Stair(this, { initial: initial }));
    });

  }

  /**
   * @returns {Promise}
   */
  runTrial() {
    return new Promise((resolve, reject) => {
      let stairIndex = this.trial < 4
        ? this.stairs.findIndex((stair) =>
            stair.initial == Math.max.apply(null, this.stairs.map(s => s.initial))
          )
        : random.from0upto(this.stairs.length);

      let currentStair = this.stairs[stairIndex];

      if (currentStair.trial >= this.options.maxTrials) {
        reject('MAX_TRIALS');
      }

      currentStair.trial += 1;

      let stimulusVal = currentStair.stimulusVal;
      let direction = currentStair.direction;
      let reversals = currentStair.reversalStimulusVal;

      let stepSize = 0;
      let stepIndex = 0;

      if (reversals.length < this.options.fixedStepSizes.length) {
        stepIndex = reversals.length;
      } else {
        stepIndex = this.options.fixedStepSizes.length - 1;
      }
      stepSize = this.options.fixedStepSizes[stepIndex];
      stimulusVal += direction * stepSize;

      stimulusVal = restrictNumber(stimulusVal, currentStair.maxStimulusVal, currentStair.minStimulusVal);

      currentStair.stimulusVal = stimulusVal;
      resolve(currentStair);
    });
  }
}

export default Staircase;
