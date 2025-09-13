import { Mutex } from 'async-mutex';

const mutex = new Mutex();

export const withConcurrencyControl = async (callback: () => Promise<void>) => {
    const release = await mutex.acquire();
    try {
        await callback();
    } finally {
        release();
    }
};