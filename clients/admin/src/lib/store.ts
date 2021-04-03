import { Readable, Writable, writable } from 'svelte/store';

export type Store<T> = Writable<T> & { get(): T };

export function store<T>(value: T): Store<T> {
    let originalWritable = writable<T>(value);
    function set(newValue: any) {
        return originalWritable.set((value = newValue));
    }
    function update(fn: (originalValue: T) => T) {
        originalWritable.update((oldValue: T) => (value = fn(oldValue)));
    }
    function get() {
        return value;
    }
    return { set, update, subscribe: originalWritable.subscribe, get };
}
