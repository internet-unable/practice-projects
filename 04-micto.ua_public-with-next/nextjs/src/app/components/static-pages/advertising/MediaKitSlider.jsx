import React from 'react';
import Image from 'next/image';

const MediaKitSlider = () => {
	return (
		<>
			<section className="flex flex-col justify-center items-center mb-[40] lg:mb-[80px]">
				<div className="w-full max-w-[1290px]">
					<h4 className="font-ubuntu font-bold text-[20px] lg:text-[25px] leading-[130%] tracking-[-0.01em] mb-[24px]">
						Медіа кіт проєкту
					</h4>
					<div className="mb-[16px]">
						<Image
							src={'/advertising/MICTO.UA-media-kit-v2-01-1.png'}
							alt="медіа кіт"
							width={1290}
							height={725}
							priority
							className=""
						/>
					</div>
					<button className="text-[#007DCF] text-[16px] sm:text-[18px] font-medium leading-[150%] tracking-[-0.01em] underline mt-[24px] mx-auto">
						Завантажити PDF медіа кіт
					</button>
				</div>
			</section>
		</>
	);
};

export default MediaKitSlider;
