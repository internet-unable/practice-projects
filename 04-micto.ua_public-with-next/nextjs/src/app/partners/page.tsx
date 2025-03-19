import React from 'react';

import Moz from '../components/static-pages/partners/Moz';
import InternatinalUnity from '../components/static-pages/partners/international-unity';
import Button from '../components/global/Button';

const Partners = () => {
	return (
		<>
			<section className="max-w-[1290] mx-auto mb-[40] lg:mb-[80] flex flex-col px-4 sm:px-6 md:px-8">
				<h1 className="font-bold text-[45px] leading-[120%] mb-[40] lg:mb-[80]">Партнери проекту</h1>
				<Moz />
				<InternatinalUnity />
				<div>
					<h4 className="font-inter font-bold text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						ТОВ "СОФТ.ЮА"
					</h4>
					<ul className="list-none font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						<li>Технічний партнер.</li>
						<li>Код ЄДРПОУ: 36303750.</li>
						<li>
							<address className="not-italic">
								Адреса: 01042, м.Київ, бульвар Миколи Міхновського, 17-А
							</address>
						</li>
					</ul>
					<ul className="list-none font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
						<li>
							Пошта:{' '}
							<a
								href="mailto:infos@soft.ua"
								target="_blank"
								className="font-inter text-blue-500 underline"
							>
								infos@soft.ua
							</a>
						</li>
						<li>
							Емайл:{' '}
							<a
								href="www.soft.ua"
								target="_blank"
								className="font-inter text-blue-500 underline"
							>
								www.soft.ua
							</a>
						</li>
					</ul>
				</div>
			</section>

			<Button label="Стань інвестором проєкту" />
		</>
	);
};

export default Partners;
