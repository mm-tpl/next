import NextLink from 'next/link';
import { AnchorHTMLAttributes } from 'react';

/**
 * 超链接，全面替代`<a></a>`
 */
export default function Link({
	href,
	children,
	...other
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
	const { style = { textDecoration: 'none' }, ...rest } = other;
	return <NextLink href={href}><a style={style} {...rest}>{children}</a></NextLink>;
}
