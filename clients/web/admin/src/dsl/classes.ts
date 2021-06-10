import type { CssClassesType, DepthType } from './types';

const noDepth = ['white', 'black', 'transparent'];

function getClass(prop: string, color: string, depth: DepthType, defaultDepth: DepthType): string {
    if (noDepth.includes(color)) {
        return `${prop}-${color}`;
    }
    return `${prop}-${color}-${depth || defaultDepth} `;
}

export default function utils(color: string, defaultDepth: DepthType = 500) {
    return {
        bg: (depth: DepthType = defaultDepth) => getClass('bg', color, depth, defaultDepth),
        border: (depth: DepthType = defaultDepth) => getClass('border', color, depth, defaultDepth),
        txt: (depth: DepthType = defaultDepth) => getClass('text', color, depth, defaultDepth),
        caret: (depth: DepthType = defaultDepth) => getClass('caret', color, depth, defaultDepth),
    };
}

export const noop: CssClassesType = (i: any) => i;

export class ClassBuilder {
    classes: string;
    defaults: string;

    constructor(classes: CssClassesType, defaultClasses = '') {
        this.defaults =
            (typeof classes === 'function' ? classes(defaultClasses) : classes) || defaultClasses;

        this.classes = this.defaults;
    }

    flush() {
        this.classes = this.defaults;

        return this;
    }

    extend(...fns: any[]) {
        return this;
    }

    get() {
        return this.classes;
    }

    replace(classes: any, cond = true) {
        if (cond && classes) {
            this.classes = Object.keys(classes).reduce(
                (acc, from) => acc.replace(new RegExp(from, 'g'), classes[from]),
                this.classes,
            );
        }

        return this;
    }

    remove(classes: string, cond = true) {
        if (cond && classes) {
            this.classes = classes
                .split(' ')
                .reduce((acc, cur) => acc.replace(new RegExp(cur, 'g'), ''), this.classes);
        }

        return this;
    }

    add(className: CssClassesType, cond = true, defaultValue = '') {
        if (!cond || !className) return this;

        switch (typeof className) {
            case 'string':
            default:
                this.classes += ` ${className} `;
                return this;
            case 'function':
                this.classes += ` ${className(defaultValue || this.classes)} `;
                return this;
        }
    }
}

const defaultReserved = ['class', 'add', 'remove', 'replace', 'value'];

export function filterProps(reserved: string[], props: any) {
    const r = [...reserved, ...defaultReserved];

    return Object.keys(props).reduce(
        (acc, cur) =>
            cur.includes('$$') || cur.includes('Class') || r.includes(cur)
                ? acc
                : { ...acc, [cur]: props[cur] },
        {},
    );
}
