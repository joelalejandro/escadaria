class Stair {
  /**
   *
   * @param staircase {Staircase}
   * @param settings
   */
  constructor(staircase, settings) {
    const defaults = {
      trial: 0,
      wrong: 0,
      right: 0,
      direction: 0,
      reversal: [],
      reversalStimulusVal: [],
      hitBoundaries: 10,
      up: staircase.options.up,
      down: staircase.options.down,
      condition: 1,
      maxBoundaries: staircase.options.maxBoundaries,
      minStimulusVal: staircase.options.minStimulusVal,
      maxStimulusVal: staircase.options.maxStimulusVal,
      stimulusVal: 0,
      initial: 0
    };

    Object.assign(this, defaults, settings);
  }
}

export default Stair;
