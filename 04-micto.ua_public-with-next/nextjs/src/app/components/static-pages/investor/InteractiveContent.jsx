import React from 'react';
import Image from 'next/image';

const InteractiveContent = () => {
	return (
		<>
			<section className="flex flex-col justify-center font-inter font-medium text-[18px] leading-[200%] tracking-[-0.01em] mt-[40] lg:mt-[80]">
				<div className="mb-[40] lg:mb-[80]">
					<h4 className="font-ubuntu font-bold lg:text-[25px] text-[20px] leading-[130%] tracking-[-0.01em] text-[#000305] lg:mb-[40] mb-[24]">
						Презентація проекту
					</h4>
					<div className="mb-[40]">
						<Image
							src={'/investor/presentation.png'}
							alt="Презентація"
							width={1000}
							height={750}
							className="mx-auto"
						/>
					</div>
					<div className="w-full max-w-[630px] flex flex-col items-start gap-4">
						<button className="underline text-[#007DCF] text-left">
							Завантажити PDF презентацію українською мовою
						</button>
						<button className="underline text-[#007DCF] text-left">
							Скачать PDF презентацию на русском языке
						</button>
						<button className="underline text-[#007DCF] text-left">
							Download PDF presentation in English
						</button>
					</div>
				</div>
				<div className="mb-[40] lg:mb-[80]">
					<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em] mb-[40]">
						Мапа думок (MindMao)
					</h4>
					<Image
						src="/investor/MindMao.png"
						width={520}
						height={400}
						alt="фото"
						className="mb-[40]"
					/>
					<a href="#" className="text-blue-500 underline">
						Завантажити мапу думок
					</a>
				</div>
			</section>
		</>
	);
};

export default InteractiveContent;
