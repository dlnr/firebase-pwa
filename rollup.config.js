import { string } from 'rollup-plugin-string';
import babel from 'rollup-plugin-babel';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
// import OMT from '@surma/rollup-plugin-off-main-thread';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

const BROWSER_TARGET = {
    browsers: ['chrome >= 90'],
};

const NODE_TARGET = {
    node: '16',
};

export default [{
    input: 'src/server.js',
    external: [
        'express',
        'firebase-functions',
        'https',
    ],
    plugins: [
        string({
            include: 'build/partials/**/*.html',
        }),
        babel({
            presets: [['@babel/preset-env', {
                targets: NODE_TARGET,
                modules: false,
            }]],
        }),
    ],
    output: {
        file: 'functions/index.js',
        format: 'cjs',
    },
}, {
    input: 'src/service-worker.mjs',
    manualChunks: (id) => {
        if (!id.includes('/node_modules/')) {
            return undefined;
        }

        const chunkNames = [
            'html-escaper',
            'regexparam',
            'workbox',
        ];

        return chunkNames.find((chunkName) => id.includes(chunkName)) || 'misc';
    },
    plugins: [
        replace({
            'preventAssignment': true,
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV || 'development'),
        }),
        resolve({
            browser: true,
        }),
        babel({
            presets: [['@babel/preset-env', {
                targets: BROWSER_TARGET,
                modules: false,
            }]],
        }),
        // OMT(),
        compiler(),
    ],
    output: {
        dir: 'build',
        format: 'amd',
    },
}, {
    input: 'src/app.mjs',
    plugins: [
        resolve({
            browser: true,
        }),
        babel({
            presets: [['@babel/preset-env', {
                targets: BROWSER_TARGET,
                modules: false,
            }]],
        }),
        compiler(),
    ],
    output: {
        file: 'build/app.js',
        format: 'iife',
        sourcemap: true,
    },
}];
