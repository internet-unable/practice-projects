import React from 'react';
import Image from 'next/image';

const InternationalUnity = () => {
	return (
		<>
			<section className="font-inter flex flex-col lg:flex-row mb-[24] lg:mb-[40]">
				<div className="self-start mr-[63]">
					<Image
						src="/partners/international-unity.png"
						alt="фото"
						width={597}
						height={164}
						className="object-cover mb-[24] lg:mb-[0]"
					/>
				</div>
				<div className="font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
					<h4 className="font-bold text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						Благодній Організація Благодійний Фонд «МІЖНАРОДНИЙ РУХ ЄДНОСТІ»
					</h4>
					<address>
						Адреса: Україна, 03022, місто Київ, вул.Васильківська,
						<br /> будинок 34, офіс Г-309
					</address>
					<p>
						Телефон: 
						<a
							href="tel:+380631853171"
							target="_blank"
							className="text-blue-500 underline"
						>
							+38 063 185-31-71
						</a>
					</p>
					<p>Пн.-Пт.: 9:00-18:00</p>
					<p>
						Email: 
						<a
							href="mailto:office@ruhednosti.com"
							target="_blank"
							className="text-blue-500 underline"
						>
							office@ruhednosti.com
						</a>
					</p>
				</div>
			</section>
		</>
	);
};

export default InternationalUnity;
