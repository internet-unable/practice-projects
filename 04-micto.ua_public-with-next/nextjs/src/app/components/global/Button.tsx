import React from 'react';

const Button = ({ label }: { label: string; marginTop?: string }) => {
	return (
		<div className="flex justify-center items-center">
			<button className=" text-white p-[0_24px] gap-2.5 w-[290px] h-[50px] bg-[#007DCF] rounded-[7px]">
				{label}
			</button>
		</div>
	);
};

export default Button;
