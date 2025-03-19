import Container from '@/controllers/component/Elements/Container';
import { cn } from '@/lib/utils';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface IPropsHeaderTabs {
	headerTitle?: string;
	headerImgUrl: string;
	flexibleRedirectLink?: string;
	goBackOnClick?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const HeaderTabs: React.FC<IPropsHeaderTabs> = ({
	headerTitle,
	headerImgUrl,
	flexibleRedirectLink,
	goBackOnClick = false,
	children,
	className,
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header
			className={cn('bg-white px-6 desktop:px-0 desktop:bg-[var(--bg-color)] ', className)}
		>
			<Container className="flex items-center justify-start h-[72px] desktop:h-auto desktop:mb-10 desktop:mt-6 ">
				<div className="flex items-center gap-5">
					{flexibleRedirectLink ? (
						<Link to={flexibleRedirectLink} aria-label="Back to cabinet">
							<img
								className="max-w-[155px]"
								src={headerImgUrl}
								alt={`Navigate back - ${headerTitle}`}
							/>
						</Link>
					) : (
						<>
							<button
								onClick={() => {
									window.history.back();
								}}
							>
								<img
									className="max-w-[155px]"
									src={headerImgUrl}
									alt={`Navigate back - ${headerTitle}`}
								/>
							</button>
						</>
					)}

					{!!headerTitle && (
						<h2 className="fontTitleBold text-[var(--color5)] desktop:fontHeaderBold">
							{headerTitle}
						</h2>
					)}
					{!!children && children}
				</div>
			</Container>
		</header>
	);
};

export default HeaderTabs;
