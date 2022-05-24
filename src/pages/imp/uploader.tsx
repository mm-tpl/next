import { useState } from 'react';
import { Message, Upload } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { File, Result } from '../api/file/upload.api';
import deletefile from '../api/file/delete/deletefile';
import api from '../../atoms/api';

/**
 * 文件上传
 */
export default function Uploader({
	multiple = false,
	defaultFiles = [],
	onChange
}: {
	multiple: boolean;
	defaultFiles: File[];
	onChange(files: File[]): void;
}) {
	const endpoint = api['/api/imp/data'];
	const getfile = api['/api/file/id'];
	const [filelist, setfilelist] = useState(defaultFiles.map((file) => {
		return {
			uid: file.fileid,
			name: file.filename,
			response: {
				fileid: file.fileid,
				filename: file.filename
			},
			status: 'done',
			url: `${getfile}/${file.fileid}`
		} as UploadItem;
	}));
	return <>
		<Upload
			multiple={multiple}
			fileList={filelist}
			action={endpoint}
			onChange={(files, file) => {
				onChange(files.filter((file) => {
					return file.status === 'done';
				}).map((file) => {
					const res = file.response as Result;
					return {
						fileid: res.fileid,
						filename: res.filename
					};
				}));
				setfilelist(files);
			}}
			beforeUpload={(file) => {
				// 全部图片类型
				// if (/image/.test(file.type)) {
				// 	return true;
				// }
				// 只是jpg
				// if (/image\/(jpeg|jpg)/.test(file.type)) {
				// 	return true;
				// }
				// 视频文件
				// if (/video/.test(file.type)) {
				// 	return true;
				// }
				// 压缩文件
				// if (/application\/(x-7z-compressed|x-gzip|zip|x-rar)/.test(file.type)) {
				// 	return true;
				// }
				// Word
				// if (/application\/(vnd\.openxmlformats-officedocument\.wordprocessingml\.document|wps-office\.docx)/.test(file.type)) {
				// 	return true;
				// }
				// Excel
				if (/application\/(vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|wps-office\.xlsx)/.test(file.type)) {
					return true;
				}
				// Ppt
				// if (/application\/(vnd\.ms-powerpoint|vnd\.openxmlformats-officedocument\.presentationml\.presentation|wps-office\.pptx)/.test(file.type)) {
				// 	return true;
				// }
				// Pdf
				// if (/application\/pdf/.test(file.type)) {
				// 	return true;
				// }
				Message.error('不支持的文件类型');
				return false;
			}}
		// onRemove={async (file) => {
		// 	// todo 如果不希望直接在文件服务器删除文件，而是在业务逻辑上删除文件，去掉以下代码
		// 	const res = file.response as Result;
		// 	await deletefile({
		// 		id: res.fileid
		// 	});
		// }}
		/>
	</>;
}
