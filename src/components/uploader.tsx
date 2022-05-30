import { ElementType, ReactNode, useEffect, useState } from 'react';
import { Progress, Tooltip, Upload } from '@arco-design/web-react';
import { UploadItem, UploadListProps } from '@arco-design/web-react/es/Upload';
import { IconDelete, IconDownload, IconEye, IconPause, IconPlayArrowFill, IconUpload } from '@arco-design/web-react/icon';
import { File as FdFile, Result } from '../pages/api/file/upload.api';
import api from '../atoms/api';
import deletefile from '../pages/api/file/delete/deletefile';

export type FunRenderFileItem = (name: string, fileid: string, onRemove: () => void) => JSX.Element;

export type UploadFile = FdFile & {
	previewUrl: string;
	downloadUrl: string;
};

/**
 * 文件上传
 */
export default function Uploader({
	limit,
	deleteFileOnServer = false,
	multiple = false,
	files,
	defaultFiles = [],
	onChange,
	onAdd,
	CustomUploadedFileList = UploadedFileList,
	onCheck = () => true
}: {
	/**
	 * 允许上传多个文件时限制最多可上传文件数量
	 */
	limit?: number | {
		maxCount: number;
		hideOnExceedLimit?: boolean;
	};
	/**
	 * 点击删除按钮时，在服务器上删除该文件
	 */
	deleteFileOnServer: boolean;
	/**
	 * 是否允许上传多个文件
	 */
	multiple: boolean;
	/**
	 * 默认展示的文件列表
	 */
	defaultFiles?: FdFile[];
	/**
	 * 受控模式
	 */
	files?: FdFile[];
	/**
	 * 文件列表有改变时触发
	 * @param files 文件列表
	 */
	onChange?(files: FdFile[]): void;
	/**
	 * 文件列表新增文件
	 * @param file 上传的文件
	 */
	onAdd?(file: FdFile): void;
	/**
	 * 自定义已上传文件列表
	 */
	CustomUploadedFileList?: ElementType<{
		// 全部已上传文件列表
		files: UploadFile[];
		// 自定义组件中删除已上传文件时要触发该事件
		onRemove: (file: UploadFile) => void;
	}>;
	onCheck?(file: File, filesList: File[]): boolean | Promise<any>;
}) {
	const endpoint = api['/api/file/upload'];
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
	useEffect(() => {
		if (files) {
			setfilelist(files.map((file) => {
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
		}
	}, [files]);
	return <>
		<Upload
			limit={limit}
			multiple={multiple}
			fileList={filelist}
			action={endpoint}
			listType='text'
			onChange={(files, file) => {
				if (file.status === 'done') {
					if (onAdd) {
						const res = file.response as Result;
						onAdd({
							fileid: res.fileid,
							filename: res.filename
						});
					}
					onChange && onChange(files.filter((file) => {
						return file.status === 'done';
					}).map((file) => {
						const res = file.response as Result;
						return {
							fileid: res.fileid,
							filename: res.filename
						};
					}));
				}
				setfilelist(files);
			}}
			beforeUpload={(file, files) => {
				return onCheck(file, files);
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
				// if (/application\/(vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|wps-office\.xlsx)/.test(file.type)) {
				// 	return true;
				// }
				// Ppt
				// if (/application\/(vnd\.ms-powerpoint|vnd\.openxmlformats-officedocument\.presentationml\.presentation|wps-office\.pptx)/.test(file.type)) {
				// 	return true;
				// }
				// Pdf
				// if (/application\/pdf/.test(file.type)) {
				// 	return true;
				// }
				// Message.error('不支持的文件类型');
				// return false;
			}}
			onRemove={async (file) => {
				if (deleteFileOnServer) {
					const res = file.response as Result;
					await deletefile({
						id: res.fileid
					});
				}
			}}
			renderUploadList={(files, props) => {
				// console.log('2222', files);
				const uploaded = files.filter((file) => {
					return file.status === 'done';
				}).map((file) => {
					const f = file.response as Result;
					const fileid = f.fileid;
					const previewUrl = `${api['/api/file/preview/id']}/${fileid}`;
					const downloadUrl = `${api['/api/file/id']}/${fileid}`;
					return {
						...f,
						previewUrl,
						downloadUrl
					};
				});
				const notUploaded = files.filter((file) => {
					return file.status !== 'done';
				});
				return <div>
					<CustomUploadedFileList files={uploaded} onRemove={(file) => {
						const f = files.find((it) => {
							const r = it.response as Result;
							return r.fileid === file.fileid;
						});
						if (f) {
							props.onRemove(f);
						}
					}} />
					<UnUploadedFileList files={notUploaded} props={props} />
				</div>;
			}}
		/>
	</>;
}

function UploadedFileList({
	files,
	onRemove
}: {
	// 全部已上传文件列表
	files: UploadFile[];
	// 自定义组件中删除已上传文件时要触发该事件
	onRemove: (file: UploadFile) => void;
}) {
	return <div>
		{files.map((file) => {
			const fileid = file.fileid;
			return <FileCardDone
				previewUrl={file.previewUrl}
				downloadUrl={file.downloadUrl}
				key={file.fileid}
				name={file.filename}
				fileid={file.fileid}
				onRemove={() => {
					onRemove(file);
				}}
			/>;
		})}
	</div>;
}

/**
 * 未上传文件列表
 */
function UnUploadedFileList({
	files,
	props
}: {
	files: UploadItem[];
	props: UploadListProps;
}) {
	return <div>
		{files.map((file) => {
			return <FileCard key={file.uid} file={file} props={props} />;
		})}
	</div>;
}

function FileCard({
	file,
	props
}: {
	file: UploadItem;
	props: UploadListProps;
}) {
	const { status, percent } = file;
	const { progressProps } = props;
	if (status === 'error') {
		return <FileCardError
			errMsg={file.response as unknown as string}
			onClick={() => {
				props.onReupload(file);
			}}
		/>;
	}
	if (status === 'done') {
		const f = file.response as Result;
		const fileid = f.fileid;
		const previewUrl = `${api['/api/file/preview/id']}/${fileid}`;
		const downloadUrl = `${api['/api/file/id']}/${fileid}`;
		return <FileCardDone
			previewUrl={previewUrl}
			downloadUrl={downloadUrl}
			name={f.filename}
			fileid={f.fileid}
			onRemove={() => {
				props.onRemove(file);
			}}
		/>;
	}
	// if (!f) {
	// 	return <><Spin dot /></>;
	// }
	// if (!f || file.status !== 'done') {
	// 	return <><Spin dot /></>;
	// }
	return <div>
		<Progress
			showText={false}
			type="circle"
			status='normal'
			percent={percent}
			size="mini"
			{...progressProps}
		/>
		{status === 'init' && (
			<FileCardInit
				onClick={() => {
					props.onUpload && props.onUpload(file);
				}}
			/>
		)}

		{status === 'uploading' && (
			<FileCardUploading
				onClick={() => {
					props.onAbort && props.onAbort(file);
				}}
			/>
		)}
	</div>;
}

function FileCardUploading({
	onClick
}: {
	onClick(): void;
}) {
	return <span
		onClick={onClick}
	>
		<Tooltip content='取消'>
			<IconPause />
		</Tooltip>
	</span>;
}

function FileCardInit({
	onClick
}: {
	onClick(): void;
}) {
	return <span
		onClick={onClick}
	>
		<Tooltip content='开始上传'>
			<IconPlayArrowFill />
		</Tooltip>
	</span>;
}

function FileCardError({
	errMsg,
	onClick
}: {
	errMsg: string;
	onClick(): void;
}) {
	return <div className='ec' onClick={onClick}>
		<div>
			<span>Error: </span>
			<span>{errMsg} </span>
		</div>
		<div className='reupload'>
			<span className='txt'>重新上传
			</span>
			<IconUpload />
		</div>
		<style jsx>{`
.ec{
color: #f00;
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 2rem;
}
.reupload{
cursor: pointer;
}
.txt{
	padding: 0 1rem;
}
`}</style>
	</div>;
}

function FileCardDone({
	name,
	fileid,
	previewUrl,
	downloadUrl,
	onRemove
}: {
	name: string;
	fileid: string;
	previewUrl: string;
	downloadUrl: string;
	onRemove: () => void;
}) {
	return <div className='item'>
		<a target={'_blank'} rel="noreferrer" href={previewUrl}>
			<div>
				{name}
			</div>
		</a>
		<div className='btns'>
			<div className='btn'>
				<a target={'_blank'} rel="noreferrer" href={previewUrl}>
					<IconEye fontSize={'1.5rem'} />
				</a>
			</div>
			<div className='btn'>
				<a download rel="noreferrer" href={downloadUrl}>
					<IconDownload fontSize={'1.4rem'} />
				</a>
			</div>
			<div className="btn">
				<IconDelete
					onClick={onRemove} fontSize={'1.5rem'}
				/>
			</div>
		</div>
		<style jsx>{`
.btn{
padding: 0.5rem;
cursor: pointer;
}
.btns{
display: flex;
flex-direction: row;
}
.item{
width: 70%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: .625rem;
}
`}</style>
	</div>;

}
