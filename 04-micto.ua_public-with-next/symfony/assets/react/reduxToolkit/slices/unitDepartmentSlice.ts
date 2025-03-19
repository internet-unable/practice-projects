import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	DayOfWeek,
	InstitutionUnit,
	InstitutionUnitInput,
	ResponseError,
	UnitDepartment,
	UnitDepartmentData,
	UnitDepartmentInput,
	createInstitutionUnitResponse,
	createUnitDepartmentResponse,
	editInstitutionUnitResponse,
	editUnitDepartmentResponse,
	getInstitutionUnitResponse,
	getUnitDepartmentResponse,
} from '../../Types/cabinetTypes';
import { toast } from 'react-toastify';

type initialStateType = {
	loading: boolean;
	department: UnitDepartment;
	errors: ResponseError[];
	message?: string;
};

const initialState: initialStateType = {
	loading: true,
	department: {
		id: 0,
		name: '',
		description: '',
		schedule: [
			{
				id: 0,
				dayOfWeek: DayOfWeek.MON,
				isHoliday: false,
				startTime: '00:00',
				endTime: '00:00',
			},
			{
				id: 1,
				dayOfWeek: DayOfWeek.TUE,
				isHoliday: false,
				startTime: '00:00',
				endTime: '00:00',
			},
			{
				id: 2,
				dayOfWeek: DayOfWeek.WED,
				isHoliday: false,
				startTime: '00:00',
				endTime: '00:00',
			},
			{
				id: 3,
				dayOfWeek: DayOfWeek.THU,
				isHoliday: false,
				startTime: '00:00',
				endTime: '00:00',
			},
			{
				id: 4,
				dayOfWeek: DayOfWeek.FRI,
				isHoliday: false,
				startTime: '00:00',
				endTime: '00:00',
			},
			{
				id: 5,
				dayOfWeek: DayOfWeek.SAT,
				isHoliday: false,
				startTime: '00:00',
				endTime: '00:00',
			},
			{
				id: 6,
				dayOfWeek: DayOfWeek.SUN,
				isHoliday: false,
				startTime: '00:00',
				endTime: '00:00',
			},
		],
		// address: {
		//   address: "",
		//   zipCode: "",
		//   cityId: 0,
		// },
		contacts: {
			emails: [
				{
					email: '',
					comment: '',
				},
			],
			phones: [
				{
					number: '',
					comment: '',
				},
			],
		},
	},
	errors: [],
};

export const fetchDepartmentById = createAsyncThunk(
	'unit/fetchDepartmentById',
	async (departmentId: number, { dispatch }) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `{
      unitDepartment(id: ${departmentId}) {
        id
        name
        slug
        description
        unit {
          id
          name
        }
        contacts {
          emails {
            email
            comment
          }
          phones {
            number
            comment
          }
        }
        schedule {
          dayOfWeek
          isHoliday
          startTime
          endTime
        }
      }
    }`,
			}),
		});
		const result = (await response.json()) as getUnitDepartmentResponse;

		return result;
	}
);

export const updateDepartment = createAsyncThunk(
	'unit/updateDepartment',
	async (
		{ id: departmentId, unit: UnitDepartment }: { id: number; unit: UnitDepartmentInput },
		{ dispatch }
	) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
        mutation editDepartment($id: Int!, $input: UnitDepartmentInput!) {
          editUnitDepartment(id: $id, input: $input) {
            name
            description
            schedule {
              dayOfWeek
              isHoliday
              startTime
              endTime
            }
            contacts {
              emails {
                email
                comment
              }
              phones {
                number
                comment
              }
            }
          }
        }`,
				variables: {
					id: departmentId,
					input: UnitDepartment,
				},
			}),
		});
		const result = (await response.json()) as editUnitDepartmentResponse;

		return result;
	}
);

export const createDepartment = createAsyncThunk(
	'unit/createDepartment',
	async (
		{ id: departmentId, unit: UnitDepartment }: { id: number; unit: UnitDepartmentInput },
		{ dispatch }
	) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
        mutation createDepartment($id: Int!, $input: UnitDepartmentInput!) {
          createUnitDepartment(institutionUnitId: $id, input: $input) {
            id
            name
            description
            schedule {
              dayOfWeek
              isHoliday
              startTime
              endTime
            }
            contacts {
              emails {
                email
                comment
              }
              phones {
                number
                comment
              }
            }
          }
        }`,
				variables: {
					id: departmentId,
					input: UnitDepartment,
				},
			}),
		});
		const result = (await response.json()) as createUnitDepartmentResponse;

		return result;
	}
);

let debounceTimer;

export const unitDepartmentSlice = createSlice({
	name: 'unitDepartment',
	initialState,
	reducers: {
		setUnitDepartment: (state, action: PayloadAction<UnitDepartment>) => {
			state.department = { ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDepartmentById.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loading = true;
				}, 300);
			})
			.addCase(
				fetchDepartmentById.fulfilled,
				(state, action: PayloadAction<getUnitDepartmentResponse>) => {
					clearTimeout(debounceTimer);
					state.department = { ...action.payload.data.unitDepartment };
					state.loading = false;
					state.errors = [];
				}
			)
			.addCase(
				fetchDepartmentById.rejected,
				(state, action: PayloadAction<getUnitDepartmentResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload.errors) {
						state.errors = action.payload.errors;
					}
				}
			)
			.addCase(updateDepartment.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loading = true;
				}, 300);
			})
			.addCase(
				updateDepartment.fulfilled,
				(state, action: PayloadAction<editUnitDepartmentResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload?.errors) {
						state.errors = [...action.payload.errors];
					} else {
						state.errors = [];
						toast.success('Дані оновленно');
					}
					if (action.payload.data?.editUnitDepartment) {
						state.department = { ...action.payload.data.editUnitDepartment };
					}
				}
			)
			.addCase(
				updateDepartment.rejected,
				(state, action: PayloadAction<editUnitDepartmentResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload?.errors) {
						state.errors = [...action.payload.errors];
					}
				}
			)
			.addCase(createDepartment.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loading = true;
				}, 300);
			})
			.addCase(
				createDepartment.fulfilled,
				(state, action: PayloadAction<createUnitDepartmentResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload?.errors) {
						state.errors = [...action.payload.errors];
					} else {
						state.errors = [];
						toast.success('Відділення створено');
					}
					if (action.payload.data?.createUnitDepartment) {
						state.department = { ...action.payload.data.createUnitDepartment };
					}
				}
			)
			.addCase(
				createDepartment.rejected,
				(state, action: PayloadAction<createUnitDepartmentResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload?.errors) {
						state.errors = [...action.payload.errors];
					}
				}
			);
	},
});

// Action creators are generated for each case reducer function
export const { setUnitDepartment } = unitDepartmentSlice.actions;

export default unitDepartmentSlice.reducer;
