import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	Area,
	City,
	DayOfWeek,
	District,
	InstitutionUnit,
	InstitutionUnitInput,
	ResponseError,
	createInstitutionUnitResponse,
	editInstitutionUnitResponse,
	getInstitutionUnitResponse,
} from '../../Types/cabinetTypes';
import { toast } from 'react-toastify';

type initialStateType = {
	loading: boolean;
	unit: InstitutionUnit;
	errors: ResponseError[];
	message?: string;
};

export const defaultInstitutionUnitState = {
	id: null,
	name: '',
	slug: '',
	description: '',
	edrpou: '',
	fullName: '',
	departments: {
		pageInfo: {
			page: 0,
			limit: 0,
			totalItems: 0,
			totalPages: 0,
		},
		items: [],
	},
	schedule: [
		{
			dayOfWeek: DayOfWeek.MON,
			isHoliday: false,
			startTime: '00:00',
			endTime: '00:00',
		},
		{
			dayOfWeek: DayOfWeek.TUE,
			isHoliday: false,
			startTime: '00:00',
			endTime: '00:00',
		},
		{
			dayOfWeek: DayOfWeek.WED,
			isHoliday: false,
			startTime: '00:00',
			endTime: '00:00',
		},
		{
			dayOfWeek: DayOfWeek.THU,
			isHoliday: false,
			startTime: '00:00',
			endTime: '00:00',
		},
		{
			dayOfWeek: DayOfWeek.FRI,
			isHoliday: false,
			startTime: '00:00',
			endTime: '00:00',
		},
		{
			dayOfWeek: DayOfWeek.SAT,
			isHoliday: false,
			startTime: '00:00',
			endTime: '00:00',
		},
		{
			dayOfWeek: DayOfWeek.SUN,
			isHoliday: false,
			startTime: '00:00',
			endTime: '00:00',
		},
	],
	address: {
		address: '',
		zipCode: '',
		cityId: 0,
	},
	city: {
		id: 0,
		district: {
			id: 0,
			name: '',
		},
		otg: {
			id: 0,
			name: '',
		},
		katottg: '',
		area: {
			id: 0,
			name: '',
		},
	},
	contacts: {
		email: '',
		phones: [
			{
				number: '',
				comment: '',
			},
		],
	},
};

const initialState: initialStateType = {
	loading: true,
	unit: defaultInstitutionUnitState,
	errors: [],
};

export const fetchUnitById = createAsyncThunk(
	'unit/fetchUnitById',
	async (unitId: number, { dispatch }) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `{
      institutionUnit(id: ${unitId}) {
        id
        name
        fullName
        slug
        description
        edrpou
        departments {
          pageInfo {
            page
            totalPages
            totalItems
            limit
          }
          items {
            name
            id
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
            fullName
            number
            slug
            description
            unit {
              name
              id
            }
          }
        }
        type {
          id
          name
        }
        address {
          address
          zipCode
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
        institution {
          id
          name
          fullName
        }
        schedule {
          dayOfWeek
          isHoliday
          startTime
          endTime
        }
        city {
          name
          id
          areaCenter
          area {
            name
            id
          }
          district {
            name
            id
          }
          otg {
            name
            id
          }
          cityDistricts {
						items {
							id
            	name
						}
            
          }
        }
      }
    }`,
			}),
		});
		const result = (await response.json()) as getInstitutionUnitResponse;

		return result;
	}
);

export const updateUnit = createAsyncThunk(
	'unit/updateInstitutionUnit',
	async (
		{ id: unitId, unit: InstitutionUnit }: { id: number; unit: InstitutionUnitInput },
		{ dispatch }
	) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
        mutation editUnit($id: Int!, $input: InstitutionUnitInput!) {
          editInstitutionUnit(id: $id, input: $input) {
            name
            fullName
            description
            edrpou
            schedule {
              dayOfWeek
              isHoliday
              startTime
              endTime
            }
            address {
              address
              zipCode
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
            departments {
              pageInfo {
                page
                totalPages
                totalItems
                limit
              }
              items {
                name
                id
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
                fullName
                number
                slug
                description
                unit {
                  name
                  id
                }
              }
            }
          }
        }`,
				variables: {
					id: unitId,
					input: InstitutionUnit,
				},
			}),
		});
		const result = (await response.json()) as editInstitutionUnitResponse;

		return result;
	}
);

export const createUnit = createAsyncThunk(
	'unit/createInstitutionUnit',
	async (
		{ id: institutionId, unit: InstitutionUnit }: { id: number; unit: InstitutionUnitInput },
		{ dispatch }
	) => {
		const response = await fetch(`/graphql`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: `
        mutation createUnit($id: Int!, $input: InstitutionUnitInput!) {
          createInstitutionUnit(institutionId: $id, input: $input) {
            id
            name
            fullName
            description
            edrpou
            schedule {
              dayOfWeek
              isHoliday
              startTime
              endTime
            }
            address {
              address
              zipCode
            }
            city {
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
            departments {
              pageInfo {
                page
                totalPages
                totalItems
                limit
              }
              items {
                name
                id
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
                fullName
                number
                slug
                description
                unit {
                  name
                  id
                }
              }
            }
          }
        }`,
				variables: {
					id: institutionId,
					input: InstitutionUnit,
				},
			}),
		});
		const result = (await response.json()) as createInstitutionUnitResponse;

		return result;
	}
);

let debounceTimer;

export const institutionUnitSlice = createSlice({
	name: 'institutionUnit',
	initialState,
	reducers: {
		setIntitutionUnit: (state, action: PayloadAction<InstitutionUnit>) => {
			state.unit = { ...action.payload };
		},
		setIntitutionUnitArea: (state, action: PayloadAction<Area>) => {
			state.unit.city.area = { ...action.payload };
			state.unit.city.name = '';
			state.unit.city.id = 0;
			state.unit.city.district.id = 0;
			state.unit.city.district.name = '';
		},
		setIntitutionUnitDistrict: (state, action: PayloadAction<District>) => {
			state.unit.city.district = { ...action.payload };
			state.unit.city.name = '';
			state.unit.city.id = 0;
		},
		setIntitutionUnitCity: (state, action: PayloadAction<City>) => {
			state.unit.city = { ...state, ...action.payload };
		},
		setIntitutionUnitErrors: (state, action: PayloadAction<getInstitutionUnitResponse>) => {
			state.errors = action.payload.errors;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUnitById.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loading = true;
				}, 300);
			})
			.addCase(
				fetchUnitById.fulfilled,
				(state, action: PayloadAction<getInstitutionUnitResponse>) => {
					clearTimeout(debounceTimer);
					state.unit = { ...action.payload.data.institutionUnit };
					state.loading = false;
					state.errors = [];
				}
			)
			.addCase(
				fetchUnitById.rejected,
				(state, action: PayloadAction<getInstitutionUnitResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload.errors) {
						state.errors = action.payload.errors;
					}
				}
			)
			.addCase(updateUnit.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loading = true;
				}, 300);
			})
			.addCase(
				updateUnit.fulfilled,
				(state, action: PayloadAction<editInstitutionUnitResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload?.errors) {
						state.errors = [...action.payload.errors];
					} else {
						state.errors = [];
						toast.success('Дані оновленно');
					}
					if (action.payload.data?.editInstitutionUnit) {
						state.unit = { ...action.payload.data.editInstitutionUnit };
					}
				}
			)
			.addCase(
				updateUnit.rejected,
				(state, action: PayloadAction<editInstitutionUnitResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload?.errors) {
						state.errors = [...action.payload.errors];
					}
				}
			)
			.addCase(createUnit.pending, (state) => {
				clearTimeout(debounceTimer);

				debounceTimer = setTimeout(() => {
					state.loading = true;
				}, 300);
			})
			.addCase(
				createUnit.fulfilled,
				(state, action: PayloadAction<createInstitutionUnitResponse>) => {
					clearTimeout(debounceTimer);
					state.loading = false;
					if (action.payload?.errors) {
						state.errors = [...action.payload.errors];
					} else {
						state.errors = [];
						toast.success('Підрозділ створено');
					}
					if (action.payload.data?.createInstitutionUnit) {
						state.unit = { ...action.payload.data.createInstitutionUnit };
					}
				}
			)
			.addCase(
				createUnit.rejected,
				(state, action: PayloadAction<createInstitutionUnitResponse>) => {
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
export const {
	setIntitutionUnit,
	setIntitutionUnitErrors,
	setIntitutionUnitArea,
	setIntitutionUnitDistrict,
	setIntitutionUnitCity,
} = institutionUnitSlice.actions;

export default institutionUnitSlice.reducer;
