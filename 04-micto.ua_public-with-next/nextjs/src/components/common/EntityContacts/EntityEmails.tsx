import Image from 'next/image';
import React from 'react';
import { Email } from '@/graphql/generated/types';
import { Maybe } from 'graphql/jsutils/Maybe';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CHEVRON_SVG } from '../SVG';

const EntityEmails = ({
	className,
	emails,
	onlyValues = false,
}: {
	className?: string;
	emails: Maybe<Email[]>;
	onlyValues?: boolean;
}) => {
	return (
		<>
			{emails && emails.length > 0 && (
				<div className={cn('flex-col', className)}>
					<div className="flex gap-2">
						<span className="fontInterMedium18 flex gap-4">
							{!onlyValues && <>E-mail:</>}

							<Popover>
								<PopoverTrigger asChild>
									<span className="fontInterRegular18 text-black flex gap-4 items-center cursor-pointer">
										{emails.length > 0 && emails[0].email}
										<CHEVRON_SVG />
									</span>
								</PopoverTrigger>
								<PopoverContent className="w-fit">
									<ul className="grid gap-3 fontInterRegular18">
										{emails.map((el) => {
											return (
												<li
													className="flex gap-3 whitespace-nowrap"
													key={el.email + '_email'}
												>
													<span className="flex-[0_0_125px]">
														{el.email}
													</span>
													{el.comment && (
														<>
															<span>-</span>
															<span className="flex-[1_1_150px]">
																{el.comment}
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

export default EntityEmails;
