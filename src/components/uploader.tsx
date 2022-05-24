import { useState } from 'react';
import { Message, Upload } from '@arco-design/web-react';
import { UploadItem, UploadListProps } from '@arco-design/web-react/es/Upload';
import { IconDelete, IconDownload, IconEye } from '@arco-design/web-react/icon';
import { File, Result } from '../pages/api/file/upload.api';
import api from '../atoms/api';
import deletefile from '../pages/api/file/delete/deletefile';

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
				return true;
				// console.log('before upload', file);
				// todo 更多类型判定
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
				// todo 如果不希望直接在文件服务器删除文件，而是在业务逻辑上删除文件，去掉以下代码
				const res = file.response as Result;
				await deletefile({
					id: res.fileid
				});
			}}
			renderUploadList={(files, props) => {
				return files.map((file) => {
					return <FileCard key={file.uid} file={file} props={props} />;
				});
			}}
		/>
	</>;
}

function FileCard({
	file,
	props
}: {
	file: UploadItem;
	props: UploadListProps;
}) {
	const f = file.response as Result;
	const preview = `${api['/api/file/preview/id']}/${f.fileid}`;
	const download = `${api['/api/file/id']}/${f.fileid}`;
	return <div className='item'>
		<a target={'_blank'} rel="noreferrer" href={preview}>
			<div>
				{file.name}
			</div>
		</a>
		<div className='btns'>
			<div className='btn'>
				<a target={'_blank'} rel="noreferrer" href={preview}>
					<IconEye style={{ fontSize: 12 }} />
				</a>
			</div>
			<div className='btn'>
				<a target={'_blank'} download rel="noreferrer" href={download}>
					<IconDownload style={{ fontSize: 12 }} />
				</a>
			</div>
			<div className="btn">
				<IconDelete
					style={{ fontSize: 12 }}
					onClick={() => {
						props.onRemove(file);
					}}
				/>
			</div>
		</div>
		<style jsx>{`
.btn{
padding: 1rem;
cursor: pointer;
}
.btns{
display: flex;
flex-direction: row;
}
.item{
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 1rem;
}
`}</style>
	</div>;
}
