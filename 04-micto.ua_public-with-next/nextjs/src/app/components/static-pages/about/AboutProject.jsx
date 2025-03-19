import React from 'react';
import Image from 'next/image';

const AboutProject = () => {
	return (
		<section className="flex flex-col justify-center items-center lg:items-start mb-[40px] lg:mb-[80]">
			<div>
				<h1 className="font-inter font-bold text-[45px] leading-[120%] mb-[24] lg:mb-[40]">
					Про проєкт
				</h1>

				<div className="flex flex-col lg:flex-row">
					<div className="max-w-[630px] flex flex-col justify-center font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
						<p className="mb-4">
							Ми, команда проєкту Micto.ua. У 2014-ому році, у зв’язку з війною і
							появою переселенців в країні, до нас звернулось МОЗ України
							(Міністерство з Охорони Здоров’я України) з проханням розробити і
							впровадити інтернет-проект, який допоможе людям швидко і просто знайти
							медичний заклад на території України.
						</p>
						<p className="mb-4">
							При цьому міністерство не було готове виділити державні кошти на
							реалізацію даного проекту. Тому я, Дмитро Юрійович Асмагілов взяв
							ініціативу в свої руки і вклав власні сили в стартап "MICTO.UA",
							залучаючи співробітників компанії ТОВ "SOFT.UA" для реалізації та
							підтримки працездатності цього ресурсу.
						</p>
						<p className="mb-4">
							Після оголошення війни росією Україні 24 лютого 2022 року, відчуваємо,
							що подібний ресурс стане ще більш затребуваним, в звʼязку з величезною
							кількістю біженців.
						</p>
					</div>

					<Image
						src="/about/logo-kolir-1.png"
						alt="Логотип"
						width={242}
						height={248}
						className="w-full max-w-[242px] sm:max-w-[300px] lg:min-w-[469px] h-auto mb-[29px] mx-auto"
						priority
					/>
				</div>

				<div className="flex flex-col-reverse lg:flex-row justify-center items-center">
					<Image
						src="/about/logo-micto.png"
						alt="Фото"
						width={630}
						height={161}
						className="mr-[30] w-full max-w-[242px] sm:max-w-full lg:min-w-[630px] h-auto mb-[29px]"
						priority
					/>
					<div className="max-w-[630px] font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
						<p className="mb-4">
							Багато медичних закладів зазнало бомбардувань та зруйновані, медичний
							персонал евакуйовано, проте вони можуть та надають медичну допомогу на
							нових місцях. Своєчасна інформація про розташування та працездатність
							того чи іншого медичного закладу, врятує не одне життя.
						</p>
						<p className="mb-4">
							Окрім цього, велика кількість людей в блокованих містах, через
							відсутність руху транспорту та закриття аптек, не мають доступ до
							необхідних для них ліків, що загрожує їх життю так само як і
							бомбардування.
						</p>
						<p className="mb-4">
							Ми відчуваємо необхідність в такий складний час, зробити все від нас
							залежне, щоб допомогти людям які шукають медичні заклади та потребують
							медичної допомоги.
						</p>
					</div>
				</div>

				<div className="max-w-[630px] font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em] ">
					<p className="mb-6">
						Особливу увагу ми надаємо підтримці дітям та людям літнього віку, які є
						найбільш вразливими верствами населення.
					</p>

					<p>
						Організовано гуманітарний штаб в Києві, в якому за рахунок внесків та
						пожертвувань закуповуються медикаменти, засоби гігієни. Співпрацюємо з
						іноземними фондами у допомозі по евакуації дітей за кордон (в першу чергу,
						це діти-сироти, які опинились в найскрутнішому становищі).
					</p>
				</div>
			</div>
		</section>
	);
};

export default AboutProject;
