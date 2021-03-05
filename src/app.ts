/*!
 * Source https://github.com/donmahallem/codecov-monorepo
 */
import { exec } from '@actions/exec';
import { getInput } from '@actions/core';
import axios from 'axios';
import { promises as fsp } from 'fs';
import { sync } from 'glob';

const downloadBash = async (): Promise<void> => {
    const data: string = await (await axios('https://codecov.io/bash', { method: 'GET' })).data;
    await fsp.writeFile('./codecov', data);
}

export const run = async (): Promise<void> => {
    await downloadBash();
    const lernaPackage: {
        packages: string[],
    } = JSON.parse(await fsp.readFile('./lerna.json', 'utf8'));

    const projectPaths: string[] = [];
    for (const packagePath of lernaPackage.packages) {
        projectPaths.push(...sync(packagePath));
    }
    console.log('Paths found', projectPaths);
    for (const projectPath of projectPaths) {
        const packageName: string = projectPath.split('/')[1];
        await exec('bash', ['./codecov', '-t', getInput('token', { required: true }), '-f', packageName, '-s', projectPath]);
    }
};
