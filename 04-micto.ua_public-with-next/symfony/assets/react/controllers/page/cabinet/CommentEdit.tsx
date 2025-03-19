import * as React from 'react';
import HeaderTabs from '@/controllers/component/Elements/HeaderTabs';
import Container from '@/controllers/component/Elements/Container';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { addComment, fetchComment } from '@/reduxToolkit/slices/commentsUnitSlice';
import Comment from '@/controllers/component/Elements/Comments/Comment';
import { DISLIKE_SVG, LIKE_SVG } from '@/components/utils/SVG';
import InputArea, { CustomAreaControll } from '@/controllers/component/Elements/InputArea';
import CustomButton from '@/controllers/component/Elements/CustomButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/controllers/shemas/shemaComment';

export default function CommentEdit() {
	const dispatch = useAppDispatch();
	const { id } = useParams();

	const { entityComment, commentLoading } = useAppSelector((state) => state.myComments);

	const { currentInstitutionId } = useAppSelector((state) => state.myInstitutions);

	React.useEffect(() => {
		dispatch(fetchComment(Number(id)));
	}, [dispatch, id]);

	const { handleSubmit, control, reset } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			text: '',
		},
	});
	const onCreateComment = async (data) => {
		dispatch(
			addComment({
				input: {
					replyToId: Number(id),
					text: data.text,
				},
			})
		);

		dispatch(fetchComment(Number(id)));
		reset();
	};

	const handleReactionClick = async (type: 'like' | 'dislike') => {
		try {
			await fetch(`http://localhost/api/toggle_comment_reaction/${id}/${type}`).then((res) =>
				res.json()
			);
			dispatch(fetchComment(Number(id)));
		} catch (e) {}
	};
	if (commentLoading) {
		return (
			<>
				<HeaderTabs
					headerTitle="Відгук"
					headerImgUrl="/img/cabinet/arrow-left.svg"
					flexibleRedirectLink={
						currentInstitutionId
							? `/cabinet/comments/${currentInstitutionId}`
							: '/cabinet/'
					}
				/>
				<Container className="mt-8 px-6 h-full pb-10">
					<div className="flex items-center justify-between ">
						<Skeleton className="w-full h-[50px] rounded-[var(--default-round)]" />
					</div>

					<div className="flex flex-col gap-5 mt-5">
						<Skeleton className="w-full min-h-[335px] rounded-[var(--default-round)]" />
						<Skeleton className="w-full min-h-[100px] rounded-[var(--default-round)]" />
						<Skeleton className="mx-auto w-[265px] h-[44px] rounded-[var(--default-round)]" />
					</div>
				</Container>
			</>
		);
	}
	return (
		<>
			<HeaderTabs
				headerTitle="Відгук"
				headerImgUrl="/img/cabinet/arrow-left.svg"
				flexibleRedirectLink={
					currentInstitutionId ? `/cabinet/comments/${currentInstitutionId}` : '/cabinet/'
				}
			/>
			<Container className="mt-8 px-6 h-full pb-10">
				{!entityComment.replies.items.length && (
					<div
						className="h-[50px] px-5 mb-6 bg-[var(--color19)] flex items-center gap-1 text-[var(--color5)] w-full
                rounded-[var(--default-round)] fontMedium !text-[16px]"
					>
						Цей коментар <span className="fontRegular2Bold"> без відповіді</span>
					</div>
				)}

				<Comment comment={entityComment}>
					{entityComment?.department?.id && (
						<div>
							<span className="fontRegular text-[var(--gray3)]">Відділення: </span>
							<Link
								className="fontRegular text-[var(--color5)] ml-1"
								to={`/cabinet/institution/${entityComment.institution.id}/unit/${entityComment.unit.id}/department/${entityComment.department.id}/edit`}
							>
								{entityComment.department.name}
							</Link>
						</div>
					)}

					<div className="flex items-center justify-start gap-4">
						<div
							className="flex gap-2 items-center"
							onClick={() => handleReactionClick('like')}
						>
							<LIKE_SVG />
							<span className="fontRegular2Bold text-[var(--color10)] text-[14px]">
								{entityComment.numLikes}
							</span>
						</div>
						<div
							className="flex gap-2 items-center"
							onClick={() => handleReactionClick('dislike')}
						>
							<DISLIKE_SVG />
							<span className="fontRegular2Bold text-[var(--color10)] text-[14px]">
								{entityComment.numDislikes}
							</span>
						</div>
					</div>
				</Comment>

				<form onSubmit={handleSubmit(onCreateComment)} className="mt-5">
					<CustomAreaControll
						control={control}
						name="text"
						placeholder="Відповісти.."
						className="h-[96px] desktop:h-auto"
					/>
					<CustomButton
						text="Надіслати"
						type="submit"
						classNameContainer="!bg-[var(--bg-color)] mt-5"
						className="w-[265px]"
					/>
				</form>

				{entityComment.replies.items.length ? (
					<div className="mt-5 gap-5">
						{entityComment.replies.items.map((comment) => (
							<Comment
								comment={comment}
								key={comment.id}
								className="bg-[var(--bg-color)]"
							>
								<Link
									to={`/cabinet/comment/${id}`}
									className="fontMediumBold !text-[14px] text-[var(--color5)]"
								>
									Відповісти
								</Link>
							</Comment>
						))}
					</div>
				) : (
					''
				)}
			</Container>
		</>
	);
}
