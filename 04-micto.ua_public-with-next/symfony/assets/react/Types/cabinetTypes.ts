// export type InstitutionEditForm = {
//   fullName: string;
//   shortName: string | null;
// };

export enum DayOfWeek {
	MON = 'MON',
	TUE = 'TUE',
	WED = 'WED',
	THU = 'THU',
	FRI = 'FRI',
	SAT = 'SAT',
	SUN = 'SUN',
}

export enum CommentType {
	QUESTION = 'QUESTION',
	REVIEW = 'REVIEW',
	REPLY = 'REPLY',
	COMPLAINT = 'COMPLAINT',
	GRATITUDE = 'GRATITUDE',
}

export enum CommentOrderField {
	DATE = 'DATE',
	ANSWERED = 'ANSWERED',
}

export enum OrderDirection {
	ASC = 'ASC',
	DESC = 'DESC',
}

export enum EntityType {
	INSTITUTION = 'INSTITUTION',
	INSTITUTION_UNIT = 'INSTITUTION_UNIT',
	UNIT_DEPARTMENT = 'UNIT_DEPARTMENT',
}

export enum TypeOfComment {
	REVIEW = 'REVIEW',
	QUESTION = 'QUESTION',
	COMPLAINT = 'COMPLAINT',
	GRATITUDE = 'GRATITUDE',
}

export interface Address {
	address: string;
	cityId: number | null;
	cityDistrict?: number;
	zipCode?: string;
	lat?: string;
	lon?: string;
}

export type UserInfo = {
	phone: {
		number: string;
	};
	email: string;
	firstName: string;
	lastName?: string;
	middleName?: string;
};

export type ContactsInput = {
	emails?: EmailInput[];
	phones?: PhoneInput[];
};

export type ContactsFullInput = {
	emails?: EmailInput[];
	phones?: PhoneInput[];
};

export type EmailInput = {
	email?: string;
	comment?: string;
};

export type PhoneInput = {
	number?: string;
	comment?: string;
};

export interface Roles {
	value: Role[];
}

export interface Role {
	value: 'ROLE_INSTITUTION_MANAGER' | 'ROLE_DOCTOR' | 'ROLE_USER';
}

export interface User {
	userName: string;
	roles: Role[] | [];
}

export interface getInstitutionResponse {
	data?: {
		myInstitutions: Institution[];
	};
	errors?: ResponseError[];
}

export interface getInstitutionResponseComment {
	data?: {
		comment: IComment;
	};
	errors?: ResponseError[];
}

export interface getInstitutionResponseComments {
	data?: {
		entityComments: EntityComments;
	};
	errors?: ResponseError[];
}

export interface getInstitutionUnitResponse {
	data?: {
		institutionUnit: InstitutionUnit;
	};
	errors?: ResponseError[];
}

export interface getDepartmentResponse {
	data?: {
		unitDepartment: UnitDepartment;
	};
	errors?: ResponseError[];
}

export interface getDepartmentResponse {
	data?: {
		unitDepartment: UnitDepartment;
	};
	errors?: ResponseError[];
}

export interface editInstitutionUnitResponse {
	data?: {
		editInstitutionUnit: InstitutionUnit;
		errors?: ResponseError[];
	};
	errors?: ResponseError[];
}

export interface getUnitDepartmentResponse {
	data?: {
		unitDepartment: UnitDepartment;
		errors?: ResponseError[];
	};
	errors?: ResponseError[];
}

export interface updatePasswordResponse {
	data?: {
		errors?: ResponseError[];
	};
	errors?: ResponseError[];
}

export interface editUnitDepartmentResponse {
	data?: {
		editUnitDepartment: UnitDepartment;
		errors?: ResponseError[];
	};
	errors?: ResponseError[];
}

export interface createUnitDepartmentResponse {
	data?: {
		createUnitDepartment: UnitDepartment;
		errors?: ResponseError[];
	};
	errors?: ResponseError[];
}

export interface getMyInstitutionUnitResponse {
	data?: {
		myInstitutionUnits: InstitutionUnit[];
	};
	errors?: ResponseError[];
}

export interface getUserInfo {
	data?: {
		me: UserInfo;
	};
	errors?: ResponseError[];
}

export interface editInstitutionUnitResponse {
	data?: {
		editInstitutionUnit: InstitutionUnit;
		errors?: ResponseError[];
	};
	errors?: ResponseError[];
}

export interface createInstitutionUnitResponse {
	data?: {
		createInstitutionUnit: InstitutionUnit;
		errors?: ResponseError[];
	};
	errors?: ResponseError[];
}

export interface ResponseError {
	extensions: {
		category: string;
		field: string;
	};
	message: string;
}

export interface InstitutionUnit {
	departments?: UnitDepartments;
	legalForm?: LegalForm;
	contacts?: ContactsInput;
	id: number | null;
	name?: string;
	fullName?: string;
	slug?: string;
	description?: string;
	edrpou?: string;
	isPublished?: boolean;
	institution?: Institution;
	type?: UnitType;
	city?: City;
	cityDistrict?: CityDistrict;
	comments?: IComment[];
	schedule?: ScheduleItem[];
	address?: Address;
}

export interface UnitDepartmentData {
	address?: Address;
	canEdit?: boolean;
	slug?: string;
	id: number;
	name?: String;
	description?: string;
	schedule?: ScheduleItem[];
	contacts?: ContactsFullInput;
}

export interface InstitutionUnitInput {
	typeId: number;
	address: Address;
	name?: String;
	fullName?: string;
	description?: string;
	edrpou?: string;
	schedule?: ScheduleItemInput[];
	contacts?: ContactsFullInput;
}

export interface UnitDepartmentInput {
	// address: Address;
	name?: String;
	description?: string;
	schedule?: ScheduleItemInput[];
	contacts?: ContactsFullInput;
}

export interface InstitutionInput {
	name?: string;
	fullName?: string;
	description?: string;
}

export interface ScheduleItemInput {
	dayOfWeek: DayOfWeek;
	isHoliday: boolean;
	startTime: string; // change to string, send format ISO 8601 with .toISOString() ?
	endTime: string; // change to string, send format ISO 8601 with .toISOString() ?
}

export interface ScheduleItem {
	id?: number;
	dayOfWeek: DayOfWeek;
	isHoliday: boolean;
	startTime: string; // change to string, send format ISO 8601 with .toISOString() ?
	endTime: string; // change to string, send format ISO 8601 with .toISOString() ?
}

export interface InstitutionUnitToEdit {
	id: number;
	unit: InstitutionUnitInput;
}

export interface Institution {
	ownershipForm?: OwnershipForm;
	id: number;
	name?: string;
	fullName: string;
	slug?: string;
	description: string;
	isPublished?: boolean;
}

export interface CommentItem {
	text: string;
	id: number;
	name: string;
	dateCreated: string;
	mark: number;
}

export interface CommentOrderInput {
	field?: CommentOrderField;
	direction?: OrderDirection;
}

export interface PageInfo {
	page: number;
}

export interface ReplyCommentInput {
	replyToId: number;
	text: string;
}

export type UserPasswordInput = {
	password: string;
	confirmPassword: string;
	oldPassword: string;
};

export type UserEmailInput = {
	email: string;
	password: string;
};

export interface EntityComments {
	pageInfo?: PageInfo;
	items: IComment[];
}

export interface City {
	id: number;
	name?: string;
	slug?: string;
	areaCenter?: boolean;
	katottg: String;
	area?: Area;
	district: District;
	otg: OTG;
	// cityDistricts?: CityDistrict[];
}

export interface Area {
	name: string;
	id: number;
}

export interface District {
	name: string;
	id: number;
}

export interface OTG {
	name: string;
	id: number;
}

export interface UnitType {
	id: number;
	name?: String;
	slug?: String;
}

export interface OwnershipForm {
	name?: string;
	title?: string;
}

export interface UnitDepartments {
	pageInfo: PageInfoType;
	items: UnitDepartment[];
}

export interface UnitDepartment {
	id: number;
	name?: string;
	slug?: string;
	isPublished?: boolean;
	unit?: InstitutionUnit;
	description?: string;
	contacts?: ContactsInput;
	schedule?: ScheduleItem[];
}

export interface PageInfoType {
	page: number;
	limit: number;
	totalPages: number;
	totalItems: number;
}

interface LegalForm {
	name: string;
	title: string;
}

interface CityDistrict {
	id: number;
	name: string;
}

interface CommentList {
	pageInfo?: PageInfoType;
	items: IComment[];
}

export interface IComment {
	replies?: CommentList;
	id?: number;
	unit?: InstitutionUnit;
	department?: UnitDepartment;
	dateCreated: string;
	name: string;
	email?: string;
	phone?: string;
	text: string;
	mark?: number;
	yearOfVisit?: number;
	monthOfVisit?: number;
	numLikes?: number;
	numDislikes?: number;
	type?: CommentType;
	institution?: Institution;
}

export interface CommentFilterInput {
	commentType?: string[];
	withChildrenUnits?: boolean;
	dateFrom?: Date;
	dateTo?: Date;
	unitDepartment?: number[];
}

export type SelectItem = {
	label: string;
	value: number;
};

export type fetchGraphQLResponse = {
	options: SelectItem[];
	pageInfo?: {
		page: number;
		limit: number;
		totalPages: number;
	};
};

export interface getMyNotificationsResponse {
	data?: {
		myNotifications: IMyNotifications;
	};
	errors?: ResponseError[];
}

export interface markNotificationAsReadResponse {
	data?: {
		markNotificationAsRead: boolean;
	};
	errors?: ResponseError[];
}

export interface IMyNotifications {
	items: UserNotification[];
	pageInfo?: {
		page?: number;
		totalPages?: number;
	};
}

export interface UserComment {
	replies: CommentList[];
	replyTo?: UserComment;
	dateCreated?: string;
	unit?: InstitutionUnit;
	department?: UnitDepartment;
	id?: number;
	name?: string;
	email?: string;
	phone?: string;
	text: string;
	mark?: number;
	yearOfVisit?: number;
	monthOfVisit?: number;
	numLikes: number;
	numDislikes: number;
	type: CommentType;
	institution: Institution;
}

export interface CommentNotification {
	comment: UserComment;
	creationDate: string;
}

export interface CommentReplyNotification {
	thread: Comment;
	replyTo: Comment;
	reply: Comment;
	creationDate: string;
}

export interface UserNotification {
	creationDate: string;
	// notification: CommentNotification | CommentReplyNotification;
	notification: CommentNotification;
	id: number;
	isRead: boolean;
}
