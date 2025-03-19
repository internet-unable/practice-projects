import React from 'react';
import '../../../style/about/ListItemsStart.css';

const InvestmentStages = () => {
	return (
		<section className="flex flex-col justify-center items-center lg:items-start mb-[80px] font-inter font-medium text-[18px] leading-[180%] tracking-[-0.01em] mb-[40] lg:mb-[80]">
			<div className="lg:max-w-full max-w-[630px]">
				<h2 className="font-ubuntu font-bold text-[25px] leading-[130%] mb-[40px]">
					Потреба в інвестиціях окремих етапів:
				</h2>
				<div className="flex flex-col lg:flex-row">
					<div className="lg:max-w-full max-w-[630px] lg:mr-[36] leading-[200%]">
						<ol className="ml-[20px] max-w-[630px]">
							<li>
								Зробити особисті кабінети медичної установи, користувача, лікаря - $
								20-40 тис
							</li>
							<li>Створити систему рейтингу - $ 50-100 тис</li>
							<li>
								Додати систему відгуків, коментарів (комунікація на сайті) - $ 20-40
								тис
							</li>
							<li>Додати каталог аптек - $ 50-100 тис</li>
							<li>Додати каталог симптомів - $ 50-100 тис</li>
						</ol>
					</div>
					<div className="lg:max-w-full max-w-[630px] ml-[10]">
						<ol
							className="list-none ml-[20px] list-start"
							style={{ counterReset: 'list-item 5' }}
						>
							<li>Додати каталог симптомів - $ 50-100 тис</li>
							<li>Додати каталог препаратів - $ 50-100 тис</li>
							<li>Зробити каталоги перехресними - $ 50 тис</li>
							<li>Додати гнучко настроюваний пошук - $ 50-100 тис</li>
							<li>Додати можливості телемедицини - $ 100-200 тис</li>
						</ol>
					</div>
				</div>
				<p className="lg:max-w-full max-w-[630px] mt-[40px]">
					Якщо Ви інвестор і Вас зацікавив наш проект, надсилайте нам Ваші контакти (форма
					для відправки повідомлення) або зв'яжіться з нами по одному з контактів нижче.
				</p>
			</div>
		</section>
	);
};

export default InvestmentStages;
