import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Area, City, PageInfoType, ResponseError } from "@/Types/cabinetTypes";

type Areas = {
  page: PageInfoType;
  items: Area[];
};

type Cities = {
  page: PageInfoType;
  items: City[];
};

type getAreas = {
  data?: {
    areas: Areas;
  };
  errors?: ResponseError[];
};

type getDistricts = {
  data?: {
    districts: Areas;
  };
  errors?: ResponseError[];
};

type getCities = {
  data?: {
    cities: Cities;
  };
  errors?: ResponseError[];
};

type initialStateType = {
  loading: boolean;
  areas: Areas;
  districts: Areas;
  cities: Cities;
};

const initialState: initialStateType = {
  loading: false,
  areas: {
    page: {
      page: 0,
      limit: 0,
      totalPages: 0,
      totalItems: 0,
    },
    items: [],
  },
  districts: {
    page: {
      page: 0,
      limit: 0,
      totalPages: 0,
      totalItems: 0,
    },
    items: [],
  },
  cities: {
    page: {
      page: 0,
      limit: 0,
      totalPages: 0,
      totalItems: 0,
    },
    items: [],
  },
};

export const fetchAreas = createAsyncThunk(
  "unit/fetchAreas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                query GetAreas($searchString: String, $pagination: PaginationInput = { page: 1, limit: 100 }) {
                  areas(searchString: $searchString, pagination: $pagination) {
                    pageInfo {
                      page
                      limit
                      totalPages
                      totalItems
                    }
                    items {
                      id
                      name
                    }
                  }
                }`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = (await response.json()) as getAreas;

      return result.data.areas;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue([
        {
          message: error instanceof Error ? error.message : "Unknown error",
          extensions: { category: "network", field: "" },
        },
      ]);
    }
  },
);

export const fetchDistricts = createAsyncThunk(
  "unit/fetchDistricts",
  async ({ areaId }: { areaId: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              query GetDistricts($areaId: Int!, $searchString: String = "", $pagination: PaginationInput = { page: 1, limit: 100 }) {
                districts(areaId: $areaId, searchString: $searchString, pagination: $pagination) {
                  pageInfo {
                    page
                    limit
                    totalPages
                    totalItems
                  }
                  items {
                    id
                    name
                  }
                }
              }`,
          variables: {
            areaId: areaId,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = (await response.json()) as getDistricts;

      return result.data.districts;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue([
        {
          message: error instanceof Error ? error.message : "Unknown error",
          extensions: { category: "network", field: "" },
        },
      ]);
    }
  },
);

export const fetchCities = createAsyncThunk(
  "unit/fetchCities",
  async ({ districtId }: { districtId: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
              query GetCities($districtId: Int!, $searchString: String = "", $pagination: PaginationInput = { page: 1, limit: 100 }) {
                cities(districtId: $districtId, searchString: $searchString, pagination: $pagination) {
                  pageInfo {
                    page
                    limit
                    totalPages
                    totalItems
                  }
                  items {
                    id
                    name
                  }
                }
              }`,
          variables: {
            districtId: districtId,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = (await response.json()) as getCities;

      return result.data.cities;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue([
        {
          message: error instanceof Error ? error.message : "Unknown error",
          extensions: { category: "network", field: "" },
        },
      ]);
    }
  },
);

export const selectsSlice = createSlice({
  name: "selects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAreas.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAreas.fulfilled, (state, action: PayloadAction<Areas>) => {
        state.areas = action.payload;
        state.loading = false;
      })
      .addCase(fetchDistricts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDistricts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        fetchDistricts.fulfilled,
        (state, action: PayloadAction<Areas>) => {
          state.districts = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        fetchCities.fulfilled,
        (state, action: PayloadAction<Cities>) => {
          state.cities = action.payload;
          state.loading = false;
        },
      );
  },
});

// Action creators are generated for each case reducer function

export default selectsSlice.reducer;
