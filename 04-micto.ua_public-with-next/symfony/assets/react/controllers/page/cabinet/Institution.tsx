import Container from '@/controllers/component/Elements/Container';
import CustomButton from '@/controllers/component/Elements/CustomButton';
import HeaderTabs from '@/controllers/component/Elements/HeaderTabs';
import FormInstitution from '@/controllers/component/Forms/FormInstitution';
import { useAppDispatch, useAppSelector } from '@/reduxToolkit/hooks';
import { fetchMyInstitutions, updateInstitutions } from '@/reduxToolkit/slices/institutionSlice';
import { Institution } from '@/Types/cabinetTypes';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import qs from 'qs';

export interface IFormInstitution {
	id: number;
	input: {
		name: string;
		fullName: string;
		description: string;
	};
}

interface IPropsInstitution {}

export default function Institution(props: IPropsInstitution) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { institutionId } = useParams();

	const [institution, setInstitution] = React.useState<Institution>();

	const { institutions, currentInstitutionId, loading } = useAppSelector(
		(state) => state.myInstitutions
	);

	React.useEffect(() => {
		if (!(institutions.length > 0) && !currentInstitutionId) dispatch(fetchMyInstitutions());
	}, [dispatch]);

	React.useEffect(() => {
		if (institutions) {
			const currentInstitution = institutions.find((e) => e.id.toString() === institutionId);
			if (currentInstitution) {
				setInstitution(currentInstitution);
			}
		}
	}, [institutions]);

	const { handleSubmit, control, reset, watch, formState } = useForm<IFormInstitution>({
		defaultValues: {
			id: Number(institutionId),
			input: {
				name: institution?.name || '',
				fullName: institution?.fullName || '',
				description: institution?.description || '',
			},
		},
	});

	React.useEffect(() => {
		if (institution) {
			reset({
				id: Number(institution.id),
				input: {
					name: institution.name || '',
					fullName: institution.fullName || '',
					description: institution.description || '',
				},
			});
		}
	}, [institution]);

	const onSubmitInstitution: SubmitHandler<IFormInstitution> = async (data) => {
		const { id, input } = data;

		const institutionEditData = {
			id,
			institution: {
				name: input.name,
				fullName: input.fullName,
				description: input.description,
			},
		};

		const res = await dispatch(updateInstitutions(institutionEditData));
		console.log(res, 'res');
	};

	React.useEffect(() => {
		if (currentInstitutionId) {
			navigate(`/cabinet/institution/${currentInstitutionId}/info`, {
				replace: true,
			});
			if (institutions) {
				const currentInstitution = institutions.find((e) => e.id === currentInstitutionId);
				if (currentInstitution) {
					setInstitution(currentInstitution);
				}
			}
		}
	}, [currentInstitutionId]);

	return (
		<>
			<HeaderTabs headerTitle="Про медзаклад" headerImgUrl="/img/cabinet/arrow-left.svg" />
			<Container>
				<form className="" onSubmit={handleSubmit(onSubmitInstitution)}>
					<FormInstitution control={control} />
					<CustomButton
						type={'submit'}
						text="Зберегти"
						className=" my-8 min-w-[265px] px-10 h-[44px] bg-[var(--color5)] rounded-[var(--default-round)] font-medium text-[16px] text-white hover:opacity-90 "
						classNameContainer="mx-auto fixed bottom-0 left-0 h-[76px] bg-[var(--white)] desktop:relative desktop:bg-[var(--bg-color)] desktop:mt-10 desktop:mb-20"
					/>
				</form>
			</Container>
		</>
	);
}
