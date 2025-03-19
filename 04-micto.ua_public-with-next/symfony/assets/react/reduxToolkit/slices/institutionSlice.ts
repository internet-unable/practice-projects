import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getInstitutionResponse,
	getMyInstitutionUnitResponse,
	Institution,
	InstitutionInput,
	InstitutionUnit,
	ResponseError,
} from '../../Types/cabinetTypes';

type initialStateType = {
	loading: boolean;
	loadingInstitutionUnit: boolean;
	institutions: Institution[];
	currentInstitutionId: number | null;
	institutionsUnits: InstitutionUnit[];
	errors: ResponseError[];
};

const initialState: initialStateType = {
	errors: [],
	institutions: [],
	currentInstitutionId: null,
	loading: true,
	loadingInstitutionUnit: true,
	institutionsUnits: [],
};

export const fetchMyInstitutions = createAsyncThunk(
	'unit/fetchMyInstitutions',
	async (_, { dispatch }) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `{
        myInstitutions {
          name
          id
          canEdit
          fullName
          description
        }
      }`,
			}),
		});
		const result = (await response.json()) as getInstitutionResponse;

		return result;
	}
);

export const fetchMyInstitutionUnits = createAsyncThunk(
	'unit/fetchMyInstitutionUnits',
	async (
		{
			institutionId: institutionsId,
		}: {
			institutionId: number;
		},
		{ dispatch }
	) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `query InstitutionsUnit($institutionId: Int){
        myInstitutionUnits (institutionId: $institutionId) {
          name
          id
          canEdit
          fullName
          description
          address{
            address
          }
        }
      }`,
				variables: {
					institutionId: institutionsId,
				},
			}),
		});
		const result = (await response.json()) as getMyInstitutionUnitResponse;

		return result;
	}
);

export const updateInstitutions = createAsyncThunk(
	'unit/updateInstitutions',
	async (
		{
			id: institutionsId,
			institution: myInstitution,
		}: {
			id: number;
			institution: InstitutionInput;
		},
		{ dispatch }
	) => {
		try {
			const response = await fetch('/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					query: `
            mutation editInstitutions($id: Int!, $input: InstitutionInput!) {
                editInstitution(id: $id, input: $input) {
                    id
                    name
                    fullName
                    slug
                    description
                    canEdit
                    ownershipForm {
                        name
                        title
                    }
                }
            }`,
					variables: {
						id: institutionsId,
						input: myInstitution,
					},
				}),
			});

			if (!response.ok) {
				console.error('Error with the request:', await response.text());
				throw new Error('Failed to fetch');
			}

			const result = await response.json();

			return result;
		} catch (e) {
			console.log(e, 'Something went wrong when changing medical institutions');
		}
	}
);

let debounceTimer;

export const institutionSlice = createSlice({
	name: 'institution',
	initialState,
	reducers: {
		setIntitutions: (state, action: PayloadAction<Institution[]>) => {
			state.institutions = { ...action.payload };
		},
		setCurrentInstitutionId: (state, action: PayloadAction<number>) => {
			state.currentInstitutionId = action.payload;
		},
		setInstitutionLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMyInstitutions.rejected, (state) => {
				clearTimeout(debounceTimer);
				state.loading = false;
				// add errors from response
			})
			.addCase(fetchMyInstitutions.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loading = true;
				}, 300);
			})
			.addCase(
				fetchMyInstitutions.fulfilled,
				(state, action: PayloadAction<getInstitutionResponse>) => {
					clearTimeout(debounceTimer);
					state.institutions = action.payload.data.myInstitutions;
					if (!state.currentInstitutionId) {
						state.currentInstitutionId = action.payload.data.myInstitutions[0].id;
					}
					state.loading = false;
				}
			)
			.addCase(fetchMyInstitutionUnits.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loadingInstitutionUnit = true;
				}, 300);
			})
			.addCase(
				fetchMyInstitutionUnits.fulfilled,
				(state, action: PayloadAction<getMyInstitutionUnitResponse>) => {
					clearTimeout(debounceTimer);
					state.institutionsUnits = action.payload.data.myInstitutionUnits;
					state.loadingInstitutionUnit = false;
				}
			);
	},
});

// Action creators are generated for each case reducer function
export const { setIntitutions, setCurrentInstitutionId, setInstitutionLoading } =
	institutionSlice.actions;

export default institutionSlice.reducer;
