
/**
 * 环形（或一部分）图形
 */
export default function Ring({
	size,
	width,
	color,
	angle
}: {
	/**
	 * 外环边框颜色
	 */
	color: string;
	/**
	 * 边框的宽度
	 */
	width: string;
	/**
	 * 环形直径
	 */
	size: string;
	/**
	 * 半环的起始角度
	 */
	angle: number;
}) {
	return <>
		<div className='r'>
		</div>
		<style jsx>{`
.r{
width:${size};
height: ${size};
border: ${width} solid ${color};
border-radius: ${size};
transform: rotate(${angle}deg);
clip-path: polygon(50% 0%,100% 0%,100% 50%, 50% 50%);
}
`}</style>
	</>;
}
