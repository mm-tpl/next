import Uploader from '../../file/uploader';
import { File } from '../../../pages/api/file/upload.api';
import res from '../../../atoms/res';
import getfile from '../../../atoms/getfile';
import FormItem from '../item';

/**
 * 头像
 */
export default function FormItemAvatar({
	fileid,
	required,
	onChange
}: {
	required?: boolean;
	fileid: string;
	onChange(fid: string): void
}) {
	const filelist = fileid ? [{ fileid, filename: '' }] as File[] : [];
	const src = fileid ? getfile(fileid) : res['/images/user/avatar.png'];
	return <>
		<FormItem label='头像' required={required}>
			<Uploader
				multiple={false}
				files={filelist}
				deleteFileOnServer
				onChange={(files) => {
					onChange(files[files.length - 1].fileid);
				}}
				CustomUploadedFileList={() => {
					return <span></span>;
				}}
			>
				<img className='picture' title='32*32' src={src} />
			</Uploader>
		</FormItem>
		<style jsx>{`
.picture{
border: 0.01875rem solid #D2CBCB;
border-radius: 5rem;
width: 5rem;
height: 5rem;
margin-left: 11.4rem;
padding: 0.5rem;
}
		`}</style>
	</>;
}
