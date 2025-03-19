import Image from 'next/image';
import React from 'react';
import { Phone } from '@/graphql/generated/types';
import { Maybe } from 'graphql/jsutils/Maybe';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CHEVRON_SVG } from '../SVG';

const EntityPhones = ({
	className,
	phones,
	onlyValues = false,
}: {
	className?: string;
	phones: Maybe<Phone[]>;
	onlyValues?: boolean;
}) => {
	return (
		<>
			{phones && phones?.length > 0 && (
				<div className={cn('flex-col', className)}>
					<div className="flex gap-2">
						{!onlyValues && (
							<>
								{/* Replace with svg component */}
								<Image width={24} height={24} src={'/phone.svg'} alt="Телефон" />
							</>
						)}

						<span className="fontInterMedium18 flex gap-4">
							{!onlyValues && <>Телефон:</>}

							<Popover>
								<PopoverTrigger asChild>
									<span className="fontInterRegular18 text-black flex gap-4 items-center cursor-pointer">
										{phones.length > 0 && phones[0].formattedNumber}
										<CHEVRON_SVG />
									</span>
								</PopoverTrigger>
								<PopoverContent className="w-fit">
									<ul className="grid gap-3 fontInterRegular18">
										{phones.map((el) => {
											return (
												<li
													className="flex gap-3 whitespace-nowrap"
													key={el.number + '_number'}
												>
													<a
														href={`tel:${el.number}`}
														className="flex-[0_0_125px] text-main"
													>
														{el.formattedNumber}
													</a>{' '}
													{el.comment && (
														<>
															<span>-</span>
															<span className="flex-[1_1_150px]">
																{}
															</span>
														</>
													)}
												</li>
											);
										})}
									</ul>
								</PopoverContent>
							</Popover>
						</span>
					</div>
				</div>
			)}
		</>
	);
};

export default EntityPhones;
