
import { Message } from '@arco-design/web-react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
// import Webcam from '@uppy/webcam';
// import ScreenCapture from '@uppy/screen-capture';
// import ImageEditor from '@uppy/image-editor';
// import OneDrive from '@uppy/onedrive';
// import Instagram from '@uppy/instagram';
import { Dashboard, useUppy } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import cn from '@uppy/locales/lib/zh_CN';
import { Result as R1 } from '../api/imp/data.api';
import api from '../../atoms/api';

/**
 * 上传组件
 */
export default function Uploader() {
	const uppy = useUppy(() => {
		const uppy = Uppy({
			allowMultipleUploads: true,
			autoProceed: true,
			debug: true,
			restrictions: {
				maxFileSize: 1000000,
				maxNumberOfFiles: 3,
				minNumberOfFiles: 1,
				allowedFileTypes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/wps-office.xlsx']
			},
			locale: cn
		});
		uppy.use(XHRUpload, {
			fieldName: 'file',
			formData: true,
			method: 'PUT',
			endpoint: api['/api/imp/data'],
			timeout: 6000000	// 60 * 1000 * 100
		});
		uppy.on('complete', (result) => {
			// 以下代码可将上传的内容变成下载链接,放在页面上.
			const [success] = result.successful;
			if (success) {
				const flag = success.response.body as R1;
				if (flag) {
					Message.success('上传成功');
				} else {
					Message.error('上传失败,请查看服务日志文件,位于 ./logs/mm.log');
				}
			} else {
				Message.error('上传失败,请查看服务日志文件,位于 ./logs/mm.log');
			}
		});
		return uppy;
	});
	return <Dashboard uppy={uppy} />;
}
