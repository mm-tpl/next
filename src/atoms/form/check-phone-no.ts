

/**
 * 验证手机号
 */
export default function checkPhoneNo(num: string) {
	const reg_phone = /^1\d{10}$/;
	if (reg_phone.test(num)) {
		return true;
	}
	return false;
}
