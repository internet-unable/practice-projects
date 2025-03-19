import React from 'react';

import MediaKitSlider from '../components/static-pages/advertising/MediaKitSlider';

const Advertising = () => {
	return (
		<>
			<section className="max-w-[1290] mx-auto px-4 sm:px-6 md:px-8">
				<h1 className="font-inter font-bold lg:text-[45px] text-[40px] leading-[120%] flex items-center mb-[40] lg:mb-[80]">
					Реклама на MICTO.UA
				</h1>
				<div className="max-w-[630] font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
					<div className="mb-[40] lg:mb-[80]">
						<p className="mb-[16]">
							Вітаємо на МІСТО.ЮА, найбільшому онлайн-каталозі медичних закладів
							України, створеному у співпраці з Міністерством охорони здоров’я
							України.
						</p>
						<p>
							Наш портал є джерелом важливої контактної інформації та чесних відгуків
							про державні та комунальні медичні заклади України.
						</p>
					</div>
					<div className="mb-[40] lg:mb-[80]">
						<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em] mb-[40]">
							Чому варто рекламуватися на порталі MICTO?
						</h4>
						<ul className="list-none">
							<li className="mb-[16]">
								Цільова аудиторія: жінки (~70%) та чоловіки (~30%) віком від 30
								років.
							</li>
							<li className="mb-[16]">
								Наші відвідувачі — це люди, які активно цікавляться медичними
								послугами, що робить MICTO.UA ідеальним місцем для рекламування
								медичних товарів та послуг, клінік і приватних лікарів.
							</li>
							<li className="mb-[16]">
								Наші відвідувачі — це люди, які активно цікавляться медичними
								послугами, що робить MICTO.UA ідеальним місцем для рекламування
								медичних товарів та послуг, клінік і приватних лікарів.
							</li>
							<li className="mb-[16]">
								Високий трафік: Щомісяця наш сайт відвідує понад 250.000 унікальних
								користувачів, що забезпечує високу видимість вашої реклами.
							</li>
							<li className="mb-[16]">~8000 відвідувань/день</li>
							<li className="mb-[16]">
								Гнучкі рекламні рішення: Ми пропонуємо різноманітні формати реклами,
								включаючи:
							</li>
							<li className="mb-[16]">
								<strong>Банери різних розмірів —</strong> розміщуйте вашу рекламу у
								вигляді горизонтальних стрічок або середніх прямокутників на
								ключових сторінках сайту.
							</li>
							<li className="mb-[16]">
								<strong>Відео банери —</strong> залучайте аудиторію за допомогою
								динамічних відеороликів.
							</li>
							<li className="mb-[16]">
								<strong>Ексклюзивні умови —</strong> можливість стати єдиним
								рекламодавцем на сайті.
							</li>
							<li className="mb-[16]">
								<strong>Цільова реклама —</strong> фокусуйте ваші рекламні кампанії
								на специфічних типах клінік, наприклад, зосереджених на
								репродуктивному здоров’ї.
							</li>
						</ul>
					</div>
				</div>
				<MediaKitSlider />
				<div className="max-w-[630] font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
					<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em] mb-[40]">
						Готові дізнатися більше?
					</h4>
					<p className="mb-[24]">
						Зв’яжіться з нами зараз, щоб обговорити як ми можемо допомогти вам досягти
						вашої цільової аудиторії через ефективні рекламні стратегії.
					</p>
					<ul className="list-none">
						<li className="mb-[16]">
							<strong>Менеджер проєкту:</strong> Михайло Данилов
						</li>
						<li className="mb-[16]">
							<strong>Телефон:</strong> 
							<a
								href="tel:+0730746476"
								className="text-[#007DCF] text-[18px] font-medium leading-[150%] tracking-[-0.01em] underline"
							>
								073 074 64 76
							</a>
						</li>
						<li className="mb-[16]">
							<strong>Email:</strong> 
							<a
								href="mailto:m.michael@soft.ua"
								className="text-[#007DCF] text-[18px] font-medium leading-[150%] tracking-[-0.01em] underline"
							>
								m.michael@soft.ua
							</a>
						</li>
					</ul>
				</div>
			</section>
		</>
	);
};

export default Advertising;
