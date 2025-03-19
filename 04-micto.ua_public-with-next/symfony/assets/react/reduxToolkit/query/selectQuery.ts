import { GroupBase, OptionsOrGroups } from "react-select";
import { SelectItem } from "../../Types/cabinetTypes";

export const getCityQuery = (
  id: number,
  searchString: string = "",
  page: number = 1,
  limit: number = 30,
): string => {
  return `
  {
      cities(districtId: ${id}, searchString: "${searchString}", pagination: {
      limit: ${limit},
      page: ${page}
    }) {
        items {
          id
          name
          otg {
            name
          }
        }
        pageInfo {
          page
          limit
          totalPages
        }
      }
    }`;
};

export const getAreaQuery = (): string => {
  return `
    {
      areas(searchString:"", pagination: { limit:100 }) {
          items {
            id
            name
          }
          pageInfo {
            page
            limit
          }
      }
    }`;
};

export const getDistrictsQuery = (id: number): string => {
  return `
  {
    districts(areaId: ${id}, pagination: { limit:100 }){
      items {
        id
        name
      }
      pageInfo {
        page
        limit
      }
    }
  }`;
};

export async function fetchGraphQL(
  query: string,
  variables = {},
): Promise<any> {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // if needed
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });

  const data = await response.json();
  return data.data;
}
