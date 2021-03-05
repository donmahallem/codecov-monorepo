/*!
 * Source https://github.com/donmahallem/codecov-monorepo
 */
import { expect } from 'chai';
import * as root from './app';

// tslint:disable:no-unused-expression
describe('dummy test', (): void => {
    it('should pass', (): void => {
        expect(root.run).to.exist;
    });
});
