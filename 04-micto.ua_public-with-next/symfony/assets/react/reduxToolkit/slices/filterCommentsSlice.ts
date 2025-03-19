import {
	CommentOrderField,
	CommentOrderInput,
	EntityType,
	getMyInstitutionUnitResponse,
	InstitutionUnit,
	TypeOfComment,
	UnitDepartment,
} from '@/Types/cabinetTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { el } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

interface FilterState {
	entityType: EntityType;
	entityId: number | null;
	filter: {
		typeOfComment: TypeOfComment[];
		date: DateRange | undefined;
		withChildrenUnits: true;
		unitDepartments?: number[];
	};
	order: CommentOrderInput;
	listItems: {
		units: {
			loading: boolean;
			items: InstitutionUnit[];
		};
		departments: {
			loading: boolean;
			items: UnitDepartment[];
		};
	};
}

const initialState: FilterState = {
	entityType: EntityType.INSTITUTION,
	entityId: null,
	filter: {
		typeOfComment: [],
		date: { from: undefined, to: undefined },
		withChildrenUnits: true,
		unitDepartments: [],
	},
	order: { field: CommentOrderField.DATE, direction: undefined },
	listItems: {
		units: {
			loading: true,
			items: [],
		},
		departments: {
			loading: true,
			items: [],
		},
	},
};

export const fetchInstitutionUnitsFilter = createAsyncThunk(
	'filterComments/fetchInstitutionUnitsFilter',
	async ({ institutionId: institutionsId }: { institutionId: number }) => {
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
						departments(pagination: {limit: 1000}) {
							pageInfo {
								page
								totalPages
								totalItems
								limit
							}
							items {
								name
								id
							}
						}
						address	{
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

let debounceTimer;

const filterCommentsSlice = createSlice({
	name: 'filterComments',
	initialState,
	reducers: {
		toggleTypeOfComment: (state, action: PayloadAction<string>) => {
			const index = state.filter.typeOfComment.indexOf(TypeOfComment[action.payload]);
			if (index !== -1) {
				state.filter.typeOfComment.splice(index, 1);
			} else {
				state.filter.typeOfComment.push(TypeOfComment[action.payload]);
			}
		},
		setDate: (state, action: PayloadAction<DateRange | undefined>) => {
			state.filter.date = action.payload;
		},
		setOrder: (state, action: PayloadAction<CommentOrderInput | undefined>) => {
			state.order = action.payload;
		},
		setEntityType: (state, action: PayloadAction<EntityType>) => {
			state.entityType = action.payload;
		},
		setSelectedDepartments: (state, action: PayloadAction<number[]>) => {
			state.filter.unitDepartments = action.payload;
		},
		setEntityId: (state, action: PayloadAction<number>) => {
			state.entityId = action.payload;

			if (
				state.entityType == EntityType.INSTITUTION_UNIT &&
				state.listItems.units.items.find((el) => el.id === action.payload)
			) {
				state.listItems.departments.items = state.listItems.units.items.find(
					(el) => el.id === action.payload
				).departments.items;
				state.listItems.departments.loading = false;
			}
		},
		setDepartmentsItems: (state, action: PayloadAction<UnitDepartment[]>) => {
			state.listItems.departments.items = action.payload;
			state.listItems.departments.loading = false;
		},
		resetFilters: (state, action: PayloadAction<number>) => {
			state.filter.typeOfComment = [];
			state.filter.date = { from: undefined, to: undefined };
			state.entityType = EntityType.INSTITUTION;
			state.entityId = action.payload;
			state.listItems.departments.items = [];
			if (state.filter.unitDepartments) {
				state.filter.unitDepartments = [];
			}
		},
		resetOrder: (state) => {
			state.order = { field: CommentOrderField.DATE, direction: undefined };
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchInstitutionUnitsFilter.pending, (state) => {
				clearTimeout(debounceTimer);
				state.listItems.departments.items = [];
				state.listItems.units.loading = true;

				debounceTimer = setTimeout(() => {}, 300);
			})
			.addCase(
				fetchInstitutionUnitsFilter.fulfilled,
				(state, action: PayloadAction<getMyInstitutionUnitResponse>) => {
					clearTimeout(debounceTimer);
					state.listItems.units.loading = false;
					state.listItems.units.items = action.payload.data.myInstitutionUnits;
				}
			)
			.addCase(fetchInstitutionUnitsFilter.rejected, (state) => {
				clearTimeout(debounceTimer);
				state.listItems.units.loading = false;
				state.listItems.units.items = [];
			});
	},
});

export const {
	toggleTypeOfComment,
	setDate,
	setOrder,
	resetFilters,
	resetOrder,
	setEntityType,
	setEntityId,
	setDepartmentsItems,
	setSelectedDepartments,
} = filterCommentsSlice.actions;

export default filterCommentsSlice.reducer;
