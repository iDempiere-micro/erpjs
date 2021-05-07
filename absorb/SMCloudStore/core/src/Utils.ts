'use strict'

/**
 * Returns a Promise that resolves after a certain amlount of time (in ms)
 * 
 * @param delay - ms to wait
 * @returns Promise that resolves after the delay
 * @async
 */
export function WaitPromise(delay: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}
