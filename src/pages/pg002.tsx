import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
import { useToasts } from '@geist-ui/react';
import { Result as R1 } from './api/pg002/s001';

const s001 = '/api/pg002/s001';
interface IProps {
}

/**
 * 导入数据表
 */
const page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>导入数据表</title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
				<link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon-32x32.ico" ></link>
				<link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon-16x16.ico"></link>
			</Head>
			<C002></C002>
			<C001></C001>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default page;

/**
 * 上传组件
 */
function C001() {
	const [, toast] = useToasts();
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
			}
		});
		uppy.use(XHRUpload, {
			fieldName: 'file',
			formData: true,
			method: 'PUT',
			endpoint: s001
		});
		uppy.on('complete', (result) => {
			// 以下代码可将上传的内容变成下载链接,放在页面上.
			const [success] = result.successful;
			if (success) {
				const flag = success.response.body as R1;
				if (flag) {
					toast({
						text: '上传成功',
						type: 'success'
					});
				} else {
					toast({
						text: '上传失败,请查看服务日志文件,位于 ./logs/mm.log',
						type: 'error'
					});
				}
			} else {
				toast({
					text: '上传失败,请查看服务日志文件,位于 ./logs/mm.log',
					type: 'error'
				});
			}
		});
		return uppy;
	});
	return <Dashboard uppy={uppy} />;
}

/**
 * 下载组件
 */
function C002() {
	return <>
		<Link href='/tpl/dbtemplate.xlsx'>
			<a><h1>下载模板</h1></a>
		</Link>
		<style jsx>{`
a{
color: red;
text-decoration: underline;
}
`}</style>
	</>;
}
