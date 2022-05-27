import { useState } from 'react';
import { Progress, Tooltip, Upload } from '@arco-design/web-react';
import { UploadItem, UploadListProps } from '@arco-design/web-react/es/Upload';
import { IconDelete, IconDownload, IconEye, IconPause, IconPlayArrowFill, IconUpload } from '@arco-design/web-react/icon';
import { File, Result } from '../pages/api/file/upload.api';
import api from '../atoms/api';
import deletefile from '../pages/api/file/delete/deletefile';

export type FunRenderFileItem = (name: string, fileid: string, onRemove: () => void) => JSX.Element;

/**
 * 文件上传
 */
export default function Uploader({
	limit,
	deleteFileOnServer = false,
	multiple = false,
	defaultFiles = [],
	onChange,
	onRenderFileItem = FileCardDone,
	onCheckFileType = () => true
}: {
	limit?: number | {
		maxCount: number;
		hideOnExceedLimit?: boolean;
	};
	deleteFileOnServer: boolean;
	multiple: boolean;
	defaultFiles: File[];
	onChange(files: File[]): void;
	onRenderFileItem?: FunRenderFileItem;
	onCheckFileType?(filetype: string): boolean | Promise<boolean>;
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
	return <>
		<Upload
			limit={limit}
			multiple={multiple}
			fileList={filelist}
			action={endpoint}
			listType='text'
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
				return onCheckFileType(file.type);
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
				console.log('eeeee', files);
				return files.map((file) => {
					return <FileCard key={file.uid} file={file} props={props} onRenderFileItem={onRenderFileItem} />;
				});
			}}
		/>
	</>;
}

function FileCard({
	file,
	props,
	onRenderFileItem
}: {
	file: UploadItem;
	props: UploadListProps;
	onRenderFileItem: FunRenderFileItem;
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
		return onRenderFileItem(f.filename, f.fileid, () => {
			props.onRemove(file);
		});
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

function FileCardDone(name: string, fileid: string, onRemove: () => void) {
	const preview = `${api['/api/file/preview/id']}/${fileid}`;
	const download = `${api['/api/file/id']}/${fileid}`;
	return <div className='item'>
		<a target={'_blank'} rel="noreferrer" href={preview}>
			<div>
				{name}
			</div>
		</a>
		<div className='btns'>
			<div className='btn'>
				<a target={'_blank'} rel="noreferrer" href={preview}>
					<IconEye />
				</a>
			</div>
			<div className='btn'>
				<a target={'_blank'} download rel="noreferrer" href={download}>
					<IconDownload />
				</a>
			</div>
			<div className="btn">
				<IconDelete
					onClick={onRemove}
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
