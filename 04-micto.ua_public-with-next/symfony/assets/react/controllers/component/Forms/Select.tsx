import * as React from 'react';
import Select, {
	GroupBase,
	MenuProps,
	OptionsOrGroups,
	SingleValueProps,
	components,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { Area, District, SelectItem } from '../../../Types/cabinetTypes';
import { fetchGraphQL, getDistrictsQuery } from '../../../reduxToolkit/query/selectQuery';
import { useAppSelector } from '../../../reduxToolkit/hooks';

type Props = {
	id: string;
	isAsync?: boolean;
	placeholder?: string;
	label?: string;
	options?: SelectItem[] | ((dependsOnValue?: string) => Promise<SelectItem[]>);
	customClass?: string;
	fetchOptions?: Function;
	setStateValue?: Function;
	stateValue?: SelectItem;
	dependsOn?: SelectItem | Area | District;
	customOnChange?: (val?: SelectItem) => void;
};

export default function SelectWrapper({
	id,
	label,
	isAsync = false,
	fetchOptions,
	placeholder,
	options,
	customClass,
	setStateValue,
	stateValue,
	dependsOn,
	customOnChange,
}: Props) {
	const institutionUnit = useAppSelector((state) => state.institutionUnit.unit);

	const [currentOptions, setCurrentOptions] = React.useState<SelectItem[]>([]);

	const handleChange = async (val: SelectItem) => {
		if (customOnChange) {
			customOnChange(val);
		}
	};

	React.useEffect(() => {
		const fetchInitalOptions = async () => {
			if (!Array.isArray(options)) {
				const items = await options();
				setCurrentOptions(items);
				return items;
			}
		};
		fetchInitalOptions();
	}, []);

	function SingleValue<T>(props: SingleValueProps<T, false>) {
		const { children, ...rest } = props;
		const { selectProps } = props;
		if (selectProps.menuIsOpen) return <div className="select-search-help">Пошук</div>;
		return <div {...rest}>{children}</div>;
	}

	const asyncLoadOptions = async (inputValue: string) => {
		return await fetchOptions().then((items: SelectItem[]) => {
			return items.filter((el: SelectItem) =>
				el.label.toLowerCase().includes(inputValue.toLowerCase())
			);
		});
	};

	return (
		<div className={`input-wrapper ${customClass ? customClass : ''}`}>
			{label && (
				<div>
					<span>{label}</span>
				</div>
			)}
			{isAsync ? (
				<AsyncSelect
					id={id}
					placeholder={placeholder}
					defaultValue={stateValue}
					loadOptions={asyncLoadOptions}
					key={`select_${id}`}
					value={stateValue}
					components={{ SingleValue }}
					onChange={(val: SelectItem) => handleChange(val)}
				/>
			) : (
				<Select
					id={id}
					placeholder={placeholder}
					options={currentOptions}
					value={stateValue}
					components={{ SingleValue }}
					onChange={(val: SelectItem) => handleChange(val)}
					styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							borderColor: state.isFocused ? 'grey' : 'red',
						}),
					}}
				/>
			)}
		</div>
	);
}
