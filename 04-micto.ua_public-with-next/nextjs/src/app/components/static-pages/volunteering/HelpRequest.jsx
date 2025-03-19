import React from 'react';
import Button from '../../global/Button';

const HelpRequest = () => {
	return (
		<>
			<section className="flex flex-col justify-center items-center mb-[40] lg:mb-[80]">
				<div className="flex justify-center align-center items-center box-border lg:w-[1071px] w-auto h-[216px] border border-[#CCCDCD] shadow-[0_6px_16px_rgba(0,0,0,0.72)] rounded-[7px]">
					<div className="flex flex-col items-center lg:w-[630px] w-auto">
						<h4 className="lg:w-[457px] w-auto text-center flex justify-center align-center lg:text-[25px] text-[23px] leading-[130%] font-ubuntu font-bold tracking-[-0.01em] mb-[24]">
							Якщо ви бажаєте допомогти або потребуєте допомоги
						</h4>
						<Button label={'Подати заявку'} />
					</div>
				</div>
			</section>
		</>
	);
};

export default HelpRequest;
