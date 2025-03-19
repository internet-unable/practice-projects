import Image from 'next/image';
import React from 'react';

const MsekReformBlock = (className: { className?: string }) => {
	return (
		<div
			className={
				'flex gap-2 border border-[var(--blue2)] rounded-lg p-6 bg-white ' + className
			}
		>
			<Image alt="Реформа мсек" src={'/msek.svg'} width={70} height={55} />
			<div>
				<div className="fontInterMedium16 text-main">Реформа МСЕК 2025</div>
				<span className="fontInterRegular14">
					У цьому закладі діє експертна команда з оцінювання повсякденного функціонування{' '}
					<span className="text-main">(ЕКОПФО)</span>
				</span>
			</div>
		</div>
	);
};

export default MsekReformBlock;
