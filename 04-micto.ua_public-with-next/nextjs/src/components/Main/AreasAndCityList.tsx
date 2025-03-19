import Link from 'next/link';
import { AreaList, CityList } from '@/graphql/generated/types';

interface IAreasAndCityListProps {
	areas: AreaList;
	areaCenters: CityList;
}

export default function AreasAndCityList({ areas, areaCenters }: IAreasAndCityListProps) {
	return (
		<ul className="min-[769px]:hidden flex flex-col gap-6">
			{areas?.items?.map((area, index) => (
				<li key={area.name} className="flex flex-col gap-2">
					<Link
						href={`/${area.slug}-r${area.oldId}`}
						className="w-fit fontUbuntuBold20 text-main hover-effect"
					>
						{area.fullName}
					</Link>
					{areaCenters && areaCenters.items && (
						<Link
							href={`${areaCenters.items[index].slug}-r${areaCenters.items[index].oldId}`}
							className="w-fit fontInterRegular18 text-main hover-effect"
						>
							{areaCenters.items[index].name}
						</Link>
					)}
				</li>
			))}
		</ul>
	);
}
