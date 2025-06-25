import { setupWorker } from 'msw/browser';
import meetingHandlers from './handlers/meetingsHandlers';
import guidBookHandlers from './handlers/guidBooksHandler';

export const worker = setupWorker(...meetingHandlers, ...guidBookHandlers);
