import React from 'react';

const HeroSection = () => {
	return (
		<>
			<section className="flex flex-col justify-center font-inter font-medium text-[16px] sm:text-[18px] leading-[180%] sm:leading-[200%] tracking-[-0.01em]">
				<div className="max-w-[630px] mb-[40px] sm:mb-[80px]">
					<p className="mb-[12px] sm:mb-[16px]">
						Я, Дмитро Асмагілов, хочу, щоб кожна людина на Землі змогла безпечно,
						швидко, якісно, доступно за ціною і місцем розташування, без всілякої
						дискримінації отримати в повному обсязі інформацію, послуги та товари в
						області здоров’я.
					</p>
					<p>
						Я хочу зробити прозорим ринок медичних послуг і товарів в сфері здоров’я для
						формування чесних і демократичних відносин між суб’єктами цього ринку
						(людина - лікар).
					</p>
				</div>
			</section>
		</>
	);
};

export default HeroSection;
