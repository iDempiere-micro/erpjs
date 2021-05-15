'use strict'

import {Readable, Stream} from 'stream'

/**
 * Returns a boolean indicating whether a value is a Stream 
 * 
 * @param val - Value to test
 * @returns Boolean indicating whether `val` is a Stream
 */
export function IsStream(val: any): boolean {
    return (typeof val == 'object' && typeof val.pipe == 'function')
}

/**
 * Returns a boolean indicating whether a value is a Readable Stream 
 * 
 * @param val - Value to test
 * @returns Boolean indicating whether `val` is a Readable Stream
 */
export function IsReadableStream(val: any): boolean {
    return (IsStream(val) && typeof val.read === 'function')
}

/**
 * Returns a Buffer with data read from the stream.
 * 
 * @param stream - Stream to read data from
 * @returns Promise that resolves to a Buffer containing the data from the stream
 * @async
 */
export function StreamToBuffer(stream: Stream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const buffersCache = []
        stream.on('data', (data: Buffer) => {
            buffersCache.push(data)
        })
        stream.on('end', () => {
            resolve(Buffer.concat(buffersCache))
        })
        stream.on('error', (error) => {
            reject(error)
        })
    })
}

/**
 * Returns a string with data read from the stream.
 * 
 * @param stream - Stream to read data from
 * @param encoding - String encoding to use; defaults to utf8
 * @returns Promise that resolves to a string containing the data from the stream
 * @async
 */
export function StreamToString(stream: Stream, encoding?: string): Promise<string> {
    return StreamToBuffer(stream)
        .then((buffer) => {
            return buffer.toString(encoding || 'utf8')
        })
}

/**
 * Reads a certain amount of bytes from the beginning of a Stream, returning a Buffer.
 * The amount of data read might be smaller if the stream ends before it could return the amount of data requested.
 * 
 * If the `peek` argument is true, the data is put back into the beginning of the stream, so it can be consumed by another function
 * 
 * Note that this function will pause the stream, so you might need to call the `resume` method on it to make it flow again.
 * 
 * If passing a stream that has already ended, the function could enter into an infinite loop and return a Promise that never resolves. It's your responsibility to ensure that streams passed to this function still have data to return.
 * 
 * @param stream - Readable Stream to read data from
 * @param size - Amount of data to read
 * @param peek - If true, after reading the data it is added back to the beginning of the stream
 * @returns Promise that resolves to a Buffer with a length of at most `size`
 * @async
 */
export function ReadChunkFromStream(stream: Readable, size: number, peek?: boolean): Promise<Buffer> {
    // Return an error if stream is not a Readable Stream
    if (!stream || !IsReadableStream(stream)) {
        throw Error('Argument stream must be a Readable Stream')
    }

    // Ensure the stream isn't flowing
    stream.pause()

    // Returns a promise that resolves when we have read enough data from the stream.
    return new Promise((resolve, reject) => {
        // Callbacks on events
        const errorEvent = (err) => {
            reject(err)
        }
        const readableEvent = () => {
            // If we don't have enough data, and the stream hasn't ended, this will return null
            const data = stream.read(size)
            if (data) {
                if (peek) {
                    // Put the data we read back into the stream
                    stream.unshift(data)
                }

                // Stop listening on callbacks
                stream.removeListener('error', errorEvent)

                // Return the data
                resolve(data)
            }
            else {
                // We need to wait longer for more data
                stream.once('readable', readableEvent)
            }
        }

        // Listen to the readable event and in case of error
        stream.once('readable', readableEvent)
        stream.on('error', errorEvent)
    })
}
