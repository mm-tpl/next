import equal from 'lodash.isequal';

export default function isEqual<T, P>(a: T, b: P) {
	return equal(a, b);
}
