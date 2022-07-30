/**
 * 必填项提示
 */
export default function checkRequired(value: string, msg: string) {
	if (!value) {
		throw new Error(msg);
	}
}
