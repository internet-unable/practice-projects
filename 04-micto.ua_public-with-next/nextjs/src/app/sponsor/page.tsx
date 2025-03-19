'use client';

import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

import Button from '../components/global/Button';

const Sponsor = () => {
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
		<>
			<section className="max-w-[1290px] mx-auto px-4 sm:px-8">
				<h1 className="font-inter font-bold text-4xl leading-[120%] mb-[24] lg:mb-[80px]">
					Спонсорам
				</h1>
				<div className="font-inter font-medium text-base leading-[150%] max-w-[630px] mx-auto sm:mx-0">
					<p className="mb-[16px]">
						Наш проект потребує вдосконалення для блага українців в сфері здоров’я. На
						даному етапі ми розширюємо наш каталог медичних закладів.
					</p>
					<p className="mb-[16px]">
						Найближчий крок - створення особистих кабінетів відвідувачів та організацій.
					</p>
					<p className="mb-[16px]">
						Для чого ми це робимо? Щоб користувачі мали більше свободи для висловлення
						свого ставлення в сфері здоров'я, компанії мали можливість надавати більше
						інформації про себе, а ринок став прозорим і відкритим.
					</p>
					<p className="mb-[16px]">
						Технічні партнери нашого проекту веб студія Soft.ua і ФОП Недомовний Дмитро.
					</p>
					<p className="mb-[16px]">
						Для підтримки і розвитку проекту Ви можете перерахувати будь-яку суму на
						карту Приватбанку:
					</p>
				</div>
				<div className="flex flex-col justify-center items-center">
					<div className="w-full max-w-[1071px] h-auto bg-[#FAFAFA] rounded-[7px] mb-[24px] sm:mb-[16px]">
						<div className="p-[20px] sm:p-[40px] w-full sm:w-[670px] h-auto">
							<div className="flex items-center gap-[8px] mb-[16px] ml-[-33px]">
								<Image
									src="/partners/icons/CreditCard.svg"
									alt="Іконка рахунку"
									width={24}
									height={24}
								/>
								<h4 className="font-ubuntu font-bold text-[20px] sm:text-[25px] leading-[130%] tracking-[-0.01em]">
									Номер картки
								</h4>
							</div>
							<ul className="list-none font-inter font-medium text-[16px] sm:text-[18px] leading-[150%] tracking-[-0.01em]">
								<li>Недомовний Дмитро Михайлович</li>
								<li>
									<span
										onClick={() => copyToClipboard('4149 6054 6633 8530')}
										className="cursor-pointer text-blue-500"
									>
										4149 6054 6633 8530
									</span>
								</li>
								<li>Приватбанк, VISA</li>
							</ul>
						</div>
					</div>
					<div className="w-full max-w-[1071px] h-auto bg-[#FAFAFA] rounded-[7px] mb-[24] lg:mb-[80px] sm:mb-[40px]">
						<div className="p-[20px] sm:p-[40px] w-full sm:w-[670px] h-auto">
							<div className="flex items-center gap-[8px] mb-[16px] ml-[-33px]">
								<Image
									src="/partners/icons/CreditCard.svg"
									alt="Іконка рахунку"
									width={24}
									height={24}
								/>
								<h4 className="font-ubuntu font-bold text-[20px] sm:text-[25px] leading-[130%] tracking-[-0.01em]">
									Рахунок-фактура
								</h4>
							</div>
							<ul className="list-none font-inter font-medium text-[16px] sm:text-[18px] leading-[150%] tracking-[-0.01em]">
								<li>
									Номер рахунку Укрсиббанку{' '}
									<span
										onClick={() =>
											copyToClipboard('UA813510050000026003878906785')
										}
										className="cursor-pointer text-blue-500"
									>
										UA813510050000026003878906785
									</span>
								</li>
								<li>
									Найменування банку одержувача АТ{' '}
									<span
										onClick={() => copyToClipboard('АТ «УКРСИББАНК»')}
										className="cursor-pointer text-blue-500"
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
										className="cursor-pointer text-blue-500"
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
								<li>
									S.W.I.F.T. код{' '}
									<span
										onClick={() => copyToClipboard('KHABUA2K')}
										className="cursor-pointer text-blue-500"
									>
										KHABUA2K
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div>
					<h4 className="font-inter font-bold text-4xl leading-[120%] mb-[24] lg:mb-[40px]">
						Спонсорська допомога
					</h4>
					<div className="font-inter font-medium text-base leading-[150%] w-full sm:w-[630px] mx-auto sm:mx-0">
						<p className="mb-[16px]">
							Якщо ви бажаєте стати нашим спонсором, меценатом, бізнес-ангелом,
							інвестором і маєте можливості допомогти ресурсу МІСТО.ЮА та проекту «Я і
							здоров’я» - натисніть кнопку «Стати спонсором» нижче для отримання
							рахунку-фактури.
						</p>
						<p className="mb-[16px]">
							Вкажіть, як до Вас звертатися та як з Вами зв’язатися (Skype, WhatsApp,
							Facebook, Telegram, Email, номер телефону тощо) - наша особа-партнер
							зв’яжеться з Вами та виставить рахунок на ім’я ТОВ «СОФТ.юа» або ФОП.
						</p>
					</div>
				</div>
				<div className="flex justify-center items-center mb-[40] lg:mb-[80]">
					<div className="w-full max-w-[1071px] h-auto bg-[#FAFAFA] rounded-[7px] mt-[20px] sm:mt-[40px]">
						<div className="p-[20px] sm:p-[40px] w-full sm:w-[670px] h-auto">
							<div className="flex items-center gap-[8px] mb-[16px] ml-[-33px]">
								<Image
									src="/partners/icons/CreditCard.svg"
									alt="Іконка рахунку"
									width={24}
									height={24}
								/>
								<h4 className="font-ubuntu font-bold text-[20px] sm:text-[25px] leading-[130%] tracking-[-0.01em]">
									Рахунок фактура
								</h4>
							</div>
							<p className="list-none font-inter font-medium text-[16px] sm:text-[18px] leading-[150%] tracking-[-0.01em]">
								ПриватБанк{' '}
								<span
									onClick={() => copyToClipboard('UA793052990000026003046809425')}
									className="cursor-pointer text-blue-500"
								>
									(UAH) UA793052990000026003046809425
								</span>
							</p>
						</div>
					</div>
				</div>
				{showMessage && (
					<div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[200px] h-[50px] bg-black text-white flex justify-center items-center rounded-md shadow-lg">
						<p className="text-lg font-semibold">Скопійовано</p>
					</div>
				)}

				<Button label="Стань спонсором проєкту" />
			</section>
		</>
	);
};

export default Sponsor;
