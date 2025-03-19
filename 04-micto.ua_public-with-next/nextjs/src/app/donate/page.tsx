'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

const Donate = () => {
	const [showMessage, setShowMessage] = useState(false);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setShowMessage(true);
			setTimeout(() => {
				setShowMessage(false);
			}, 1000);
		});
	};

	return (
		<section className="max-w-[1290] px-4 sm:px-6 md:px-8">
			<div>
				<h1 className="font-inter font-bold text-[40px] lg:text-[45px] leading-[120%] mb-[40] lg:mb-[80]">
					Спонсорська допомога
				</h1>
				<div className="flex flex-col justify-center items-center">
					<div className="lg:w-[1071px] w-full h-auto bg-[#FAFAFA] rounded-[7px] p-4 md:p-10">
						<div className="max-w-full">
							<div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 ml-0 md:ml-[-33px]">
								<Image
									src="/partners/icons/CreditCard.svg"
									alt="Іконка рахунку"
									width={24}
									height={24}
								/>
								<h4 className="font-ubuntu font-bold text-lg md:text-[25px] leading-[130%] tracking-[-0.01em]">
									Рахунок-фактура
								</h4>
							</div>
							<ul className="list-none font-inter font-medium text-base md:text-[18px] leading-[150%] tracking-[-0.01em]">
								<li>
									Номер рахунку IBAN:{' '}
									<span
										onClick={() =>
											copyToClipboard('UA813510050000026003878906785')
										}
										className="cursor-pointer text-blue-500 break-words"
									>
										UA813510050000026003878906785
									</span>
								</li>
								<li>
									Назва банку одержувача:{' '}
									<span
										onClick={() => copyToClipboard('АТ «УКРСИББАНК»')}
										className="cursor-pointer text-blue-500 break-words"
									>
										АТ «УКРСИББАНК»
									</span>
								</li>
								<li>
									МФО банку:{' '}
									<span
										onClick={() => copyToClipboard('351005')}
										className="cursor-pointer text-blue-500"
									>
										351005
									</span>
								</li>
								<li>
									ПІБ отримувача:{' '}
									<span
										onClick={() =>
											copyToClipboard('Недомовний Дмитро Михайлович')
										}
										className="cursor-pointer text-blue-500 break-words"
									>
										Недомовний Дмитро Михайлович
									</span>
								</li>
								<li>
									ІПН отримувача:{' '}
									<span
										onClick={() => copyToClipboard('3337510778')}
										className="cursor-pointer text-blue-500"
									>
										3337510778
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="lg:w-[1071px] w-full h-auto bg-[#FAFAFA] rounded-[7px] p-4 md:p-10 mt-5">
						<div className="max-w-full">
							<div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 ml-0 md:ml-[-33px]">
								<Image
									src="/partners/icons/CreditCard.svg"
									alt="Іконка рахунку"
									width={24}
									height={24}
								/>
								<h4 className="font-ubuntu font-bold text-lg md:text-[25px] leading-[130%] tracking-[-0.01em]">
									Поповнення карти
								</h4>
							</div>
							<ul className="list-none font-inter font-medium text-base md:text-[18px] leading-[150%] tracking-[-0.01em]">
								<li>
									<span
										onClick={() => copyToClipboard('4627055110705109')}
										className="cursor-pointer text-blue-500 break-words"
									>
										4627055110705109
									</span>
								</li>
								<li>Приватбанк, VISA</li>
							</ul>
						</div>
					</div>

					<div className="lg:w-[1071px] w-full h-auto bg-[#FAFAFA] rounded-[7px] p-4 md:p-10 mt-5">
						<div className="max-w-full">
							<div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6">
								<Image
									src="/partners/icons/CreditCard.svg"
									alt="Іконка рахунку"
									width={24}
									height={24}
								/>
								<h4 className="font-ubuntu font-bold text-lg md:text-[25px] leading-[130%] tracking-[-0.01em]">
									Криптовалюта
								</h4>
							</div>
							<ul className="list-none font-inter font-medium text-base md:text-[18px] leading-[150%] tracking-[-0.01em]">
								<li>
									BTC адреса:{' '}
									<span
										onClick={() =>
											copyToClipboard('17jxkkCBZZxrXxrHB8wbWk84qm1yTkVvkt')
										}
										className="cursor-pointer text-blue-500 break-words"
									>
										17jxkkCBZZxrXxrHB8wbWk84qm1yTkVvkt
									</span>
								</li>
								<li>
									ETH адреса:{' '}
									<span
										onClick={() =>
											copyToClipboard(
												'0xbd8cf81177d1b930d89b7e16794a41bb0e3154d4'
											)
										}
										className="cursor-pointer text-blue-500 break-words"
									>
										0xbd8cf81177d1b930d89b7e16794a41bb0e3154d4
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				{showMessage && (
					<div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[200px] h-[50px] bg-black text-white flex justify-center items-center rounded-md shadow-lg">
						<p className="text-lg font-semibold">Скопійовано</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default Donate;
