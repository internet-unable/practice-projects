import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { setDate } from '@/reduxToolkit/slices/filterCommentsSlice';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router-dom';

interface IProps {
	className?: string;
}

const DateRangeFilter: React.FC<IProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const { date } = useAppSelector((state) => state.filterComments.filter);
	const dateFrom = searchParams.get('dateFrom');
	const dateTo = searchParams.get('dateTo');
	const dateQs = {
		from: new Date(dateFrom),
		to: new Date(dateTo),
	};

	const handleDateSelect = (range: DateRange | undefined) => {
		if (range?.from && !range.to) {
			dispatch(setDate({ from: range.from, to: range.from }));
		} else {
			dispatch(setDate(range));
		}
	};

	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="value-1">
				<AccordionTrigger isIcon={false} className="p-0">
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'w-full p-0 justify-start text-left font-normal h-[44px] rounded-[var(--default-round)]' +
								' text-[var(--color10)]' +
								' border border-[var(--gray3)] ',
							!date && 'text-muted-foreground'
						)}
					>
						<div className="flex items-center justify-between w-full px-3">
							{date?.from ? (
								date.to ? (
									<>
										{format(date.from, 'MM/dd/yyyy', { locale: uk })} -{' '}
										{format(date.to, 'MM/dd/yyyy', { locale: uk })}
									</>
								) : (
									format(date.from, 'MM/dd/yyyy', { locale: uk })
								)
							) : (
								'Виберіть дату'
							)}
							<CalendarIcon />
						</div>
					</Button>
				</AccordionTrigger>
				<AccordionContent className=" p-0">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date || dateQs}
						onSelect={handleDateSelect}
						locale={uk}
						className="min-h-[330px] pt-8 custom-calendar"
					/>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default DateRangeFilter;
