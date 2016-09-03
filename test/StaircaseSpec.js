/**
 * escadaria
 *
 * Copyright © 2016 Joel A. Villarreal Bertoldi. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import Staircase from '../src/Staircase';


describe('Staircase', () => {

  describe('runTrial()', () => {

    it('should run a trial', (done) => {
      const sc = new Staircase();
      sc.runTrial().then((_) => {
        done();
      });
    });

    it('should run maxTrials = 100', (done) => {
      const sc = new Staircase();
      let promises = [];
      for (let i = 0; i < sc.options.maxTrials; i++) {
        promises.push(sc.runTrial);
      };
      Promise.all(promises).then((_) => {
        done();
      });
    });

    it('should not run past maxTrials = 100 on all stairs (loop will try 210)', (done) => {
      const sc = new Staircase();
      let promises = [];
      for (let i = 0; i < sc.options.maxTrials + 110; i++) {
        promises.push(sc.runTrial);
      };
      Promise.all(promises).then((_) => {
        done(new Error('Passed the 100 test boundary.'));
      }).catch((reason) => {
        if (reason === 'MAX_TRIALS') {
          done();
        } else {
          done(new Error(reason));
        }
      });
    })

  });

});
