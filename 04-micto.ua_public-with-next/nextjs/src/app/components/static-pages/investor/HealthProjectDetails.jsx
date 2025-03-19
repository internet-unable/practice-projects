import React from 'react';

import '../../../style/investor/HealthProjectDetailsStyle.css';

const HealthProjectDetails = () => {
	return (
		<>
			<section className="flex flex-col justify-center font-inter font-medium text-[18px] leading-[200%] tracking-[-0.01em] mb-[40] lg:mb-[80]">
				<div className="mb-[40] lg:mb-[80]">
					<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em]">
						Я і Здоров’я!
					</h4>
					<ul className="ml-[25] leading-[150%]">
						<li>Навіщо потрібен проект (у чому його новизна)?</li>
						<li>Кому потрібен проект?</li>
						<li>Які проблеми вирішить проект?</li>
						<li>Яким способом проект вирішить проблеми?</li>
						<li>Які вигоди отримають користувачі проекту?</li>
						<li>Як проект буде заробляти?</li>
						<li>Етапи реалізації проекту?</li>
						<li>Скільки грошей потрібно, щоб реалізувати проект?</li>
					</ul>
				</div>

				<div className="mb-[40] lg:mb-[80]">
					<h4 className="font-ubuntu font-bold text-[25px] leading-[150%] tracking-[-0.01em] mb-[40]">
						Організації в галузі медицини:
					</h4>
					<div className="lg:flex font-inter text-[18px] leading-[150%] tracking-[-0.01em]">
						<div className="mr-[36] max-w-[630] ml-[25]">
							<ol>
								<div className="mb-[16]">
									<li className="font-bold">
										Всесвітня Організація Охорони Здоров’я
									</li>
									<p>World Health Organization</p>
									<p>https://www.who.int/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">
										Інститут вимірювання і оцінки показників здоров’я
									</li>
									<p>Institute for Health Metrics and Evaluation</p>
									<p>http://www.healthdata.org/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">Стартапи в області ЗДОРОВ’Я</li>
									<p>Institute for Health Metrics and Evaluation</p>
									<p>http://www.healthdata.org/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">
										Перший венчурний фонд, присвячений IT в області здоров’я
									</li>
									<p>The first venture fund dedicated to digital health</p>
									<p>https://rockhealth.com/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">The Nuffield Trust (Нюфілд Траст)</li>
									<p>
										Nuffield Trust є незалежною благодійною організацією охорони
										здоров’я. Ми прагнемо поліпшити якість медичної допомоги в
										Великобританії, надаючи дослідження, засновані на фактичних
										даних, а також формуючи політику інформування та дискусії.
									</p>
									<p>https://www.nuffieldtrust.org.uk/about</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">
										Проникливе охоплення технологій охорони здоров’я
									</li>
									<p>https://hitconsultant.net/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">HIMSS</li>
									<p>
										HIMSS є глобальною некомерційною організацією, орієнтованою
										на поліпшенні здоров’я за допомогою інформаційних технологій
										(IT). HIMSS веде роботу по оптимізації зобов’язань в області
										здоров’я і якості послуг з використанням інформаційних
										технологій.
									</p>
									<p>https://www.himss.org/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">HIMSS</li>
									<p>
										HIMSS є глобальною некомерційною організацією, орієнтованою
										на поліпшенні здоров’я за допомогою інформаційних технологій
										(IT). HIMSS веде роботу по оптимізації зобов’язань в області
										здоров’я і якості послуг з використанням інформаційних
										технологій.
									</p>
									<p>https://www.himss.org/</p>
								</div>
							</ol>
						</div>
						<div className="max-w-[630] lg:ml-[36] ml-[30]">
							<ol
								className="list-none list-start"
								style={{ counterReset: 'list-item 8' }}
							>
								<div>
									<li className="font-bold">Digital Health</li>
									<p>
										HIMSS є глобальною некомерційною організацією, орієнтованою
										на поліпшенні здоров’я за допомогою інформаційних технологій
										(IT). HIMSS веде роботу по оптимізації зобов’язань в області
										здоров’я і якості послуг з використанням інформаційних
										технологій.
									</p>
									<p>https://www.himss.org/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">DigiHealth Helper</li>
									<p>
										HIMSS є глобальною некомерційною організацією, орієнтованою
										на поліпшенні здоров’я за допомогою інформаційних технологій
										(IT). HIMSS веде роботу по оптимізації зобов’язань в області
										здоров’я і якості послуг з використанням інформаційних
										технологій.
									</p>
									<p>https://www.himss.org/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">Validic</li>
									<p>
										Спрощуючи дані здоров’я - платформа Validic і мобільні
										рішення дозволяють витягати і аналізувати значущі висновки
										для населення.
									</p>
									<p>https://validic.com/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">Omada Health</li>
									<p>
										Ми допомагаємо роботодавцям і організаціям, що планують
										вирішувати питання в області охорони здоров’я, пов’язані з
										хронічними захворюваннями найбільш привабливим, ефективним і
										масштабованим способом.
									</p>
									<p>https://www.omadahealth.com/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">FierceHealthIT</li>
									<p>Інформаційний портал новин</p>
									<p>https://www.fiercehealthcare.com/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">HEALTH 2.0</li>
									<p>
										"Здоров’я 2.0" генерує, презентує і каталізує нові
										технології в охороні здоров’я. Завдяки всесвітній серії
										конференцій, код-A-Thons, і призовим змагань, ми об’єднуємо
										кращі уми, ресурси і технології для виконання невідкладних
										завдань, дискусій і демонстрації продуктів та багато чого
										іншого.
									</p>
									<p>https://health2con.com/</p>
								</div>
								<div className="mb-[16]">
									<li className="font-bold">Helsi.me</li>
									<p>Електронна медична система.</p>
									<p>https://helsi.me/</p>
								</div>
							</ol>
						</div>
					</div>
				</div>
				<div className="mb-[16]">
					<h4 className="font-bold mb-[16]">
						Технології та інновації в галузі медицини:
					</h4>
					<ol className="ml-[25]">
						<li>
							An electronic health record (EHR), or electronic medical record (EMR)
							<p>https://en.wikipedia.org/?curid=1129641</p>
						</li>
						<li>
							IoT - Internet of Things
							<p>https://en.wikipedia.org/?curid=12057519</p>
						</li>
						<li>
							Global Health Observatory (GHO)
							<p>https://en.wikipedia.org/?curid=43211084</p>
						</li>
					</ol>
				</div>
			</section>
		</>
	);
};

export default HealthProjectDetails;
