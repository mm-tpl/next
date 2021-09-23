// import { useState } from 'react';
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import cn from '@uppy/locales/lib/zh_CN';
import { Dashboard, useUppy } from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/status-bar/dist/style.css';
import { useToasts } from '@geist-ui/react';
import { Result } from '../pages/api/file/upload.api';
import api from '../atoms/api';

type fileType = 'image' | 'video' | 'image+video' | 'excel' | 'word' | 'ppt' | 'office' | 'zip' | 'pdf';

/**
 * 文件上传
 */
export default function Uploader({
	onChange,
	type,
	multiple,
	height = '10rem'
}: {
	multiple: boolean;
	type: fileType;
	height?: string;
	onChange(filepath: string): void;
}) {
	const endpoint = api['/api/file/upload'];
	const getfile = api['/api/file/id'];
	const [, toast] = useToasts();
	const uppy = useUppy(() => {
		const uppy = Uppy({
			allowMultipleUploads: multiple,
			autoProceed: true,
			debug: true,
			restrictions: {
				maxFileSize: 10737418240,	// 10gb 1024=1kb 1024*1024=1mb 1024*1024*1024=1gb
				maxNumberOfFiles: 1,
				minNumberOfFiles: 1,
				allowedFileTypes: getfiletypes(type)
			},
			locale: cn
		});
		uppy.use(XHRUpload, {
			fieldName: 'file',
			formData: true,
			method: 'PUT',
			endpoint,
			timeout: 600000	// 10分钟 1000 * 60 * 10
		});
		uppy.on('complete', (result) => {
			const [success] = result.successful;
			if (success) {
				const ret = success.response.body as Result;
				if (ret.ok) {
					toast({
						text: '上传成功',
						type: 'success'
					});
					const file = `${getfile}/${ret.fileid}`;
					onChange(file);
				} else {
					toast({
						text: '上传失败',
						type: 'error'
					});
				}
			}
		});
		uppy.on('error', () => {
			toast({
				text: '上传失败',
				type: 'error'
			});
		});
		return uppy;
	});
	return <>
		<Dashboard
			uppy={uppy}
			height={height}
		/>
	</>;
}

function getfiletypes(type: fileType) {
	switch (type) {
		case 'image':
			return ['image/*'];
		case 'video':
			return ['video/*'];
		case 'image+video':
			return ['image/*', 'video/*'];
		case 'zip':
			return ['application/x-7z-compressed', 'application/x-gzip', 'application/zip', 'application/x-rar'];
		case 'word':
			return ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/wps-office.docx'];
		case 'excel':
			return ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/wps-office.xlsx'];
		case 'ppt':
			return ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/wps-office.pptx'];
		case 'pdf':
			return ['application/pdf'];
		case 'office':
			return ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/wps-office.docx', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/wps-office.xlsx', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/wps-office.pptx'];
		default:
			return ['*/*'];
	}
}
