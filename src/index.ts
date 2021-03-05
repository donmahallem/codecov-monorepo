/*!
 * Source https://github.com/donmahallem/codecov-monorepo
 */
import { error, info } from '@actions/core';
import { run } from './app';

run()
    .then((): void => {
        info('Success');
    })
    .catch((err: any): void => {
        error(err?.message || 'Error occured');
    });
