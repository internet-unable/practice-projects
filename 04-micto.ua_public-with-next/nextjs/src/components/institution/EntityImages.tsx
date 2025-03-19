import Image from 'next/image';
import React from 'react';

const EntityImages = ({ wrapperClassName }: { wrapperClassName?: string }) => {
	return (
		<div
			className={
				'flex flex-col w-full items-start p-6 bg-white rounded-lg duration-300 h-fit ' +
				wrapperClassName
					? wrapperClassName
					: ''
			}
		>
			<Image src={'/no-photo.svg'} alt="Немає фото" width={384} height={297} />
		</div>
	);
};

export default EntityImages;
