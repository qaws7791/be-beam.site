import { setupWorker } from 'msw/browser';
import meetingHandlers from './handlers/meetingsHandlers';

export const worker = setupWorker(...meetingHandlers);
