'use server';

import {
	GetDistrictsAndCitiesByAreaIdQuery,
	LoginMutation,
	RegisterInstitutionCompleteMutation,
	RegisterInstitutionStep1Mutation,
	RegisterInstitutionStep2Mutation,
	RegisterInstitutionStep3Mutation,
	RegisterUserMutation,
	ResetPasswordMutation,
} from '@/graphql/generated/types';
import {
	COMPLETE_INSTITUTION_REGISTRATION,
	LOGIN,
	REGISTER_INSTITUTION_STEP_ONE,
	REGISTER_INSTITUTION_STEP_THREE,
	REGISTER_INSTITUTION_STEP_TWO,
	REGISTER_USER,
	RESET_PASSWORD,
} from '@/graphql/mutations';
import { GET_DISTRICTS_AND_CITIES_BY_AREA_ID } from '@/graphql/query';
import client from '@/lib/apolloClient';
import {
	FirstStepSchema,
	SecondStepSchema,
	ThirdStepSchema,
} from '@/schemas/RegisterInstitutionSchemas';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const Login = async (email: string, password: string) => {
	const cookieStore = await cookies();
	const { data } = await client
		.mutate<LoginMutation>({
			mutation: LOGIN,
			variables: { username: email, password: password },
		})
		.catch((error) => {
			console.error(error);
			throw new Error("Недійсне ім'я користувача або пароль");
		});
	if (data?.login?.accessToken) {
		cookieStore.set('accessToken', data.login.accessToken, {
			expires: new Date(Date.now() + 1000 * 60 * 60),
		});
		cookieStore.set('refreshToken', data.login.refreshToken, {
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
		});
		redirect('/');
	} else {
		throw new Error("Недійсне ім'я користувача або пароль");
	}
};

export const reCaptchaCheck = async (token: string | null) => {
	if (!token) return false;
	const secretKey: string | undefined = process.env.RECAPTCHA_SECRET_KEY;
	try {
		const response = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			}
		);
		if (response.ok) {
			return true;
		}
	} catch (error) {
		return false;
	}
};

export const resetPassword = async (email: string) => {
	const { data } = await client
		.mutate<ResetPasswordMutation>({
			mutation: RESET_PASSWORD,
			variables: { email },
		})
		.catch((error) => {
			console.error(error);
			throw new Error(error);
		});
	if (data?.resetPassword) {
		return true;
	} else {
		throw new Error('Не знайдено жодного користувача з цією електронною адресою');
	}
};

export const changePassword = async (code: string, password: string, confirmPassword: string) => {
	const { data } = await client
		.mutate<ResetPasswordMutation>({
			mutation: RESET_PASSWORD,
			variables: { code, password, confirmPassword },
		})
		.catch((error) => {
			console.error(error.message);
			throw new Error(error);
		});
	if (data?.resetPassword) {
		return true;
	} else {
		return false;
	}
};

export const registerUser = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	confirmPassword: string
) => {
	const { data } = await client
		.mutate<RegisterUserMutation>({
			mutation: REGISTER_USER,
			variables: { firstName, lastName, email, password, confirmPassword },
		})
		.catch((error) => {
			console.error(error);
			throw new Error(error);
		});
	if (data?.registerUser.accessToken && data?.registerUser.refreshToken) {
		setAccessAndRefreshToken(data.registerUser.accessToken, data.registerUser.refreshToken);
		return true;
	} else {
		return false;
	}
};

export const setAccessAndRefreshToken = async (accessToken: string, refreshToken: string) => {
	const cookieStore = await cookies();
	cookieStore.set('accessToken', accessToken, {
		expires: new Date(Date.now() + 1000 * 60 * 60),
	});
	cookieStore.set('refreshToken', refreshToken, {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
	});
};

export const registerInstitutionStep1 = async (formData: FirstStepSchema) => {
	const cookieStore = await cookies();
	const { data } = await client
		.mutate<RegisterInstitutionStep1Mutation>({
			mutation: REGISTER_INSTITUTION_STEP_ONE,
			variables: {
				input: {
					fullName: formData.name,
					ownershipForm: formData.type,
					edrpou: formData.edrpou,
					about: formData.description,
				},
			},
		})
		.catch((error) => {
			console.error(error.networkError?.result || error);
			throw new Error(error.networkError?.result || error);
		});
	if (data?.registerInstitutionStep1.token) {
		cookieStore.set('registerToken', data.registerInstitutionStep1.token);
		return true;
	}
};
export const registerInstitutionStep2 = async (input: SecondStepSchema) => {
	const cookieStore = await cookies();
	const token = cookieStore.get('registerToken')?.value;

	return await client
		.mutate<RegisterInstitutionStep2Mutation>({
			mutation: REGISTER_INSTITUTION_STEP_TWO,
			variables: { input, token },
		})
		.catch((error) => {
			const errors = (error.networkError?.result.errors as GraphQLError[]) || [];
			return {
				errors: {
					phone: errors.find((e) => e.extensions?.field === 'phone')
						? {
								type: 'server',
								message: errors.find((e) => e.extensions?.field === 'phone')
									?.message,
						  }
						: undefined,
					email: errors.find((e) => e.extensions?.field === 'email')
						? {
								type: 'server',
								message: errors.find((e) => e.extensions?.field === 'email')
									?.message,
						  }
						: undefined,
				},
			};
		});
};

export const registerInstitutionStep3 = async (formData: ThirdStepSchema) => {
	const cookieStore = await cookies();
	const token = cookieStore.get('registerToken')?.value;
	const { data } = await client
		.mutate<RegisterInstitutionStep3Mutation>({
			mutation: REGISTER_INSTITUTION_STEP_THREE,
			variables: {
				input: {
					password: formData.password,
					confirmPassword: formData.confirmPassword,
					agreeTerms: formData.agreeTerms,
				},
				token,
			},
		})
		.catch((error) => {
			console.error('GraphQL Error:', error.networkError?.result.errors || error);
			throw new Error(error.networkError?.result || error);
		});
	if (data?.registerInstitutionStep3.token) {
		const { data } = await client
			.mutate<RegisterInstitutionCompleteMutation>({
				mutation: COMPLETE_INSTITUTION_REGISTRATION,
				variables: { token },
			})
			.catch((error) => {
				console.error('GraphQL Error:', error.networkError?.result.errors || error);
				throw new Error(error.networkError?.result.errors || error);
			});
		if (
			data?.registerInstitutionComplete.accessToken &&
			data?.registerInstitutionComplete.refreshToken
		) {
			setAccessAndRefreshToken(
				data.registerInstitutionComplete.accessToken,
				data.registerInstitutionComplete.refreshToken
			);
		}
		return true;
	}
};

export const getDistrictsAndCitiesByAreaId = async (areaId: number) => {
	const { data } = await client.query<GetDistrictsAndCitiesByAreaIdQuery>({
		query: GET_DISTRICTS_AND_CITIES_BY_AREA_ID,
		variables: { areaId },
	});
	const districts = data.area?.districts.items;
	const cities = districts?.flatMap((district) => district.cities.items);
	return { districts, cities };
};
