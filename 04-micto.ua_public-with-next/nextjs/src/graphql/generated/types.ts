export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	DateTime: { input: any; output: any };
	Upload: { input: any; output: any };
};

export type Address = {
	__typename?: 'Address';
	/** Address string */
	address: Scalars['String']['output'];
	/** Latitude */
	lat?: Maybe<Scalars['String']['output']>;
	/** Longitude */
	lon?: Maybe<Scalars['String']['output']>;
	/** Postal ZIP code */
	zipCode?: Maybe<Scalars['String']['output']>;
};

/** Input type for Address */
export type AddressInput = {
	/** Address string */
	address: Scalars['String']['input'];
	/** City district ID */
	cityDistrictId?: InputMaybe<Scalars['Int']['input']>;
	/** City ID */
	cityId: Scalars['Int']['input'];
	/** Latitude */
	lat?: InputMaybe<Scalars['Float']['input']>;
	/** Longitude */
	lon?: InputMaybe<Scalars['Float']['input']>;
	/** Postal ZIP code */
	zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type Area = {
	__typename?: 'Area';
	/**
	 * Area cities with institution units
	 *
	 * Cost: complexity = 50, multipliers = [], defaultMultiplier = null
	 * @deprecated Temporary and will be removed
	 */
	citiesWithInstitutionUnits?: Maybe<Array<Maybe<City>>>;
	/**
	 * Area districts
	 *
	 * Cost: complexity = 50, multipliers = [], defaultMultiplier = null
	 */
	districts: DistrictList;
	/**
	 * Full name of the area
	 *
	 * Cost: complexity = 1, multipliers = [], defaultMultiplier = null
	 */
	fullName?: Maybe<Scalars['String']['output']>;
	id?: Maybe<Scalars['Int']['output']>;
	isPublished: Scalars['Boolean']['output'];
	katottg?: Maybe<Scalars['String']['output']>;
	name: Scalars['String']['output'];
	/**
	 * The number of institution units in the area
	 *
	 * Cost: complexity = 30, multipliers = [], defaultMultiplier = null
	 */
	numberOfInstitutionUnits: Scalars['Int']['output'];
	oldId?: Maybe<Scalars['Int']['output']>;
	/**
	 * Short name of the area
	 *
	 * Cost: complexity = 1, multipliers = [], defaultMultiplier = null
	 */
	shortName?: Maybe<Scalars['String']['output']>;
	slug: Scalars['String']['output'];
};

export type AreaDistrictsArgs = {
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	pagination?: InputMaybe<PaginationInput>;
};

/** Input for filtering areas */
export type AreaFilterInput = {
	/** Selection areas which has institutional units of a given type */
	unitTypeId?: InputMaybe<Scalars['Int']['input']>;
};

export type AreaList = {
	__typename?: 'AreaList';
	items?: Maybe<Array<Area>>;
	pageInfo: PageInfoType;
};

export type Authorization = {
	__typename?: 'Authorization';
	accessToken: Scalars['String']['output'];
	refreshToken: Scalars['String']['output'];
	user: User;
};

export type ChangePasswordConfirmation = {
	__typename?: 'ChangePasswordConfirmation';
	email: Scalars['String']['output'];
	isCompleted: Scalars['Boolean']['output'];
	isExpired: Scalars['Boolean']['output'];
};

/** Input type for the change user email */
export type ChangePasswordInput = {
	/** The confirmation code that was sent to the user */
	code: Scalars['String']['input'];
	/** Password confirmation */
	confirmPassword: Scalars['String']['input'];
	/** New user password */
	password: Scalars['String']['input'];
};

export type City = {
	__typename?: 'City';
	area: Area;
	areaCenter: Scalars['Boolean']['output'];
	/**
	 * The city districts
	 *
	 * Cost: complexity = 60, multipliers = [], defaultMultiplier = null
	 */
	cityDistricts: CityDistrictList;
	district?: Maybe<District>;
	/**
	 * Full name of the city
	 *
	 * Cost: complexity = 1, multipliers = [], defaultMultiplier = null
	 */
	fullName?: Maybe<Scalars['String']['output']>;
	id?: Maybe<Scalars['Int']['output']>;
	katottg?: Maybe<Scalars['String']['output']>;
	name: Scalars['String']['output'];
	/**
	 * The number of institution units in the city
	 *
	 * Cost: complexity = 30, multipliers = [], defaultMultiplier = null
	 */
	numberOfInstitutionUnits: Scalars['Int']['output'];
	oldId?: Maybe<Scalars['Int']['output']>;
	otg?: Maybe<Otg>;
	/**
	 * Short name of the city
	 *
	 * Cost: complexity = 1, multipliers = [], defaultMultiplier = null
	 */
	shortName?: Maybe<Scalars['String']['output']>;
	slug: Scalars['String']['output'];
	type: CityType;
};

export type CityCityDistrictsArgs = {
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	pagination?: InputMaybe<PaginationInput>;
};

export type CityDistrict = {
	__typename?: 'CityDistrict';
	city: City;
	/**
	 * Full name of the city district
	 *
	 * Cost: complexity = 1, multipliers = [], defaultMultiplier = null
	 */
	fullName?: Maybe<Scalars['String']['output']>;
	id?: Maybe<Scalars['Int']['output']>;
	name?: Maybe<Scalars['String']['output']>;
	/**
	 * The number of institution units in the city district
	 *
	 * Cost: complexity = 40, multipliers = [], defaultMultiplier = null
	 */
	numberOfInstitutionUnits: Scalars['Int']['output'];
	oldId?: Maybe<Scalars['Int']['output']>;
	/**
	 * Short name of the city district
	 *
	 * Cost: complexity = 1, multipliers = [], defaultMultiplier = null
	 */
	shortName?: Maybe<Scalars['String']['output']>;
	slug: Scalars['String']['output'];
};

export type CityDistrictList = {
	__typename?: 'CityDistrictList';
	items?: Maybe<Array<CityDistrict>>;
	pageInfo: PageInfoType;
};

/** Input for filtering cities */
export type CityFilterInput = {
	/** Selection cities of a given area */
	areaId?: InputMaybe<Scalars['Int']['input']>;
	/** Selection cities with type city or special */
	onlyCities?: InputMaybe<Scalars['Boolean']['input']>;
	/** Selection cities which has institutional units of a given type */
	unitTypeId?: InputMaybe<Scalars['Int']['input']>;
};

export type CityList = {
	__typename?: 'CityList';
	items?: Maybe<Array<City>>;
	pageInfo: PageInfoType;
};

export enum CityType {
	City = 'CITY',
	Smt = 'SMT',
	Special = 'SPECIAL',
	Village = 'VILLAGE',
	VillageS = 'VILLAGE_S',
}

export type Comment = {
	__typename?: 'Comment';
	dateCreated: Scalars['String']['output'];
	department?: Maybe<UnitDepartment>;
	email?: Maybe<Scalars['String']['output']>;
	id?: Maybe<Scalars['Int']['output']>;
	institution: Institution;
	mark?: Maybe<Scalars['Int']['output']>;
	monthOfVisit?: Maybe<Scalars['Int']['output']>;
	name?: Maybe<Scalars['String']['output']>;
	numDislikes: Scalars['Int']['output'];
	numLikes: Scalars['Int']['output'];
	phone?: Maybe<Scalars['String']['output']>;
	replies: CommentList;
	replyTo?: Maybe<Comment>;
	text: Scalars['String']['output'];
	type: CommentType;
	unit?: Maybe<InstitutionUnit>;
	yearOfVisit?: Maybe<Scalars['Int']['output']>;
};

export type CommentRepliesArgs = {
	pagination?: InputMaybe<PaginationInput>;
};

/** Input for filtering comments */
export type CommentFilterInput = {
	commentType?: InputMaybe<Array<InputMaybe<TypeOfComment>>>;
	dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
	dateTo?: InputMaybe<Scalars['DateTime']['input']>;
	unitDepartment?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
	/** Select comments of nested units */
	withChildrenUnits?: Scalars['Boolean']['input'];
};

export type CommentList = {
	__typename?: 'CommentList';
	items?: Maybe<Array<Comment>>;
	pageInfo: PageInfoType;
};

export type CommentNotification = NotificationInterface & {
	__typename?: 'CommentNotification';
	/** Comment data */
	comment: Comment;
	creationDate: Scalars['String']['output'];
};

export enum CommentOrderField {
	Answered = 'ANSWERED',
	Date = 'DATE',
}

/** Order input type for comments */
export type CommentOrderInput = {
	direction?: InputMaybe<OrderDirection>;
	field: CommentOrderField;
};

export type CommentReplyNotification = NotificationInterface & {
	__typename?: 'CommentReplyNotification';
	creationDate: Scalars['String']['output'];
	/** Reply comment data */
	reply: Comment;
	/** Data of comment being replied to */
	replyTo: Comment;
	/** Main thread comment data */
	thread: Comment;
};

export enum CommentType {
	Complaint = 'COMPLAINT',
	Gratitude = 'GRATITUDE',
	Question = 'QUESTION',
	Reply = 'REPLY',
	Review = 'REVIEW',
}

export type Contacts = {
	__typename?: 'Contacts';
	emails?: Maybe<Array<Email>>;
	phones?: Maybe<Array<Phone>>;
};

export type ContactsInput = {
	emails?: InputMaybe<Array<EmailInput>>;
	phones?: InputMaybe<Array<PhoneInput>>;
};

/** Input for request to create institution */
export type CreateInstitutionRequestInput = {
	/** Institution address */
	address: Scalars['String']['input'];
	agreeTerms?: InputMaybe<Scalars['Boolean']['input']>;
	/** Institution chief name */
	chiefFullName?: InputMaybe<Scalars['String']['input']>;
	/** User contacts */
	contacts?: InputMaybe<Scalars['String']['input']>;
	/** Institution edrpou */
	edrpou?: InputMaybe<Scalars['String']['input']>;
	/** Institution email */
	email?: InputMaybe<Scalars['String']['input']>;
	/** Institution full name */
	fullName: Scalars['String']['input'];
	/** Institution head doctor name */
	headDoctorFullName?: InputMaybe<Scalars['String']['input']>;
	/** Institution status */
	institutionStatus?: InputMaybe<CreateInstitutionRequestStatusType>;
	/** Institution type */
	institutionType: Scalars['String']['input'];
	/** Institution ownership form type */
	ownershipForm: OwnershipForm;
	/** Institution phones */
	phones: Scalars['String']['input'];
	/** Recaptcha code */
	recaptcha: Scalars['String']['input'];
	/** Institution schedule */
	schedule?: InputMaybe<Scalars['String']['input']>;
	/** Institution short name */
	shortName?: InputMaybe<Scalars['String']['input']>;
	/** User type */
	userType: CreateInstitutionRequestUserType;
};

export enum CreateInstitutionRequestStatusType {
	Attacked = 'ATTACKED',
	Occupied = 'OCCUPIED',
	Relocated = 'RELOCATED',
}

export enum CreateInstitutionRequestUserType {
	Institution = 'INSTITUTION',
	Visitor = 'VISITOR',
}

export enum DayOfWeek {
	Fri = 'FRI',
	Mon = 'MON',
	Sat = 'SAT',
	Sun = 'SUN',
	Thu = 'THU',
	Tue = 'TUE',
	Wed = 'WED',
}

export type District = {
	__typename?: 'District';
	area: Area;
	/**
	 * District cities
	 *
	 * Cost: complexity = 50, multipliers = [], defaultMultiplier = null
	 */
	cities: CityList;
	/**
	 * Full name of the district
	 *
	 * Cost: complexity = 1, multipliers = [], defaultMultiplier = null
	 */
	fullName?: Maybe<Scalars['String']['output']>;
	id?: Maybe<Scalars['Int']['output']>;
	katottg?: Maybe<Scalars['String']['output']>;
	name: Scalars['String']['output'];
	/**
	 * The number of institution units in the area district
	 *
	 * Cost: complexity = 30, multipliers = [], defaultMultiplier = null
	 */
	numberOfInstitutionUnits: Scalars['Int']['output'];
	oldId?: Maybe<Scalars['Int']['output']>;
	/**
	 * Short name of the district
	 *
	 * Cost: complexity = 1, multipliers = [], defaultMultiplier = null
	 */
	shortName?: Maybe<Scalars['String']['output']>;
	slug: Scalars['String']['output'];
};

export type DistrictCitiesArgs = {
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	pagination?: InputMaybe<PaginationInput>;
};

/** Input for filtering districts */
export type DistrictFilterInput = {
	/** Selection districts which has institutional units of a given type */
	unitTypeId?: InputMaybe<Scalars['Int']['input']>;
};

export type DistrictList = {
	__typename?: 'DistrictList';
	items?: Maybe<Array<District>>;
	pageInfo: PageInfoType;
};

export type DoctorProfile = {
	__typename?: 'DoctorProfile';
	photo?: Maybe<Scalars['String']['output']>;
	position?: Maybe<Scalars['String']['output']>;
};

export type Email = {
	__typename?: 'Email';
	comment?: Maybe<Scalars['String']['output']>;
	email: Scalars['String']['output'];
};

export type EmailInput = {
	comment?: InputMaybe<Scalars['String']['input']>;
	email: Scalars['String']['input'];
};

export enum EntityType {
	Institution = 'INSTITUTION',
	InstitutionUnit = 'INSTITUTION_UNIT',
	UnitDepartment = 'UNIT_DEPARTMENT',
}

export type Institution = {
	__typename?: 'Institution';
	/** Is user can edit current institution */
	canEdit: Scalars['Boolean']['output'];
	description?: Maybe<Scalars['String']['output']>;
	fullName?: Maybe<Scalars['String']['output']>;
	hasSeveralUnits: Scalars['Boolean']['output'];
	id?: Maybe<Scalars['Int']['output']>;
	/** Institution images */
	images?: Maybe<Array<Maybe<Media>>>;
	isPublished: Scalars['Boolean']['output'];
	name: Scalars['String']['output'];
	/** Ownership form */
	ownershipForm: OwnershipFormData;
	rating: Scalars['Float']['output'];
	slug: Scalars['String']['output'];
};

/** Input for Institution edit */
export type InstitutionInput = {
	/** Institution description text */
	description?: InputMaybe<Scalars['String']['input']>;
	/** Institution full name */
	fullName?: InputMaybe<Scalars['String']['input']>;
	/** Image file */
	image?: InputMaybe<Scalars['Upload']['input']>;
	/** Institution name */
	name?: InputMaybe<Scalars['String']['input']>;
};

export type InstitutionList = {
	__typename?: 'InstitutionList';
	items?: Maybe<Array<Institution>>;
	pageInfo: PageInfoType;
};

/** Input type with institution data for register institution user */
export type InstitutionRegistrationStep1Input = {
	/** Information about institution */
	about?: InputMaybe<Scalars['String']['input']>;
	/** EDRPOU code */
	edrpou: Scalars['String']['input'];
	/** Institution name */
	fullName: Scalars['String']['input'];
	/** Ownership form type */
	ownershipForm: OwnershipForm;
};

/** Input type with user data for register institution user */
export type InstitutionRegistrationStep2Input = {
	/** User email address */
	email: Scalars['String']['input'];
	/** User first name */
	firstName: Scalars['String']['input'];
	/** User last name */
	lastName: Scalars['String']['input'];
	/** User phone number */
	phone: Scalars['String']['input'];
	/** User position */
	position?: InputMaybe<Scalars['String']['input']>;
};

/** Input type with user password data for register institution user */
export type InstitutionRegistrationStep3Input = {
	/** Confirmation that the user agrees to provide personal data */
	agreeTerms: Scalars['Boolean']['input'];
	/** Password confirmation */
	confirmPassword: Scalars['String']['input'];
	/** User password */
	password: Scalars['String']['input'];
};

export type InstitutionUnit = {
	__typename?: 'InstitutionUnit';
	/** Institution unit address */
	address?: Maybe<Address>;
	/** Is user can edit current institution */
	canEdit: Scalars['Boolean']['output'];
	city: City;
	cityDistrict?: Maybe<CityDistrict>;
	comments?: Maybe<Array<Comment>>;
	contacts?: Maybe<Contacts>;
	departments: UnitDepartmentList;
	description?: Maybe<Scalars['String']['output']>;
	edrpou?: Maybe<Scalars['String']['output']>;
	fullName?: Maybe<Scalars['String']['output']>;
	id?: Maybe<Scalars['Int']['output']>;
	/** Institution unit images */
	images?: Maybe<Array<Maybe<Media>>>;
	institution: Institution;
	isPublished: Scalars['Boolean']['output'];
	/** Організаційно-правова форма */
	legalForm?: Maybe<LegalForm>;
	name: Scalars['String']['output'];
	oldId?: Maybe<Scalars['Int']['output']>;
	rating: Scalars['Float']['output'];
	schedule?: Maybe<Array<Schedule>>;
	slug: Scalars['String']['output'];
	type?: Maybe<InstitutionUnitType>;
};

export type InstitutionUnitDepartmentsArgs = {
	pagination?: InputMaybe<PaginationInput>;
};

/** Input for filtering institution units */
export type InstitutionUnitFilterInput = {
	/** Selection of institutional units in the area */
	areaId?: InputMaybe<Scalars['Int']['input']>;
	/** Selection of institutional units int the given city districts */
	cityDistrictIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
	/** Selection of institutional units int the given cities */
	cityIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
	/** Selection of institutional units int the given districts */
	districtIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
	/** Selection of units for the institution */
	institutionId?: InputMaybe<Scalars['Int']['input']>;
	/** Selection of units with comments */
	onlyWithComments?: InputMaybe<Scalars['Boolean']['input']>;
	/** Selection of institutional units by types */
	unitTypeIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

/** Input type for Institution unit */
export type InstitutionUnitInput = {
	/** Institution unit address */
	address?: InputMaybe<AddressInput>;
	/** Institution unit contact information */
	contacts?: InputMaybe<ContactsInput>;
	/** Institution unit description text */
	description?: InputMaybe<Scalars['String']['input']>;
	/** Institution unit EDRPOU code */
	edrpou?: InputMaybe<Scalars['String']['input']>;
	/** Institution unit full name */
	fullName?: InputMaybe<Scalars['String']['input']>;
	/** Image file */
	image?: InputMaybe<Scalars['Upload']['input']>;
	/** Institution unit name */
	name: Scalars['String']['input'];
	/** Institution unit schedule */
	schedule?: InputMaybe<Array<ScheduleItemInput>>;
	/** Institution type ID */
	typeId?: InputMaybe<Scalars['Int']['input']>;
};

export type InstitutionUnitList = {
	__typename?: 'InstitutionUnitList';
	items?: Maybe<Array<InstitutionUnit>>;
	pageInfo: PageInfoType;
};

export type InstitutionUnitType = {
	__typename?: 'InstitutionUnitType';
	id?: Maybe<Scalars['Int']['output']>;
	name: Scalars['String']['output'];
	/**
	 * The number of institution units
	 *
	 * Cost: complexity = 50, multipliers = [], defaultMultiplier = null
	 */
	numberOfInstitutionUnits: Scalars['Int']['output'];
	oldId?: Maybe<Scalars['Int']['output']>;
	slug: Scalars['String']['output'];
};

/** Input for filtering institution unit types */
export type InstitutionUnitTypeFilterInput = {
	/** Select types for units in provided city district */
	cityDistrictId?: InputMaybe<Scalars['Int']['input']>;
	/** Select types for units in provided city */
	cityId?: InputMaybe<Scalars['Int']['input']>;
	/** Select types which has institution units */
	onlyWithInstitutionUnits?: Scalars['Boolean']['input'];
};

export type InstitutionUnitTypeList = {
	__typename?: 'InstitutionUnitTypeList';
	items?: Maybe<Array<InstitutionUnitType>>;
	pageInfo: PageInfoType;
};

export enum InstitutionUnitTypeOrderField {
	Id = 'ID',
	Name = 'NAME',
}

/** Order input type for institution unit type */
export type InstitutionUnitTypeOrderInput = {
	direction?: InputMaybe<OrderDirection>;
	field?: InputMaybe<InstitutionUnitTypeOrderField>;
};

/** Input type for investor request */
export type InvestorRequestInput = {
	/** Comment */
	comment?: InputMaybe<Scalars['String']['input']>;
	/** User email */
	email: Scalars['String']['input'];
	/** User name */
	name?: Scalars['String']['input'];
	/** User phone number */
	phone?: Scalars['String']['input'];
	/** Recaptcha code */
	recaptcha: Scalars['String']['input'];
};

export type LegalForm = {
	__typename?: 'LegalForm';
	name: Scalars['String']['output'];
	title: Scalars['String']['output'];
};

export type Media = {
	__typename?: 'Media';
	displayOrder: Scalars['Int']['output'];
	id?: Maybe<Scalars['Int']['output']>;
	mimeType: Scalars['String']['output'];
	size: Scalars['Int']['output'];
	url: Scalars['String']['output'];
};

export type MultiStepRegistration = {
	__typename?: 'MultiStepRegistration';
	steps?: Maybe<Array<Maybe<Step>>>;
	token: Scalars['String']['output'];
};

export type Mutation = {
	__typename?: 'Mutation';
	changePassword: Scalars['Boolean']['output'];
	createInstitutionUnit?: Maybe<InstitutionUnit>;
	createUnitDepartment?: Maybe<UnitDepartment>;
	editInstitution?: Maybe<Institution>;
	editInstitutionUnit?: Maybe<InstitutionUnit>;
	editMyEmail: User;
	editMyPassword: Scalars['Boolean']['output'];
	editMyProfile: User;
	editUnitDepartment?: Maybe<UnitDepartment>;
	login: Authorization;
	logout: Scalars['Boolean']['output'];
	markNotificationAsRead: Scalars['Boolean']['output'];
	refreshToken: Authorization;
	registerInstitutionComplete: Authorization;
	registerInstitutionStep1: MultiStepRegistration;
	registerInstitutionStep2: MultiStepRegistration;
	registerInstitutionStep3: MultiStepRegistration;
	registerUser: Authorization;
	replyComment?: Maybe<Comment>;
	resetPassword: Scalars['Boolean']['output'];
	sendCreateInstitutionRequest: Scalars['Boolean']['output'];
	sendInvestorRequest: Scalars['Boolean']['output'];
	sendPsychologistRequest: Scalars['Boolean']['output'];
	sendSponsorRequest: Scalars['Boolean']['output'];
};

export type MutationChangePasswordArgs = {
	input: ChangePasswordInput;
};

export type MutationCreateInstitutionUnitArgs = {
	input: InstitutionUnitInput;
	institutionId: Scalars['Int']['input'];
};

export type MutationCreateUnitDepartmentArgs = {
	input: UnitDepartmentInput;
	institutionUnitId: Scalars['Int']['input'];
};

export type MutationEditInstitutionArgs = {
	id: Scalars['Int']['input'];
	input: InstitutionInput;
};

export type MutationEditInstitutionUnitArgs = {
	id: Scalars['Int']['input'];
	input: InstitutionUnitInput;
};

export type MutationEditMyEmailArgs = {
	input: UserEmailInput;
};

export type MutationEditMyPasswordArgs = {
	input: UserPasswordInput;
};

export type MutationEditMyProfileArgs = {
	input: UserProfileInput;
};

export type MutationEditUnitDepartmentArgs = {
	id: Scalars['Int']['input'];
	input: UnitDepartmentInput;
};

export type MutationLoginArgs = {
	password: Scalars['String']['input'];
	username: Scalars['String']['input'];
};

export type MutationLogoutArgs = {
	refreshToken: Scalars['String']['input'];
};

export type MutationMarkNotificationAsReadArgs = {
	id: Array<Scalars['Int']['input']>;
};

export type MutationRefreshTokenArgs = {
	refreshToken: Scalars['String']['input'];
};

export type MutationRegisterInstitutionCompleteArgs = {
	token: Scalars['String']['input'];
};

export type MutationRegisterInstitutionStep1Args = {
	input: InstitutionRegistrationStep1Input;
	token?: InputMaybe<Scalars['String']['input']>;
};

export type MutationRegisterInstitutionStep2Args = {
	input: InstitutionRegistrationStep2Input;
	token: Scalars['String']['input'];
};

export type MutationRegisterInstitutionStep3Args = {
	input: InstitutionRegistrationStep3Input;
	token: Scalars['String']['input'];
};

export type MutationRegisterUserArgs = {
	input: RegisterUserInput;
};

export type MutationReplyCommentArgs = {
	input: ReplyCommentInput;
};

export type MutationResetPasswordArgs = {
	email: Scalars['String']['input'];
};

export type MutationSendCreateInstitutionRequestArgs = {
	input: CreateInstitutionRequestInput;
};

export type MutationSendInvestorRequestArgs = {
	input: InvestorRequestInput;
};

export type MutationSendPsychologistRequestArgs = {
	input: PsychologistRequestInput;
};

export type MutationSendSponsorRequestArgs = {
	input: SponsorRequestInput;
};

export type NotificationImpl = NotificationInterface & {
	__typename?: 'NotificationImpl';
	creationDate: Scalars['String']['output'];
};

export type NotificationInterface = {
	creationDate: Scalars['String']['output'];
};

export type Otg = {
	__typename?: 'OTG';
	area: Area;
	district: District;
	id?: Maybe<Scalars['Int']['output']>;
	katottg?: Maybe<Scalars['String']['output']>;
	name: Scalars['String']['output'];
};

export enum OrderDirection {
	Asc = 'ASC',
	Desc = 'DESC',
}

export enum OwnershipForm {
	Collective = 'COLLECTIVE',
	Private = 'PRIVATE',
	State = 'STATE',
}

export type OwnershipFormData = {
	__typename?: 'OwnershipFormData';
	name: Scalars['String']['output'];
	title: Scalars['String']['output'];
};

export type PageInfoType = {
	__typename?: 'PageInfoType';
	limit: Scalars['Int']['output'];
	page: Scalars['Int']['output'];
	totalItems: Scalars['Int']['output'];
	totalPages: Scalars['Int']['output'];
};

export type PaginationInput = {
	limit?: InputMaybe<Scalars['Int']['input']>;
	page?: InputMaybe<Scalars['Int']['input']>;
};

export type Phone = {
	__typename?: 'Phone';
	comment?: Maybe<Scalars['String']['output']>;
	formattedNumber: Scalars['String']['output'];
	number: Scalars['String']['output'];
};

export type PhoneInput = {
	comment?: InputMaybe<Scalars['String']['input']>;
	number: Scalars['String']['input'];
};

/** Input type for psychologist request */
export type PsychologistRequestInput = {
	/** Comment */
	comment: Scalars['String']['input'];
	/** User name */
	name?: Scalars['String']['input'];
	/** User phone number */
	phone?: Scalars['String']['input'];
	/** Recaptcha code */
	recaptcha: Scalars['String']['input'];
};

export type Query = {
	__typename?: 'Query';
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	area?: Maybe<Area>;
	/**
	 *
	 * Cost: complexity = 50, multipliers = [], defaultMultiplier = null
	 */
	areaCenters: CityList;
	areas: AreaList;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	changePasswordConfirmation: ChangePasswordConfirmation;
	/**
	 *
	 * Cost: complexity = 50, multipliers = [], defaultMultiplier = null
	 */
	cities: CityList;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	city?: Maybe<City>;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	cityDistrict?: Maybe<CityDistrict>;
	/**
	 *
	 * Cost: complexity = 60, multipliers = [], defaultMultiplier = null
	 */
	cityDistricts: CityDistrictList;
	comment?: Maybe<Comment>;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	district?: Maybe<District>;
	/**
	 *
	 * Cost: complexity = 50, multipliers = [], defaultMultiplier = null
	 */
	districts: DistrictList;
	entityComments: CommentList;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	institution?: Maybe<Institution>;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	institutionUnit?: Maybe<InstitutionUnit>;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	institutionUnitType?: Maybe<InstitutionUnitType>;
	/**
	 *
	 * Cost: complexity = 30, multipliers = [], defaultMultiplier = null
	 */
	institutionUnitTypes: InstitutionUnitTypeList;
	/**
	 *
	 * Cost: complexity = 50, multipliers = [], defaultMultiplier = null
	 */
	institutionUnits: InstitutionUnitList;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	me: User;
	/**
	 *
	 * Cost: complexity = 10, multipliers = [], defaultMultiplier = null
	 */
	multiStepRegistrationData?: Maybe<MultiStepRegistration>;
	myComments?: Maybe<CommentList>;
	myInstitutionUnits?: Maybe<Array<InstitutionUnit>>;
	myInstitutions?: Maybe<Array<Institution>>;
	myNotifications?: Maybe<UserNotificationList>;
	myUnitDepartments?: Maybe<Array<UnitDepartment>>;
	unitDepartment?: Maybe<UnitDepartment>;
	unitDepartments: UnitDepartmentList;
};

export type QueryAreaArgs = {
	id?: InputMaybe<Scalars['Int']['input']>;
	oldId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryAreaCentersArgs = {
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryAreasArgs = {
	filter?: InputMaybe<AreaFilterInput>;
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	pagination?: InputMaybe<PaginationInput>;
	searchString?: InputMaybe<Scalars['String']['input']>;
};

export type QueryChangePasswordConfirmationArgs = {
	code: Scalars['String']['input'];
};

export type QueryCitiesArgs = {
	districtId?: InputMaybe<Scalars['Int']['input']>;
	filter?: InputMaybe<CityFilterInput>;
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	pagination?: InputMaybe<PaginationInput>;
	searchString?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCityArgs = {
	id?: InputMaybe<Scalars['Int']['input']>;
	oldId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryCityDistrictArgs = {
	id?: InputMaybe<Scalars['Int']['input']>;
	oldId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryCityDistrictsArgs = {
	cityId: Scalars['Int']['input'];
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	pagination?: InputMaybe<PaginationInput>;
	searchString?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCommentArgs = {
	id: Scalars['Int']['input'];
};

export type QueryDistrictArgs = {
	id?: InputMaybe<Scalars['Int']['input']>;
	oldId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryDistrictsArgs = {
	areaId: Scalars['Int']['input'];
	filter?: InputMaybe<DistrictFilterInput>;
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	pagination?: InputMaybe<PaginationInput>;
	searchString?: InputMaybe<Scalars['String']['input']>;
};

export type QueryEntityCommentsArgs = {
	entityId: Scalars['Int']['input'];
	entityType: EntityType;
	filter?: InputMaybe<CommentFilterInput>;
	order?: InputMaybe<CommentOrderInput>;
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryInstitutionArgs = {
	id: Scalars['Int']['input'];
};

export type QueryInstitutionUnitArgs = {
	id: Scalars['Int']['input'];
};

export type QueryInstitutionUnitTypeArgs = {
	id?: InputMaybe<Scalars['Int']['input']>;
	oldId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryInstitutionUnitTypesArgs = {
	filter?: InputMaybe<InstitutionUnitTypeFilterInput>;
	order?: InputMaybe<InstitutionUnitTypeOrderInput>;
	pagination?: InputMaybe<PaginationInput>;
	searchString?: InputMaybe<Scalars['String']['input']>;
};

export type QueryInstitutionUnitsArgs = {
	filter?: InputMaybe<InstitutionUnitFilterInput>;
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryMultiStepRegistrationDataArgs = {
	token: Scalars['String']['input'];
};

export type QueryMyCommentsArgs = {
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryMyInstitutionUnitsArgs = {
	institutionId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryMyNotificationsArgs = {
	filter?: InputMaybe<UserNotificationFilterInput>;
	pagination?: InputMaybe<PaginationInput>;
};

export type QueryMyUnitDepartmentsArgs = {
	unitId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUnitDepartmentArgs = {
	id?: InputMaybe<Scalars['Int']['input']>;
	oldId?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryUnitDepartmentsArgs = {
	pagination?: InputMaybe<PaginationInput>;
	unitId: Scalars['Int']['input'];
};

/** Input type for register user */
export type RegisterUserInput = {
	/** Password confirmation */
	confirmPassword: Scalars['String']['input'];
	/** User email */
	email: Scalars['String']['input'];
	/** User first name */
	firstName?: Scalars['String']['input'];
	/** User last name */
	lastName?: Scalars['String']['input'];
	/** User password */
	password: Scalars['String']['input'];
	/** User phone number */
	phone?: InputMaybe<Scalars['String']['input']>;
};

/** Input for comment reply */
export type ReplyCommentInput = {
	replyToId: Scalars['Int']['input'];
	/** Reply text */
	text: Scalars['String']['input'];
};

export type Schedule = {
	__typename?: 'Schedule';
	dayOfWeek: DayOfWeek;
	endTime?: Maybe<Scalars['String']['output']>;
	id?: Maybe<Scalars['Int']['output']>;
	isAroundTheClock: Scalars['Boolean']['output'];
	isHoliday: Scalars['Boolean']['output'];
	startTime?: Maybe<Scalars['String']['output']>;
};

/** Input type for schedule */
export type ScheduleItemInput = {
	dayOfWeek: DayOfWeek;
	endTime?: InputMaybe<Scalars['DateTime']['input']>;
	isAroundTheClock?: InputMaybe<Scalars['Boolean']['input']>;
	isHoliday?: InputMaybe<Scalars['Boolean']['input']>;
	startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Input type for sponsor request */
export type SponsorRequestInput = {
	/** Comment */
	comment?: InputMaybe<Scalars['String']['input']>;
	/** User email */
	email: Scalars['String']['input'];
	/** User name */
	name?: Scalars['String']['input'];
	/** User phone number */
	phone?: Scalars['String']['input'];
	/** Recaptcha code */
	recaptcha: Scalars['String']['input'];
};

export type Step = {
	__typename?: 'Step';
	data?: Maybe<Array<Maybe<StepData>>>;
	step: Scalars['String']['output'];
};

export type StepData = {
	__typename?: 'StepData';
	field: Scalars['String']['output'];
	value?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
	__typename?: 'Subscription';
	/** A placeholder query used by thecodingmachine/graphqlite when there are no declared subscriptions. */
	dummySubscription?: Maybe<Scalars['String']['output']>;
};

export type SymfonyUserImpl = SymfonyUserInterface & {
	__typename?: 'SymfonyUserImpl';
	doctorProfile?: Maybe<DoctorProfile>;
	email: Scalars['String']['output'];
	firstName?: Maybe<Scalars['String']['output']>;
	isActive: Scalars['Boolean']['output'];
	isAdminUser: Scalars['Boolean']['output'];
	isInstitution: Scalars['Boolean']['output'];
	lastName?: Maybe<Scalars['String']['output']>;
	middleName?: Maybe<Scalars['String']['output']>;
	phone?: Maybe<Phone>;
};

export type SymfonyUserInterface = {
	doctorProfile?: Maybe<DoctorProfile>;
	email: Scalars['String']['output'];
	firstName?: Maybe<Scalars['String']['output']>;
	isActive: Scalars['Boolean']['output'];
	isAdminUser: Scalars['Boolean']['output'];
	isInstitution: Scalars['Boolean']['output'];
	lastName?: Maybe<Scalars['String']['output']>;
	middleName?: Maybe<Scalars['String']['output']>;
	phone?: Maybe<Phone>;
};

export type SystemNotification = NotificationInterface & {
	__typename?: 'SystemNotification';
	creationDate: Scalars['String']['output'];
};

export enum TypeOfComment {
	Complaint = 'COMPLAINT',
	Gratitude = 'GRATITUDE',
	Question = 'QUESTION',
	Review = 'REVIEW',
}

export type UnitDepartment = {
	__typename?: 'UnitDepartment';
	/** Is user can edit current institution */
	canEdit: Scalars['Boolean']['output'];
	contacts?: Maybe<Contacts>;
	description?: Maybe<Scalars['String']['output']>;
	fullName?: Maybe<Scalars['String']['output']>;
	id?: Maybe<Scalars['Int']['output']>;
	/** Institution unit department images */
	images?: Maybe<Array<Maybe<Media>>>;
	isPublished: Scalars['Boolean']['output'];
	name: Scalars['String']['output'];
	number?: Maybe<Scalars['String']['output']>;
	oldId?: Maybe<Scalars['Int']['output']>;
	rating: Scalars['Float']['output'];
	schedule?: Maybe<Array<Schedule>>;
	slug: Scalars['String']['output'];
	unit: InstitutionUnit;
};

/** Input type for Institution unit department */
export type UnitDepartmentInput = {
	/** Unit department contact information */
	contacts?: InputMaybe<ContactsInput>;
	/** Unit department description */
	description?: InputMaybe<Scalars['String']['input']>;
	/** Unit department full name */
	fullName?: InputMaybe<Scalars['String']['input']>;
	/** Image file */
	image?: InputMaybe<Scalars['Upload']['input']>;
	/** Unit department name */
	name: Scalars['String']['input'];
	/** Unit department number */
	number?: InputMaybe<Scalars['String']['input']>;
	/** Unit department schedule */
	schedule?: InputMaybe<Array<ScheduleItemInput>>;
};

export type UnitDepartmentList = {
	__typename?: 'UnitDepartmentList';
	items?: Maybe<Array<UnitDepartment>>;
	pageInfo: PageInfoType;
};

export type User = SymfonyUserInterface & {
	__typename?: 'User';
	doctorProfile?: Maybe<DoctorProfile>;
	email: Scalars['String']['output'];
	firstName?: Maybe<Scalars['String']['output']>;
	isActive: Scalars['Boolean']['output'];
	isAdminUser: Scalars['Boolean']['output'];
	isInstitution: Scalars['Boolean']['output'];
	lastName?: Maybe<Scalars['String']['output']>;
	middleName?: Maybe<Scalars['String']['output']>;
	phone?: Maybe<Phone>;
};

/** Input type for the change user email */
export type UserEmailInput = {
	/** New user email */
	email: Scalars['String']['input'];
	/** User's password */
	password: Scalars['String']['input'];
};

export type UserNotification = {
	__typename?: 'UserNotification';
	creationDate: Scalars['String']['output'];
	id?: Maybe<Scalars['Int']['output']>;
	isRead: Scalars['Boolean']['output'];
	notification?: Maybe<NotificationInterface>;
};

/** Input for filtering user notifications */
export type UserNotificationFilterInput = {
	dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
	dateTo?: InputMaybe<Scalars['DateTime']['input']>;
	/** Select only unread notifications */
	onlyUnread?: Scalars['Boolean']['input'];
};

export type UserNotificationList = {
	__typename?: 'UserNotificationList';
	items?: Maybe<Array<UserNotification>>;
	pageInfo: PageInfoType;
};

/** Input type for the change user password */
export type UserPasswordInput = {
	/** Password confirmation */
	confirmPassword: Scalars['String']['input'];
	/** Old user password */
	oldPassword: Scalars['String']['input'];
	/** New user password */
	password: Scalars['String']['input'];
};

/** Input type for the user profile */
export type UserProfileInput = {
	/** User's first name */
	firstName?: Scalars['String']['input'];
	/** User's last name */
	lastName?: InputMaybe<Scalars['String']['input']>;
	/** User's middle name */
	middleName?: InputMaybe<Scalars['String']['input']>;
	/** User's password */
	password: Scalars['String']['input'];
	/** User's phone number */
	phone?: InputMaybe<Scalars['String']['input']>;
};

export type LoginMutationVariables = Exact<{
	username: Scalars['String']['input'];
	password: Scalars['String']['input'];
}>;

export type LoginMutation = {
	__typename?: 'Mutation';
	login: { __typename?: 'Authorization'; accessToken: string; refreshToken: string };
};

export type RefreshTokenMutationVariables = Exact<{
	refreshToken: Scalars['String']['input'];
}>;

export type RefreshTokenMutation = {
	__typename?: 'Mutation';
	refreshToken: { __typename?: 'Authorization'; accessToken: string; refreshToken: string };
};

export type ResetPasswordMutationVariables = Exact<{
	email: Scalars['String']['input'];
}>;

export type ResetPasswordMutation = { __typename?: 'Mutation'; resetPassword: boolean };

export type ChangePasswordMutationVariables = Exact<{
	input: ChangePasswordInput;
}>;

export type ChangePasswordMutation = { __typename?: 'Mutation'; changePassword: boolean };

export type RegisterUserMutationVariables = Exact<{
	firstName: Scalars['String']['input'];
	lastName: Scalars['String']['input'];
	email: Scalars['String']['input'];
	phone?: InputMaybe<Scalars['String']['input']>;
	password: Scalars['String']['input'];
	confirmPassword: Scalars['String']['input'];
}>;

export type RegisterUserMutation = {
	__typename?: 'Mutation';
	registerUser: {
		__typename?: 'Authorization';
		accessToken: string;
		refreshToken: string;
		user: {
			__typename?: 'User';
			email: string;
			firstName?: string | null;
			lastName?: string | null;
		};
	};
};

export type RegisterInstitutionStep1MutationVariables = Exact<{
	input: InstitutionRegistrationStep1Input;
}>;

export type RegisterInstitutionStep1Mutation = {
	__typename?: 'Mutation';
	registerInstitutionStep1: { __typename?: 'MultiStepRegistration'; token: string };
};

export type RegisterInstitutionStep2MutationVariables = Exact<{
	input: InstitutionRegistrationStep2Input;
	token: Scalars['String']['input'];
}>;

export type RegisterInstitutionStep2Mutation = {
	__typename?: 'Mutation';
	registerInstitutionStep2: { __typename?: 'MultiStepRegistration'; token: string };
};

export type RegisterInstitutionStep3MutationVariables = Exact<{
	input: InstitutionRegistrationStep3Input;
	token: Scalars['String']['input'];
}>;

export type RegisterInstitutionStep3Mutation = {
	__typename?: 'Mutation';
	registerInstitutionStep3: { __typename?: 'MultiStepRegistration'; token: string };
};

export type RegisterInstitutionCompleteMutationVariables = Exact<{
	token: Scalars['String']['input'];
}>;

export type RegisterInstitutionCompleteMutation = {
	__typename?: 'Mutation';
	registerInstitutionComplete: {
		__typename?: 'Authorization';
		accessToken: string;
		refreshToken: string;
		user: { __typename?: 'User'; email: string };
	};
};

export type GetAreaByIdQueryVariables = Exact<{
	id?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAreaByIdQuery = {
	__typename?: 'Query';
	area?: {
		__typename?: 'Area';
		id?: number | null;
		shortName?: string | null;
		fullName?: string | null;
		slug: string;
		numberOfInstitutionUnits: number;
		districts: {
			__typename?: 'DistrictList';
			items?: Array<{
				__typename?: 'District';
				shortName?: string | null;
				fullName?: string | null;
				slug: string;
				oldId?: number | null;
				id?: number | null;
				cities: {
					__typename?: 'CityList';
					items?: Array<{
						__typename?: 'City';
						areaCenter: boolean;
						shortName?: string | null;
						fullName?: string | null;
						type: CityType;
						oldId?: number | null;
						id?: number | null;
						slug: string;
						cityDistricts: {
							__typename?: 'CityDistrictList';
							items?: Array<{
								__typename?: 'CityDistrict';
								shortName?: string | null;
								fullName?: string | null;
								id?: number | null;
							}> | null;
						};
					}> | null;
				};
			}> | null;
		};
	} | null;
};

export type GetInstitutionUnitsQueryVariables = Exact<{
	cityIds?: InputMaybe<
		Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>
	>;
	cityDistrictIds?: InputMaybe<
		Array<InputMaybe<Scalars['Int']['input']>> | InputMaybe<Scalars['Int']['input']>
	>;
}>;

export type GetInstitutionUnitsQuery = {
	__typename?: 'Query';
	institutionUnits: {
		__typename?: 'InstitutionUnitList';
		items?: Array<{
			__typename?: 'InstitutionUnit';
			id?: number | null;
			oldId?: number | null;
			name: string;
			slug: string;
			institution: {
				__typename?: 'Institution';
				ownershipForm: { __typename?: 'OwnershipFormData'; name: string; title: string };
			};
		}> | null;
	};
};

export type GetCityByIdQueryVariables = Exact<{
	oldId?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCityByIdQuery = {
	__typename?: 'Query';
	city?: {
		__typename?: 'City';
		id?: number | null;
		shortName?: string | null;
		fullName?: string | null;
		slug: string;
		numberOfInstitutionUnits: number;
		cityDistricts: {
			__typename?: 'CityDistrictList';
			items?: Array<{
				__typename?: 'CityDistrict';
				id?: number | null;
				fullName?: string | null;
				shortName?: string | null;
				slug: string;
				oldId?: number | null;
			}> | null;
		};
	} | null;
};

export type GetInstitutionByIdQueryVariables = Exact<{
	id: Scalars['Int']['input'];
}>;

export type GetInstitutionByIdQuery = {
	__typename?: 'Query';
	institution?: {
		__typename?: 'Institution';
		name: string;
		id?: number | null;
		fullName?: string | null;
		description?: string | null;
		hasSeveralUnits: boolean;
		rating: number;
		ownershipForm: { __typename?: 'OwnershipFormData'; name: string; title: string };
		images?: Array<{
			__typename?: 'Media';
			url: string;
			id?: number | null;
			size: number;
			mimeType: string;
		} | null> | null;
	} | null;
};

export type GetInstitutionUnitByIdQueryVariables = Exact<{
	id?: Scalars['Int']['input'];
}>;

export type GetInstitutionUnitByIdQuery = {
	__typename?: 'Query';
	institutionUnit?: {
		__typename?: 'InstitutionUnit';
		name: string;
		fullName?: string | null;
		description?: string | null;
		id?: number | null;
		rating: number;
		legalForm?: { __typename?: 'LegalForm'; name: string; title: string } | null;
		cityDistrict?: {
			__typename?: 'CityDistrict';
			shortName?: string | null;
			fullName?: string | null;
			oldId?: number | null;
			id?: number | null;
			name?: string | null;
			slug: string;
		} | null;
		address?: {
			__typename?: 'Address';
			address: string;
			zipCode?: string | null;
			lat?: string | null;
			lon?: string | null;
		} | null;
		city: {
			__typename?: 'City';
			name: string;
			fullName?: string | null;
			id?: number | null;
			slug: string;
			district?: {
				__typename?: 'District';
				fullName?: string | null;
				name: string;
				slug: string;
				oldId?: number | null;
			} | null;
			area: { __typename?: 'Area'; name: string; slug: string; oldId?: number | null };
		};
		type?: { __typename?: 'InstitutionUnitType'; name: string; slug: string } | null;
		institution: {
			__typename?: 'Institution';
			ownershipForm: { __typename?: 'OwnershipFormData'; name: string; title: string };
		};
		departments: {
			__typename?: 'UnitDepartmentList';
			pageInfo: { __typename?: 'PageInfoType'; totalPages: number };
			items?: Array<{
				__typename?: 'UnitDepartment';
				id?: number | null;
				oldId?: number | null;
				name: string;
				slug: string;
				unit: { __typename?: 'InstitutionUnit'; slug: string; oldId?: number | null };
				schedule?: Array<{
					__typename?: 'Schedule';
					dayOfWeek: DayOfWeek;
					isHoliday: boolean;
					isAroundTheClock: boolean;
					startTime?: string | null;
					endTime?: string | null;
				}> | null;
			}> | null;
		};
		comments?: Array<{
			__typename?: 'Comment';
			id?: number | null;
			name?: string | null;
			email?: string | null;
			mark?: number | null;
			yearOfVisit?: number | null;
			monthOfVisit?: number | null;
			replies: {
				__typename?: 'CommentList';
				items?: Array<{
					__typename?: 'Comment';
					id?: number | null;
					name?: string | null;
					email?: string | null;
					mark?: number | null;
					yearOfVisit?: number | null;
					monthOfVisit?: number | null;
				}> | null;
			};
		}> | null;
		contacts?: {
			__typename?: 'Contacts';
			emails?: Array<{ __typename?: 'Email'; email: string; comment?: string | null }> | null;
			phones?: Array<{
				__typename?: 'Phone';
				number: string;
				comment?: string | null;
				formattedNumber: string;
			}> | null;
		} | null;
		schedule?: Array<{
			__typename?: 'Schedule';
			dayOfWeek: DayOfWeek;
			startTime?: string | null;
			endTime?: string | null;
			isHoliday: boolean;
			isAroundTheClock: boolean;
		}> | null;
		images?: Array<{
			__typename?: 'Media';
			url: string;
			id?: number | null;
			size: number;
			mimeType: string;
		} | null> | null;
	} | null;
};

export type GetUnitDepartmentByIdQueryVariables = Exact<{
	oldId: Scalars['Int']['input'];
}>;

export type GetUnitDepartmentByIdQuery = {
	__typename?: 'Query';
	unitDepartment?: {
		__typename?: 'UnitDepartment';
		name: string;
		oldId?: number | null;
		id?: number | null;
		slug: string;
		description?: string | null;
		rating: number;
		unit: {
			__typename?: 'InstitutionUnit';
			oldId?: number | null;
			id?: number | null;
			name: string;
			slug: string;
			institution: {
				__typename?: 'Institution';
				ownershipForm: { __typename?: 'OwnershipFormData'; name: string; title: string };
			};
		};
		schedule?: Array<{
			__typename?: 'Schedule';
			dayOfWeek: DayOfWeek;
			startTime?: string | null;
			endTime?: string | null;
			isHoliday: boolean;
			isAroundTheClock: boolean;
		}> | null;
		contacts?: {
			__typename?: 'Contacts';
			emails?: Array<{ __typename?: 'Email'; email: string; comment?: string | null }> | null;
			phones?: Array<{
				__typename?: 'Phone';
				number: string;
				comment?: string | null;
				formattedNumber: string;
			}> | null;
		} | null;
		images?: Array<{
			__typename?: 'Media';
			url: string;
			id?: number | null;
			size: number;
			mimeType: string;
			displayOrder: number;
		} | null> | null;
	} | null;
};

export type GetInstitutionUnitsByParentIdQueryVariables = Exact<{
	id: Scalars['Int']['input'];
}>;

export type GetInstitutionUnitsByParentIdQuery = {
	__typename?: 'Query';
	institutionUnits: {
		__typename: 'InstitutionUnitList';
		items?: Array<{
			__typename: 'InstitutionUnit';
			name: string;
			id?: number | null;
			oldId?: number | null;
			slug: string;
			contacts?: {
				__typename: 'Contacts';
				emails?: Array<{
					__typename: 'Email';
					email: string;
					comment?: string | null;
				}> | null;
				phones?: Array<{
					__typename: 'Phone';
					number: string;
					comment?: string | null;
					formattedNumber: string;
				}> | null;
			} | null;
			address?: { __typename: 'Address'; address: string } | null;
			schedule?: Array<{
				__typename: 'Schedule';
				startTime?: string | null;
				endTime?: string | null;
				dayOfWeek: DayOfWeek;
				isHoliday: boolean;
				isAroundTheClock: boolean;
			}> | null;
		}> | null;
	};
};

export type GetCityDistrictByIdQueryVariables = Exact<{
	oldId?: InputMaybe<Scalars['Int']['input']>;
	id?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCityDistrictByIdQuery = {
	__typename?: 'Query';
	cityDistrict?: {
		__typename?: 'CityDistrict';
		shortName?: string | null;
		fullName?: string | null;
		numberOfInstitutionUnits: number;
		id?: number | null;
		name?: string | null;
		slug: string;
		oldId?: number | null;
		city: {
			__typename?: 'City';
			shortName?: string | null;
			fullName?: string | null;
			numberOfInstitutionUnits: number;
			id?: number | null;
			name: string;
			slug: string;
			areaCenter: boolean;
			katottg?: string | null;
			type: CityType;
			oldId?: number | null;
			area: {
				__typename?: 'Area';
				shortName?: string | null;
				fullName?: string | null;
				numberOfInstitutionUnits: number;
				id?: number | null;
				name: string;
				slug: string;
				katottg?: string | null;
				oldId?: number | null;
				isPublished: boolean;
			};
		};
	} | null;
};

export type GetDistrictByIdQueryVariables = Exact<{
	oldId?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetDistrictByIdQuery = {
	__typename?: 'Query';
	district?: {
		__typename?: 'District';
		id?: number | null;
		shortName?: string | null;
		fullName?: string | null;
		slug: string;
		numberOfInstitutionUnits: number;
		cities: {
			__typename?: 'CityList';
			items?: Array<{
				__typename?: 'City';
				shortName?: string | null;
				fullName?: string | null;
				type: CityType;
				oldId?: number | null;
				id?: number | null;
				slug: string;
			}> | null;
		};
	} | null;
};

export type GetCitiesQueryVariables = Exact<{
	districtId?: InputMaybe<Scalars['Int']['input']>;
	searchString?: InputMaybe<Scalars['String']['input']>;
	onlyWithInstitutionUnits?: InputMaybe<Scalars['Boolean']['input']>;
	filter?: InputMaybe<CityFilterInput>;
	pagination?: InputMaybe<PaginationInput>;
}>;

export type GetCitiesQuery = {
	__typename?: 'Query';
	cities: {
		__typename?: 'CityList';
		pageInfo: {
			__typename?: 'PageInfoType';
			page: number;
			limit: number;
			totalPages: number;
			totalItems: number;
		};
		items?: Array<{
			__typename?: 'City';
			name: string;
			shortName?: string | null;
			id?: number | null;
			oldId?: number | null;
			fullName?: string | null;
			slug: string;
		}> | null;
	};
};

export type GetAllInstitutionUnitTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllInstitutionUnitTypesQuery = {
	__typename?: 'Query';
	institutionUnitTypes: {
		__typename?: 'InstitutionUnitTypeList';
		items?: Array<{
			__typename?: 'InstitutionUnitType';
			oldId?: number | null;
			name: string;
			slug: string;
		}> | null;
	};
};

export type GetInstitutionUnitTypesByIdQueryVariables = Exact<{
	cityId?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetInstitutionUnitTypesByIdQuery = {
	__typename?: 'Query';
	institutionUnitTypes: {
		__typename?: 'InstitutionUnitTypeList';
		items?: Array<{
			__typename?: 'InstitutionUnitType';
			oldId?: number | null;
			name: string;
		}> | null;
	};
};

export type GetAllAreasQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllAreasQuery = {
	__typename?: 'Query';
	areas: {
		__typename?: 'AreaList';
		items?: Array<{
			__typename?: 'Area';
			fullName?: string | null;
			shortName?: string | null;
			name: string;
			slug: string;
			oldId?: number | null;
			id?: number | null;
		}> | null;
	};
};

export type GetDistrictsAndCitiesByAreaIdQueryVariables = Exact<{
	areaId?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetDistrictsAndCitiesByAreaIdQuery = {
	__typename?: 'Query';
	area?: {
		__typename?: 'Area';
		districts: {
			__typename?: 'DistrictList';
			items?: Array<{
				__typename?: 'District';
				shortName?: string | null;
				fullName?: string | null;
				slug: string;
				oldId?: number | null;
				id?: number | null;
				cities: {
					__typename?: 'CityList';
					items?: Array<{
						__typename?: 'City';
						shortName?: string | null;
						fullName?: string | null;
						type: CityType;
						oldId?: number | null;
						id?: number | null;
					}> | null;
				};
			}> | null;
		};
	} | null;
};

export type GetAreasQueryVariables = Exact<{ [key: string]: never }>;

export type GetAreasQuery = {
	__typename?: 'Query';
	areas: {
		__typename?: 'AreaList';
		pageInfo: {
			__typename?: 'PageInfoType';
			page: number;
			limit: number;
			totalPages: number;
			totalItems: number;
		};
		items?: Array<{
			__typename?: 'Area';
			fullName?: string | null;
			shortName?: string | null;
			name: string;
			slug: string;
			oldId?: number | null;
			id?: number | null;
		}> | null;
	};
};

export type GetAreasCenterQueryVariables = Exact<{ [key: string]: never }>;

export type GetAreasCenterQuery = {
	__typename?: 'Query';
	areaCenters: {
		__typename?: 'CityList';
		pageInfo: {
			__typename?: 'PageInfoType';
			page: number;
			limit: number;
			totalPages: number;
			totalItems: number;
		};
		items?: Array<{
			__typename?: 'City';
			fullName?: string | null;
			shortName?: string | null;
			name: string;
			slug: string;
			oldId?: number | null;
			id?: number | null;
			area: { __typename?: 'Area'; isPublished: boolean };
		}> | null;
	};
};

export type GetEntityCommentsQueryVariables = Exact<{
	id: Scalars['Int']['input'];
	entityType: EntityType;
	filter?: InputMaybe<CommentFilterInput>;
}>;

export type GetEntityCommentsQuery = {
	__typename?: 'Query';
	entityComments: {
		__typename?: 'CommentList';
		pageInfo: {
			__typename?: 'PageInfoType';
			page: number;
			totalPages: number;
			totalItems: number;
		};
		items?: Array<{
			__typename?: 'Comment';
			id?: number | null;
			name?: string | null;
			text: string;
			dateCreated: string;
			mark?: number | null;
			yearOfVisit?: number | null;
			monthOfVisit?: number | null;
			type: CommentType;
			numLikes: number;
			numDislikes: number;
			department?: {
				__typename?: 'UnitDepartment';
				name: string;
				slug: string;
				oldId?: number | null;
				unit: {
					__typename?: 'InstitutionUnit';
					slug: string;
					oldId?: number | null;
					id?: number | null;
				};
			} | null;
			replies: {
				__typename?: 'CommentList';
				pageInfo: {
					__typename?: 'PageInfoType';
					page: number;
					totalPages: number;
					totalItems: number;
				};
				items?: Array<{
					__typename?: 'Comment';
					id?: number | null;
					name?: string | null;
					text: string;
					numLikes: number;
					numDislikes: number;
					dateCreated: string;
					type: CommentType;
					replyTo?: {
						__typename?: 'Comment';
						name?: string | null;
						id?: number | null;
					} | null;
				}> | null;
			};
		}> | null;
	};
};
