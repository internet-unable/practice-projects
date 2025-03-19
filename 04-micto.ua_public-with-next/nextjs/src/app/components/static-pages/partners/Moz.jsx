import React from 'react';
import Image from 'next/image';

const Moz = () => {
	return (
		<>
			<section className="font-inter flex flex-col lg:flex-row mb-[40] lg:mb-[80]">
				<div className="max-w-[630] self-start mr-[80]">
					<h4 className="font-bold text-[30px] leading-[130%] tracking-[-0.02em] mb-[40] lg:mb-[80]">
						Міністерство охорони здоров’я України
					</h4>
					<h4 className="font-ubuntu font-bold text-[25px] leading-[130%] tracking-[-0.01em] mb-[24] lg:mb-[40]">
						Гаряча лінія
					</h4>
					<p className="font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						Відповідно до 
						<a href="#" target="_blank" className="text-blue-500 underline">
							наказу МОЗ України №292
						</a>
						 від 10.04.2013 р. "Про модернізацію роботи системи телефонної гарячої
						лінії МОЗ України" та з метою забезпечення оперативного реагування на
						звернення громадян в МОЗ діє телефонна "гаряча лінія" з 9:00 до 18:00.
					</p>
					<p className="font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[24] lg:mb-[40]">
						Телефон "гарячої лінії": 
						<a
							href="tel:+0800505201"
							target="_blank"
							className="text-blue-500 underline"
						>
							0 800 505 201
						</a>
					</p>
					<h4 className="font-bold text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						Контакти
					</h4>
					<address>01601, м. Київ, вул. Грушевського, 7</address>
					<p className="font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
						тел. 
						<a
							href="tel:+0442536194"
							target="_blank"
							className="text-blue-500 underline"
						>
							(044) 253 61 94
						</a>
					</p>
					<p className="font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						<a
							href="www.moz.gov.ua"
							target="_blank"
							className="text-blue-500 underline"
						>
							www.moz.gov.ua,
						</a>
						<a
							href="moz@moz.gov.ua"
							target="_blank"
							className="text-blue-500 underline"
						>
							moz@moz.gov.ua
						</a>
					</p>
					<h4 className="font-bold text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						Приймальна громадян
					</h4>
					<address className="font-medium text-[18px] leading-[150%] tracking-[-0.01em]">
						Адреса: м.Київ, вул. Ярославська, 41
					</address>
					<p className="font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						тел. 
						<a
							href="tel:+0444250526"
							target="_blank"
							className="text-blue-500 underline"
						>
							(044) 425 05 26
						</a>
					</p>
					<h4 className="font-bold text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						Відділ медико-соціальної експертизи Департаменту медичної допомоги МОЗ
						України
					</h4>
					<address className="font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						Адреса: м. Київ, вул. Костянтинівська, 36
					</address>
					<h4 className="font-bold text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						Центр адмінпослуг МОЗ України "Єдине вікно"
					</h4>
					<address className="font-medium text-[18px] leading-[150%] tracking-[-0.01em] mb-[16]">
						Адреса: м. Київ, вул. Ушинського, 40
					</address>
				</div>
				<div className="max-w-[630]">
					<Image
						src="/partners/moz.png"
						alt="фото"
						width={520}
						height={720}
						className="lg:max-w[520] lg:max-h-[720]"
					/>
				</div>
			</section>
		</>
	);
};

export default Moz;
