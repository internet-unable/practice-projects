import Image from 'next/image';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { CHEVRON_SVG } from '../SVG';
import { Email, Phone, Schedule } from '@/graphql/generated/types';
import { Maybe } from 'graphql/jsutils/Maybe';
import { cn } from '@/lib/utils';
import EntityPhones from './EntityPhones';
import EntityEmails from './EntityEmails';

const EntityContacts = ({
	className,
	emails,
	phones,
}: {
	className?: string;
	emails: Maybe<Email[]>;
	phones: Maybe<Phone[]>;
}) => {
	return (
		<>
			<div className={cn('flex-col', className)}>
				<EntityPhones phones={phones} className="mb-4" />

				<EntityEmails emails={emails} className="mb-4" />
			</div>
		</>
	);
};

export default EntityContacts;
