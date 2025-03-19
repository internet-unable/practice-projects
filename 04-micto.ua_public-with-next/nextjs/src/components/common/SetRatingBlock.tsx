'use client';
import React, { MouseEventHandler } from 'react';
import { STAR_SVG } from './SVG';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

//TODO: Include control to get selected value

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label?: string;
	className?: string;
	wrapperClassName?: string;
};

const SetRatingBlock = <T extends FieldValues>({ name, control }: Props<T>) => {
	const [currentRating, setCurrentRating] = React.useState<number | null>(null);

	return (
		<div className="flex gap-1 cursor-pointer">
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<>
						{new Array(5).fill(0).map((el, index) => {
							return (
								<Star
									setCurrentRating={() => {
										setCurrentRating(index);
										onChange(index + 1);
									}}
									starId={index}
									key={'star_rating_' + index}
									selected={
										currentRating != null
											? currentRating < index
												? false
												: true
											: false
									}
								/>
							);
						})}
					</>
				)}
			></Controller>
		</div>
	);
};

const Star = ({
	setCurrentRating = () => {},
	starId,
	selected = false,
}: {
	setCurrentRating: MouseEventHandler<HTMLDivElement>;
	starId: number;
	selected: boolean;
}) => {
	return (
		<div
			// onMouseEnter={() => setCurrentRating(starId)}
			onClick={setCurrentRating}
		>
			<STAR_SVG
				height={42}
				width={42}
				color={!selected ? 'transparent' : '#FBC756'}
				stroke={!selected ? '#9CA3AF' : '#FBC756'}
				className="pointer-events-none"
			/>
		</div>
	);
};

export default SetRatingBlock;
