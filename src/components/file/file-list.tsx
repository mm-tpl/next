import { IconDownload, IconEye } from '@arco-design/web-react/icon';
import api from '../../atoms/api';
import { File } from '../../pages/api/file/upload.api';

/**
 * 文件列表，可以替代默认的上传组件`<Uploader CustomUploadedFileList=FileList />`的列表
 */
export default function FileList({
	files
}: {
	files: File[];
}) {
	return <>
		<div className='list'>
			{files.map((file) => {
				const previewUrl = `${api['/api/file/preview/id']}/${file.fileid}`;
				const downloadUrl = `${api['/api/file/id']}/${file.fileid}`;
				return <div key={file.fileid} className='list'>
					<div>{file.filename}</div>
					<div>
						<a className='btn' target='_blank' href={previewUrl} rel="noreferrer">
							<IconEye fontSize={'1.5rem'} />
						</a>
						<a className='btn' download href={downloadUrl}>
							<IconDownload fontSize={'1.4rem'} />
						</a>
					</div>
				</div>;
			})}
		</div>
		<style jsx>{`
.btn{
cursor: pointer;
padding: 0.5rem;
}
.bimg{
height: 1.5rem;
width: 1.5rem;
}
.list{
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

width: 22.5rem;
height: 2.25rem;
background: #F7F8FA;
border-radius: .125rem;

padding: 0 .625rem;

margin-left: 2.5rem;
margin: .625rem 0 .625rem 2.5rem;
}
`}</style>
	</>;
}
