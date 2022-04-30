import NextLink from 'next/link';
import { AnchorHTMLAttributes } from 'react';

export default function Link({
	href,
	children,
	...other
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
	return <NextLink href={href}><a {...other}>{children}</a></NextLink>;
}
