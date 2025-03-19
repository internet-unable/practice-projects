import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Existing regex patterns:
	const territorialUnitRegex = /^\/([^\/]+)-r(\d+)$/;
	const unitTypeRegex = /^\/([^\/]+)-t(\d+)$/;
	const institutionRegex = /^\/([^\/]+)\/institution-(\d+)\/?$/;
	const institutionUnitRegex = /^\/([^\/]+)-i(\d+)$/;
	const unitDepartmentRegex = /^\/([^\/]+)-i(\d+)\/([^\/]+)-s(\d+)\/?$/;

	let destination = null;
	let match;

	if ((match = pathname.match(territorialUnitRegex))) {
		const slug = match[1];
		const id = match[2];
		if (pathname.includes('-obl') || pathname.includes('avtonomna-respublika-krym')) {
			destination = `/area/${slug}/${id}`;
		} else if (pathname.includes('-rn-')) {
			destination = `/district/${slug}/${id}`;
		} else if (
			Number(id) == 899 ||
			pathname.includes('/m-') ||
			pathname.includes('/s-') ||
			pathname.includes('/smt-')
		) {
			destination = `/city/${slug}/${id}`;
		}
	} else if ((match = pathname.match(unitTypeRegex))) {
		const slug = match[1];
		const id = match[2];
		destination = `/unit-type/${slug}/${id}`;
	} else if ((match = pathname.match(institutionRegex))) {
		const slug = match[1];
		const id = match[2];
		destination = `/institution/${slug}/${id}/`;
	} else if ((match = pathname.match(institutionUnitRegex))) {
		const slug = match[1];
		const id = match[2];
		destination = `/institution-unit/${slug}/${id}/`;
	} else if ((match = pathname.match(unitDepartmentRegex))) {
		const unitSlug = match[1];
		const unitId = match[2];
		const slug = match[3];
		const id = match[4];
		destination = `/unit-department/${slug}/${id}/`;
	}

	if (destination) {
		const url = req.nextUrl.clone();
		url.pathname = destination;
		return NextResponse.rewrite(url);
	}

	return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
	matcher: '/:path*',
};
