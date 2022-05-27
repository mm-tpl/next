import NextLink from 'next/link';
import { AnchorHTMLAttributes } from 'react';

export default function Link({
	href,
	children,
	...other
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
	const { style = { textDecoration: 'none' }, ...rest } = other;
	return <NextLink href={href}><a style={style} {...rest}>{children}</a></NextLink>;
}
