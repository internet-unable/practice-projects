import React from 'react';
import Image from 'next/image';

const CreateLogo = () => {
	return (
		<section className="mb-[40] lg:mb-[80px] flex justify-center lg:justify-start">
			<div className="max-w-[630px] lg:max-w-full md:text-left">
				<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em] mb-[24px]">
					Створення логотипу
				</h4>
				<p className="font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[24px]">
					Ми поєднали класичний символ чотирьох сторін світу та наш{' '}
					<br className="hidden sm:block" />
					український орнамент і отримали логотип для MICTO.UA
				</p>

				{/* Блок із зображеннями */}
				<div className="flex flex-nowrap justify-center justify-between items-center gap-[10px] overflow-x-auto">
					<Image
						src="/about/compass.png"
						width={100}
						height={100}
						alt="фото"
						className="w-full max-w-[80px] lg:max-w-[200] sm:max-w-[100px] min-w-0"
					/>
					<Image
						src="/about/Plus.png"
						width={60}
						height={60}
						alt="фото"
						className="w-full max-w-[50px] lg:max-w-[80]  sm:max-w-[60px] min-w-0"
					/>
					<Image
						src="/about/embroidery.png"
						width={100}
						height={100}
						alt="фото"
						className="w-full max-w-[80px] lg:max-w-[200] sm:max-w-[100px] min-w-0"
					/>
					<Image
						src="/about/equals.png"
						width={60}
						height={60}
						alt="фото"
						className="w-full max-w-[50px] lg:max-w-[80] sm:max-w-[60px] min-w-0"
					/>
					<Image
						src="/about/logo-kolir-1.png"
						width={120}
						height={137}
						alt="фото"
						className="w-full max-w-[90px] lg:max-w-[200] sm:max-w-[120px] min-w-0"
					/>
				</div>

				{/* Головний логотип */}
				<Image
					src="/about/full-logo.png"
					width={529}
					height={138}
					alt="фото"
					className="mx-auto mb-[24px] w-full max-w-[529px]"
				/>

				<p className="font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[16px]">
					Проект "MICTO.UA" виступає в якості MVP продукту в проекті "Я і здоров’я".
				</p>
				<p className="font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
					MVP, мінімально життєздатний продукт (англ. Minimum viable product — MVP) —
					продукт з мінімальним функціоналом, який можна дати користувачам для
					використання. Використовується для тестування ідей у розробці програм з
					мінімальними затратами ресурсів.
				</p>
			</div>
		</section>
	);
};

export default CreateLogo;
