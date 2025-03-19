const scrollToComment = (commentId: number) => {
	const element = document.querySelector(`[data-comment-id="${commentId}"]`);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		element.classList.add('bg-[var(--blue-background)]');
		element.classList.add('duration-300');
		setTimeout(() => {
			element.classList.remove('bg-[var(--blue-background)]');
			setTimeout(() => {
				element.classList.remove('duration-300');
			}, 300);
		}, 1000);
	}
};

export default scrollToComment;
