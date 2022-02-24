export default function base64encode(input: string) {
	const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	let output = '';
	let i = 0;
	input = utf8_encode(input);
	while (i < input.length) {
		const chr1 = input.charCodeAt(i++);
		const chr2 = input.charCodeAt(i++);
		const chr3 = input.charCodeAt(i++);
		const enc1 = chr1 >> 2;
		const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		let enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	}
	return output;
}

function utf8_encode(input: string) {
	input = input.replace(/\r\n/g, '\n');
	let utftext = '';
	for (let n = 0; n < input.length; n++) {
		const c = input.charCodeAt(n);
		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}

	}
	return utftext;
}
