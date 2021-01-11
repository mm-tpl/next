import anylogger from 'anylogger';

const logger = anylogger('schedules001');

export default function a001(data: unknown) {
	logger.debug(data);
}
