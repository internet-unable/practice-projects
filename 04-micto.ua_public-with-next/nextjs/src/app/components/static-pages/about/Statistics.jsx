import React from 'react';
import Image from 'next/image';

const Statistics = () => {
	return (
		<section className="flex flex-col justify-center items-center">
			<div className="lg:max-w-full max-w-[630]">
				<h2 className="font-inter font-bold text-[40px] lg:text-[45px] mb-[24] lg:mb-[40px] sm:text-[36px]">
					Інвесторам
				</h2>
				<p className="font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[24] lg:mb-[40px] max-w-[630px] lg:max-w-full sm:text-[16px]">
					Для того, щоб зробити проект привабливим для рекламодавців, необхідно збільшити
					аудиторію проекту від 100 тис. відвідувачів в день.
				</p>
				{[2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022].map((year) => (
					<div
						className="flex flex-col-reverse lg:flex-row items-start mb-[40] lg:mb-[80px]"
						key={year}
					>
						<Image
							src={`/about/google-analytics-${year}.png`}
							alt={`google analytics ${year}`}
							width={633}
							height={168}
							className="w-full max-w-[633px] mb-4 lg:mb-0 lg:mr-[30px]"
						/>
						<div className="max-w-[630px] flex flex-col text-left lg:max-w-full">
							<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] mb-[24px] ">
								Google Analytics за {year}
							</h4>
							<p className="font-inter font-medium text-[18px] leading-[150%] sm:text-[16px]">
								{year === 2014
									? '9741 користувачів за місяць, максимально - 506 за день (15.12.2014), середній показник за рік - 272 користувачі в день'
									: year === 2015
									? '37468 користувачів за місяць, максимально - 1784 за день (14.12.2015), середній показник за рік - 830 користувачів в день'
									: year === 2016
									? '54748 користувачів за місяць, максимально - 2698 за день (12.12.2016), середній показник за рік - 1542 користувачів в день'
									: year === 2017
									? '70409 користувачів за місяць, максимально - 3259 за день (27.11.2017), середній показник за рік - 2051 користувачів в день'
									: year === 2018
									? '86865 користувачів за місяць, максимально - 8232 за день (17.14.2018), середній показник за рік - 1914 користувачів в день'
									: year === 2019
									? '54929 користувачів за місяць, максимально - 2619 за день (12.08.2019), середній показник за рік - 1532 користувачів в день'
									: year === 2020
									? '102279 користувачів за місяць, максимально - 5125 за день (25.08.2020), середній показник за рік - 2888 користувачів в день'
									: year === 2021
									? '160366 користувачів за місяць, максимально - 7543 за день (22.03.2021), середній показник за рік - 4396 користувачів в день'
									: '206257 користувачів за місяць, максимально - 9214 за день (15.08.2022), середній показник за рік - 5238 користувачів в день'}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Statistics;
