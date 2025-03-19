import React from 'react';
import Image from 'next/image';

const MindMao = () => {
	return (
		<section className="mt-[40] lg:mt-[80px] flex flex-col items-center lg:items-start">
			<div className="w-full max-w-[630px]">
				<div className="mb-[24px]">
					<h4 className="font-ubuntu font-bold text-[22px] sm:text-[25px] leading-[130%] tracking-[-0.01em] mb-[16px]">
						Мапа думок (MindMao)
					</h4>
					<Image
						src="/about/MindMao.png"
						width={520}
						height={400}
						alt="фото"
						className="w-full h-auto max-w-[520px] mb-[16px]"
					/>
					<a href="#" className="text-blue-500 underline">
						Завантажити мапу думок
					</a>
				</div>
				<div className="mb-[24px] flex flex-col">
					<h4 className="font-ubuntu font-bold text-[22px] sm:text-[25px] leading-[130%] tracking-[-0.01em] mb-[16px]">
						Сертифікат мапи думок
					</h4>
					<Image
						src="/about/certificate-mindMao.png"
						width={520}
						height={736}
						alt="фото"
						className="w-full h-auto max-w-[520px]"
					/>
				</div>
			</div>
		</section>
	);
};

export default MindMao;
