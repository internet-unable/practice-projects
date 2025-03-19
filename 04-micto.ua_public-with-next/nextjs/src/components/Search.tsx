'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { listItems } from '@/constants/checkSearch';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
interface ISearchProps {
	wrapperClassName: string;
}

export const Search = ({ wrapperClassName }: ISearchProps) => {
	const [value, setValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
			if (event.key === 'Enter' && isOpen === true) {
				router.push(`/search/${value}`);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, router, value]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);
		setIsOpen(newValue.length > 1);
	};

	return (
		<div className={`relative ${wrapperClassName}`} ref={wrapperRef}>
			<input
				type="text"
				placeholder="Я хочу знайти ..."
				value={value}
				onChange={handleInputChange}
				onClick={() => {
					if (value.length > 1) setIsOpen(true);
				}}
				className="w-full h-[40px] border border-[var(--gray2)] rounded-[7px] px-4 pr-12 outline-1 focus:outline-[var(--main)] min-[769px]:h-[56px]"
			/>
			<Link
				href={`/search/${value}`}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
			>
				<Image src="icon-search.svg" alt="icon-search" width={20} height={20} />
			</Link>
			{isOpen && (
				<div className="absolute left-0 w-full custom-scrollbar max-h-[300px] py-4 bg-white shadow-cabinet flex flex-col min-[769px]:gap-8 gap-4 min-[769px]:py-6">
					{listItems.map((item, index) => (
						<SearchListItem key={index} title={item.title} list={item.list} />
					))}
					<Link
						href={`/search/${value}`}
						className="w-fit text-[var(--main)] fontInterMedium18 min-[769px]:fontInterRegular16 underline decoration-dashed decoration-1 underline-offset-4 min-[769px]:pl-[72px] pl-4 active:scale-[.98] transition-transform"
					>
						Всі результати пошуку
					</Link>
				</div>
			)}
		</div>
	);
};

interface ISearchListItemProps {
	title: string;
	list: {
		title: string;
		link: string;
	}[];
}

const SearchListItem = ({ title, list }: ISearchListItemProps) => {
	return (
		<div>
			<h4 className="min-[769px]:fontUbuntuRegular25 min-[769px]:pl-6 fontInterMedium18 max-[768px]:text-[var(--blue8)] pl-4 mb-6">
				{title}
			</h4>
			<ul className="flex flex-col min-[769px]:gap-6 gap-2">
				{list.map((item, index) => (
					<li
						key={index}
						className="min-[769px]:px-6 px-4 min-[769px]:py-[13px] flex items-start gap-4 py-2 fontInterRegular18 max-[768px]:text-base  hover:bg-[var(--gray6)] transition-colors group"
					>
						<SearchIcon pathClassName="group-hover:text-[var(--main)] text-[var(--gray2)]" />
						<Link href={item.link} className="hover-effect hover:text-[var(--main)]">
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
