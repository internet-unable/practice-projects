import { gql } from '@apollo/client';

export const GET_AREA_BY_ID = gql`
	query GetAreaById($id: Int) {
		area(oldId: $id) {
			id
			shortName
			fullName
			slug
			numberOfInstitutionUnits
			districts(onlyWithInstitutionUnits: true, pagination: { limit: 1000 }) {
				items {
					shortName
					fullName
					slug
					oldId
					id
					cities(pagination: { limit: 1000 }, onlyWithInstitutionUnits: true) {
						items {
							areaCenter
							shortName
							fullName
							type
							oldId
							id
							slug
							cityDistricts(
								onlyWithInstitutionUnits: true
								pagination: { limit: 1000 }
							) {
								items {
									shortName
									fullName
									id
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const GET_INSTITUTION_UNITS = gql`
	query GetInstitutionUnits($cityIds: [Int], $cityDistrictIds: [Int]) {
		institutionUnits(
			filter: { cityIds: $cityIds, cityDistrictIds: $cityDistrictIds }
			pagination: { limit: 300 }
		) {
			items {
				id
				oldId
				name
				slug
				institution {
					ownershipForm {
						name
						title
					}
				}
			}
		}
	}
`;

export const GET_CITY_BY_ID = gql`
	query GetCityById($oldId: Int) {
		city(oldId: $oldId) {
			id
			shortName
			fullName
			slug
			numberOfInstitutionUnits
			cityDistricts(pagination: { limit: 100 }, onlyWithInstitutionUnits: true) {
				items {
					id
					fullName
					shortName
					slug
					oldId
				}
			}
		}
	}
`;

export const GET_INSTITUTION_BY_ID = gql`
	query getInstitutionById($id: Int!) {
		institution(id: $id) {
			name
			id
			fullName
			description
			hasSeveralUnits
			rating
			ownershipForm {
				name
				title
			}
			images {
				url
				id
				size
				mimeType
			}
		}
	}
`;

export const GET_INSTITUTION_UNIT_BY_ID = gql`
	query getInstitutionUnitById($id: Int! = 157049) {
		institutionUnit(id: $id) {
			name
			fullName
			description
			id
			description
			legalForm {
				name
				title
			}
			cityDistrict {
				shortName
				fullName
				oldId
				id
				name
				slug
			}
			address {
				address
				zipCode
				lat
				lon
			}
			city {
				name
				fullName
				id
				slug
				district {
					fullName
					name
					slug
					oldId
				}
				area {
					name
					slug
					oldId
				}
			}
			type {
				name
				slug
			}
			institution {
				ownershipForm {
					name
					title
				}
			}
			departments {
				pageInfo {
					totalPages
				}
				items {
					id
					oldId
					name
					slug
					unit {
						slug
						oldId
					}
					schedule {
						dayOfWeek
						isHoliday
						isAroundTheClock
						startTime
						endTime
					}
				}
			}
			rating
			comments {
				id
				name
				email
				mark
				yearOfVisit
				monthOfVisit
				replies {
					items {
						id
						name
						email
						mark
						yearOfVisit
						monthOfVisit
					}
				}
			}
			contacts {
				emails {
					email
					comment
				}
				phones {
					number
					comment
					formattedNumber
				}
			}
			schedule {
				dayOfWeek
				startTime
				endTime
				isHoliday
				isAroundTheClock
			}
			images {
				url
				id
				size
				mimeType
			}
		}
	}
`;

export const GET_UNIT_DEPARTMENT_BY_OLDID = gql`
	query getUnitDepartmentById($oldId: Int!) {
		unitDepartment(oldId: $oldId) {
			name
			oldId
			id
			slug
			description
			rating
			unit {
				oldId
				id
				name
				slug
				institution {
					ownershipForm {
						name
						title
					}
				}
			}
			schedule {
				dayOfWeek
				startTime
				endTime
				isHoliday
				isAroundTheClock
			}
			contacts {
				emails {
					email
					comment
				}
				phones {
					number
					comment
					formattedNumber
				}
			}
			images {
				url
				id
				size
				mimeType
				displayOrder
			}
		}
	}
`;

export const GET_UNITS_BY_INSTITUTION_ID = gql`
	query getInstitutionUnitsByParentId($id: Int!) {
		institutionUnits(filter: { institutionId: $id }) {
			items {
				name
				id
				oldId
				slug
				contacts {
					emails {
						email
						comment
						__typename
					}
					phones {
						number
						comment
						formattedNumber
						__typename
					}
					__typename
				}
				address {
					address
					__typename
				}
				schedule {
					startTime
					endTime
					dayOfWeek
					isHoliday
					isAroundTheClock
					__typename
				}
				__typename
			}
			__typename
		}
	}
`;

export const GET_CITY_DISTRICT_BY_ID = gql`
	query GetCityDistrictById($oldId: Int, $id: Int) {
		cityDistrict(oldId: $oldId, id: $id) {
			shortName
			fullName
			numberOfInstitutionUnits
			id
			name
			slug
			oldId
			city {
				shortName
				fullName
				numberOfInstitutionUnits
				id
				name
				slug
				areaCenter
				katottg
				type
				oldId
				area {
					shortName
					fullName
					numberOfInstitutionUnits
					id
					name
					slug
					katottg
					oldId
					isPublished
				}
			}
		}
	}
`;

export const GET_DISTRICT_BY_ID = gql`
	query GetDistrictById($oldId: Int) {
		district(oldId: $oldId) {
			id
			shortName
			fullName
			slug
			numberOfInstitutionUnits
			cities(pagination: { limit: 1000 }, onlyWithInstitutionUnits: true) {
				items {
					shortName
					fullName
					type
					oldId
					id
					slug
				}
			}
		}
	}
`;

export const GET_CITIES = gql`
	query GetCities(
		$districtId: Int = null
		$searchString: String = null
		$onlyWithInstitutionUnits: Boolean = false
		$filter: CityFilterInput = null
		$pagination: PaginationInput = null
	) {
		cities(
			districtId: $districtId
			searchString: $searchString
			onlyWithInstitutionUnits: $onlyWithInstitutionUnits
			filter: $filter
			pagination: $pagination
		) {
			pageInfo {
				page
				limit
				totalPages
				totalItems
			}
			items {
				name
				shortName
				id
				oldId
				fullName
				slug
			}
		}
	}
`;

export const GET_ALL_INSITUTION_UNIT_TYPES = gql`
	query getAllInstitutionUnitTypes {
		institutionUnitTypes(pagination: { limit: 100 }, order: { field: NAME, direction: ASC }) {
			pageInfo {
				page
				limit
				totalPages
				totalItems
			}
			items {
				oldId
				name
				slug
			}
		}
	}
`;
export const GET_INSITUTION_UNIT_TYPES_BY_ID = gql`
	query getInstitutionUnitTypesById($cityId: Int) {
		institutionUnitTypes(pagination: { limit: 100 }, filter: { cityId: $cityId }) {
			items {
				oldId
				name
			}
		}
	}
`;

export const GET_DISTRICTS_AND_CITIES_BY_AREA_ID = gql`
	query getDistrictsAndCitiesByAreaId($areaId: Int) {
		area(oldId: $areaId) {
			districts(onlyWithInstitutionUnits: true, pagination: { limit: 1000 }) {
				items {
					shortName
					fullName
					slug
					oldId
					id
					cities(pagination: { limit: 1000 }, onlyWithInstitutionUnits: true) {
						items {
							shortName
							fullName
							type
							oldId
							id
						}
					}
				}
			}
		}
	}
`;

export const GET_AREAS = gql`
	query getAreas {
		areas(onlyWithInstitutionUnits: true, pagination: { limit: 100 }) {
			pageInfo {
				page
				limit
				totalPages
				totalItems
			}
			items {
				fullName
				shortName
				name
				slug
				oldId
				id
			}
		}
	}
`;

export const GET_AREAS_CENTERS = gql`
	query getAreasCenter {
		areaCenters(onlyWithInstitutionUnits: true, pagination: { limit: 100 }) {
			pageInfo {
				page
				limit
				totalPages
				totalItems
			}
			items {
				fullName
				shortName
				name
				slug
				oldId
				id
				area {
					isPublished
				}
			}
		}
	}
`;

export const GET_ENTITY_COMMENTS = gql`
	query getEntityComments($id: Int!, $entityType: EntityType!, $filter: CommentFilterInput) {
		entityComments(entityType: $entityType, entityId: $id, filter: $filter) {
			pageInfo {
				page
				totalPages
				totalItems
			}
			items {
				id
				name
				text
				dateCreated
				mark
				yearOfVisit
				monthOfVisit
				type
				numLikes
				numDislikes
				department {
					name
					slug
					oldId
					unit {
						slug
						oldId
						id
					}
				}
				replies(pagination: { limit: 100 }) {
					pageInfo {
						page
						totalPages
						totalItems
					}
					items {
						id
						name
						text
						numLikes
						numDislikes
						dateCreated
						type
						replyTo {
							name
							id
						}
					}
				}
			}
		}
	}
`;
