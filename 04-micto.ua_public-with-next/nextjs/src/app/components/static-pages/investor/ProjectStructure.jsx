import React from 'react';

const ProjectStructure = () => {
	return (
		<>
			<section className="flex flex-col justify-center font-inter font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[40] lg:mb-[80]">
				<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em] mb-[24]">
					7. Етапи проекту
				</h4>
				<div className="mb-[24]">
					<h4 className="mb-[16] font-bold">1 етап: </h4>
					<div className="max-w-[630]">
						<ol className="list-none">
							<li>
								1.1 Формування команди проекту, комунікація з державними та
								приватними організаціями.
							</li>
							<li>
								1.2 Створення документації проекту: технічне завдання, статут і
								правила, договори і т.д.
							</li>
							<li>
								1.3 Формування, структурування, об’єднання каталогів (інформації).
							</li>
							<li>
								1.4 Синхронізація даних з ресурсами, які можуть підвищити
								ефективність проекту через відкриті API.
							</li>
							<li>
								1.5 Розробка особистих кабінетів для всіх учасників проекту -
								пацієнтів (клієнтів), лікарів (фахівців), компаній (організацій).
							</li>
							<li>1.6 Формування експертних груп.</li>
							<li>1.7 Запуск системи "Живий Рейтинг Довіри".</li>
							<li>1.8 Тестування, налагодження, модернізація.</li>
						</ol>
					</div>
				</div>
				<div className="mb-[24]">
					<h4 className="mb-[16] font-bold">2 етап:</h4>
					<div className="max-w-[630]">
						<ol className="list-none">
							<li>
								2.1 Медіа і інтернет реклама проекту, робота на репутацію і
								популяризацію.
							</li>
							<li>
								2.2 Запуск контекстної реклами всередині проекту для ВК (ймовірний
								клієнт).
							</li>
							<li>2.3 Розширення сфер діяльності (ветеринарія).</li>
							<li>2.4 Запуск "Індекс Здоров’я".</li>
							<li>2.5 Тестування, налагодження, модернізація.</li>
						</ol>
					</div>
				</div>
				<div className="mb-[24]">
					<h4 className="mb-[16] font-bold">3 етап:</h4>
					<div className="max-w-[630]">
						<ol className="list-none">
							<li>3.1 Масштабування проекту на інші країни</li>
						</ol>
					</div>
				</div>
				<div className="mb-[24]">
					<h4 className="mb-[16] font-bold">Приватна частина:</h4>
					<div className="max-w-[630]">
						<ol className="ml-[25]">
							<li>Особистий кабінет компанії (організації).</li>
							<li>Особистий кабінет користувача.</li>
							<li>Особистий кабінет лікаря.</li>
							<li>Кабінет рекламодавця.</li>
						</ol>
					</div>
				</div>
				<div>
					<h4 className="mb-[16] font-bold">Загальнодоступна частина:</h4>
					<div className="lg:flex ml-[25]">
						<div className="max-w-[630] lg:w-[630] mr-[35]">
							<ol>
								<li>Каталог ліків (БАДів і ін.).</li>
								<li>Каталог діагнозів (симптомів).</li>
								<li>Каталог способів лікування.</li>
								<li>Каталог послуг.</li>
								<li>Каталог обладнання.</li>
							</ol>
						</div>
						<div className="max-w-[630] lg:w-[630] mb-[40] ml-[10] lg:ml-[0]">
							<ol
								className="list-none list-start"
								style={{ counterReset: 'list-item 5' }}
							>
								<li>Каталог інвентарю, одягу, взуття.</li>
								<li>Каталог фахівців (лікарів).</li>
								<li>Каталог підприємств.</li>
								<li>Каталог статей.</li>
								<li>Соціальна мережа.</li>
							</ol>
						</div>
					</div>
				</div>
				<div className="mb-[24] lg:mb-[40]">
					<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em] mb-[24] lg:mb-[40]">
						9. Учасники проекту
					</h4>
					<div className="lg:flex ml-[25] leading-[200%]">
						<div className="max-w-[630] lg:w-[630] mr-[35]">
							<ol>
								<li>Людина (пацієнт).</li>
								<li>Лікар (спеціаліст).</li>
								<li>Клініки і лікарні.</li>
								<li>Аптеки.</li>
								<li>Інститути та наукові центри.</li>
								<li>Навчальні заклади.</li>
								<li>Лабораторії.</li>
							</ol>
						</div>
						<div className="max-w-[630] lg:w-[630] ml-[10] lg:ml-[0]">
							<ol
								className="list-none list-start"
								style={{ counterReset: 'list-item 7' }}
							>
								<li>Міністерства охорони здоров’я.</li>
								<li>Фармацевтичні компанії.</li>
								<li>Туристичні компанії.</li>
								<li>Виробники обладнання, одягу, взуття та ін.</li>
								<li>Страхові компанії.</li>
								<li>Банки (ін. Фінансові установи).</li>
							</ol>
						</div>
					</div>
				</div>
				<div className="mb-[24] lg:mb-[40]">
					<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em] mb-[24] lg:mb-[40]">
						10. Клієнти проекту
					</h4>
					<p className="max-w-[630] mb-[16]">
						Далі під клієнтами проекту я маю на увазі тих учасників, які приносять гроші
						проекту або соціальну рекламу у вигляді популяризації.
					</p>
					<h4 className="font-bold mb-[24]">Клієнти:</h4>
					<div className="lg:flex ml-[25] leading-[200%]">
						<div className="max-w-[630] lg:w-[630] mr-[35]">
							<ol>
								<li>Користувач (пацієнт, покупець).</li>
								<li>Лікар (спеціаліст).</li>
								<li>Клініки і лікарні.</li>
								<li>Аптеки.</li>
								<li>Інститути та наукові центри.</li>
								<li>Навчальні заклади.</li>
								<li>Лабораторії.</li>
							</ol>
						</div>
						<div className="max-w-[630] lg:w-[630] ml-[10] lg:ml-[10]">
							<ol
								className="list-none list-start"
								style={{ counterReset: 'list-item 7' }}
							>
								<li>Фармацевтичні компанії.</li>
								<li>Туристичні компанії.</li>
								<li>Виробники обладнання, одягу, взуття та ін.</li>
								<li>Страхові компанії.</li>
								<li>Банки (ін. Фінансові установи).</li>
								<li>Міжнародні організації в області розвитку охорони здоров’я.</li>
								<li>Волонтери.</li>
							</ol>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProjectStructure;
