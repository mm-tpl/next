
export default function Ring({
	size,
	width,
	color,
	angle
}: {
	color: string;
	width: string;
	size: string;
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
