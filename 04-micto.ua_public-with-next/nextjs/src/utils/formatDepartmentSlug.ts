export default function modifyDepartmentSlug(input: string): string {
	const parts = input.split('-');
	const id = parts.pop();
	return parts.join('-') + '-s' + id;
}
