/*!
 * Source https://github.com/donmahallem/codecov-monorepo
 */
import { readFileSync } from 'fs';
import { sync } from 'glob';
export const run = async (): Promise<void> => {
    const lernaPackage: {
        packages: string[],
    } = JSON.parse(readFileSync('./lerna.json', 'utf8'));
    const projectPaths: string[] = [];
    for (const packagePath of lernaPackage.packages) {
        projectPaths.push(...sync(packagePath));
    }
    console.log('Paths found', projectPaths);
};
