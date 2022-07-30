import api from './api';

export default function getfile(fileid: string) {
	return `${api['/api/file/id']}/${fileid}`;
}
