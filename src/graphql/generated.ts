import client from "../lib/graphql/apollo";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, MutationOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type ActivateAutoPaymentApplicationResult = {
  __typename?: 'ActivateAutoPaymentApplicationResult';
  autoPaymentApplication: AutoPaymentApplication;
  autoPaymentSubscription: AutoPaymentSubscription;
  customToken: Scalars['String']['output'];
  parkEntry: ParkEntry;
  paymentApparatus: PaymentApparatuses;
};

export type AuthenticatedLink = {
  __typename?: 'AuthenticatedLink';
  createdAt: Scalars['DateTime']['output'];
  customToken: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AutoCompleteItem = {
  __typename?: 'AutoCompleteItem';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type AutoCompleteSearch = {
  query: Scalars['String']['input'];
};

export type AutoCompleteSearchResult = {
  __typename?: 'AutoCompleteSearchResult';
  candidates: Array<AutoCompleteItem>;
};

export type AutoPaymentApplication = {
  __typename?: 'AutoPaymentApplication';
  activationLink: Scalars['String']['output'];
  activationSmsSentAt?: Maybe<Scalars['DateTime']['output']>;
  applicationVoidsAt: Scalars['DateTime']['output'];
  cardBrand?: Maybe<Scalars['String']['output']>;
  cardExpiresAt?: Maybe<Scalars['String']['output']>;
  cardLast4Digits?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deviceId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Image;
  large: Scalars['String']['output'];
  letter: Scalars['String']['output'];
  parkEntryId: Scalars['String']['output'];
  parkId: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  plateValue: Scalars['String']['output'];
  small: Scalars['String']['output'];
  status: AutoPaymentApplicationStatus;
  updatedAt: Scalars['DateTime']['output'];
  userStartedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AutoPaymentApplicationCreate = {
  applicationVoidsAt?: InputMaybe<Scalars['DateTime']['input']>;
  cardBrand?: InputMaybe<Scalars['String']['input']>;
  cardExpiresAt?: InputMaybe<Scalars['String']['input']>;
  cardLast4Digits?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  deviceId: Scalars['String']['input'];
  image: InputImage;
  large: Scalars['String']['input'];
  letter: Scalars['String']['input'];
  parkEntryId: Scalars['String']['input'];
  parkId: Scalars['String']['input'];
  paymentTokenId?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
  small: Scalars['String']['input'];
  status: AutoPaymentApplicationStatus;
  transactor: Transactor;
};

export enum AutoPaymentApplicationStatus {
  Awaiting = 'AWAITING',
  Complete = 'COMPLETE',
  New = 'NEW',
  Void = 'VOID'
}

export type AutoPaymentSubscription = {
  __typename?: 'AutoPaymentSubscription';
  city: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  currentParkEntry?: Maybe<ParkEntry>;
  id: Scalars['String']['output'];
  image: Image;
  large: Scalars['String']['output'];
  lastParkEntry?: Maybe<ParkEntry>;
  letter: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parkEntries: Array<ParkEntry>;
  plateValue: Scalars['String']['output'];
  small: Scalars['String']['output'];
  status: AutoPaymentSubscriptionStatus;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export enum AutoPaymentSubscriptionStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type AutoPaymentSubscriptionUpdate = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AutoPaymentSubscriptionStatus>;
};

export type CameraEvent = {
  __typename?: 'CameraEvent';
  cameraRole: Scalars['String']['output'];
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deviceId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  large?: Maybe<Scalars['String']['output']>;
  letter?: Maybe<Scalars['String']['output']>;
  ownerId: Scalars['String']['output'];
  park: Park;
  parkEntryId?: Maybe<Scalars['String']['output']>;
  parkId: Scalars['String']['output'];
  plateValue?: Maybe<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CameraEventList = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  pageOption?: InputMaybe<PageOption>;
  parkId?: InputMaybe<Scalars['String']['input']>;
};

export type CheckUserExists = {
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CheckUserExistsResul = {
  __typename?: 'CheckUserExistsResul';
  exists: Scalars['Boolean']['output'];
};

export type ClosedSale = {
  __typename?: 'ClosedSale';
  amount: Scalars['Float']['output'];
  count: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['String']['output'];
  details: Array<ClosedSaleDetail>;
  id: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  storeId: Scalars['String']['output'];
  storeName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  year: Scalars['Float']['output'];
  yearMonth: Scalars['String']['output'];
};

export type ClosedSaleDetail = {
  __typename?: 'ClosedSaleDetail';
  amount: Scalars['Float']['output'];
  bizReferenceId: Scalars['String']['output'];
  closedSaleId: Scalars['String']['output'];
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['String']['output'];
  externalId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  pgReferenceId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ClosedSaleList = {
  dateRange?: InputMaybe<DateRange>;
  storeIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DateRange = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export type DeletedObject = {
  __typename?: 'DeletedObject';
  deletedId: Scalars['String']['output'];
};

export type Device = {
  __typename?: 'Device';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  kid: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DeviceConfiguration = {
  __typename?: 'DeviceConfiguration';
  cameraRole: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deviceRegistrationId: Scalars['String']['output'];
  fps?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  localOpenGate?: Maybe<Scalars['Boolean']['output']>;
  parkId: Scalars['String']['output'];
  plateLimit?: Maybe<Scalars['Float']['output']>;
  recognitionLogExport?: Maybe<Scalars['Boolean']['output']>;
  samePlateDistanceLeft?: Maybe<Scalars['Float']['output']>;
  samePlateDistanceRight?: Maybe<Scalars['Float']['output']>;
  samePlateTimeout?: Maybe<Scalars['Float']['output']>;
  sectionCount?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  verbose?: Maybe<Scalars['Boolean']['output']>;
};

export type DeviceConfigurationUpdate = {
  fps?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  localOpenGate?: InputMaybe<Scalars['Boolean']['input']>;
  plateLimit?: InputMaybe<Scalars['Float']['input']>;
  recognitionLogExport?: InputMaybe<Scalars['Boolean']['input']>;
  samePlateDistanceLeft?: InputMaybe<Scalars['Float']['input']>;
  samePlateDistanceRight?: InputMaybe<Scalars['Float']['input']>;
  samePlateTimeout?: InputMaybe<Scalars['Float']['input']>;
  sectionCount?: InputMaybe<Scalars['Float']['input']>;
  verbose?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DeviceRegistration = {
  __typename?: 'DeviceRegistration';
  cameraRole?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  device: Device;
  deviceConfiguration?: Maybe<DeviceConfiguration>;
  deviceId: Scalars['String']['output'];
  deviceType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  overallHealthCheckStatus?: Maybe<OverallHealthCheckStatus>;
  ownerId: Scalars['String']['output'];
  park: Park;
  parkId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DeviceRegistrationList = {
  cameraRole?: InputMaybe<Scalars['String']['input']>;
  deviceType?: InputMaybe<Scalars['String']['input']>;
  pageOption?: InputMaybe<PageOption>;
  parkId?: InputMaybe<Scalars['String']['input']>;
};

export type DeviceRegistrationRequest = {
  __typename?: 'DeviceRegistrationRequest';
  cameraRole?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deviceType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ownerId: Scalars['String']['output'];
  parkId: Scalars['String']['output'];
  qrUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  validUntil: Scalars['DateTime']['output'];
};

export type DeviceRegistrationRequestClaim = {
  id: Scalars['String']['input'];
};

export type DeviceRegistrationRequestCreate = {
  cameraRole?: InputMaybe<Scalars['String']['input']>;
  deviceType: Scalars['String']['input'];
  parkId: Scalars['String']['input'];
};

export type DeviceRegistrationResult = {
  __typename?: 'DeviceRegistrationResult';
  device: Device;
  deviceRegistration?: Maybe<DeviceRegistration>;
};

export type DeviceRegistrationUpdate = {
  id: Scalars['String']['input'];
};

export type Duration = {
  __typename?: 'Duration';
  days?: Maybe<Scalars['Float']['output']>;
  hours?: Maybe<Scalars['Float']['output']>;
  minutes?: Maybe<Scalars['Float']['output']>;
  seconds?: Maybe<Scalars['Float']['output']>;
};

export type DurationInput = {
  days?: InputMaybe<Scalars['Float']['input']>;
  hours?: InputMaybe<Scalars['Float']['input']>;
  minutes?: InputMaybe<Scalars['Float']['input']>;
  seconds?: InputMaybe<Scalars['Float']['input']>;
};

export type DynamicQueryCondition = {
  fieldName: Scalars['String']['input'];
  operator: Operator;
  value: Scalars['String']['input'];
};

export enum EntryOrExit {
  Entry = 'ENTRY',
  Exit = 'EXIT'
}

export type FileDownload = {
  __typename?: 'FileDownload';
  downloadUrl: Scalars['String']['output'];
};

export type ForceGateOpen = {
  deviceId: Scalars['String']['input'];
};

export type HealthCheckStatus = {
  __typename?: 'HealthCheckStatus';
  createdAt: Scalars['DateTime']['output'];
  deviceId: Scalars['String']['output'];
  deviceRegistrationId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  status: HealthCheckStatusStatus;
  type: HealthCheckType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum HealthCheckStatusStatus {
  Down = 'DOWN',
  Up = 'UP'
}

export enum HealthCheckType {
  Anpr = 'ANPR',
  SignalGenerator = 'SIGNAL_GENERATOR'
}

export type IPointInWeek = {
  hour: Scalars['Float']['input'];
  minute: Scalars['Float']['input'];
  weekday: Weekday;
};

export type Image = {
  __typename?: 'Image';
  bucket: Scalars['String']['output'];
  file: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
};

export type InputActivateAutoPaymentApplication = {
  id: Scalars['String']['input'];
};

export type InputDelete = {
  id: Scalars['String']['input'];
};

export type InputDetail = {
  id: Scalars['String']['input'];
};

export type InputImage = {
  bucket: Scalars['String']['input'];
  file: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
};

export type InputList = {
  pageOption?: InputMaybe<PageOption>;
};

export type InputParkEntriesListSimilar = {
  entryOrExit: EntryOrExit;
  id: Scalars['String']['input'];
};

export type InputParkEntryError = {
  from: Scalars['DateTime']['input'];
  parkId: Scalars['String']['input'];
  to: Scalars['DateTime']['input'];
};

export type InputParkEntryImage = {
  bucket: Scalars['String']['input'];
  eventType: Scalars['String']['input'];
  file: Scalars['String']['input'];
  timestamp: Scalars['DateTime']['input'];
};

export type InputPlate = {
  city?: InputMaybe<Scalars['String']['input']>;
  large?: InputMaybe<Scalars['String']['input']>;
  letter?: InputMaybe<Scalars['String']['input']>;
  small?: InputMaybe<Scalars['String']['input']>;
};

export type InputRerunFromCameraEvents = {
  from: Scalars['DateTime']['input'];
  parkId: Scalars['String']['input'];
  to: Scalars['DateTime']['input'];
};

export type InputResourceShareCreate = {
  entityId: Scalars['String']['input'];
  entityType: Scalars['String']['input'];
  sharedToEmail: Scalars['String']['input'];
};

export type InputSmsSend = {
  body: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type InstanceConfirmPaymentIntent = {
  paymentIntentClientSecret: Scalars['String']['input'];
  paymentIntentId: Scalars['String']['input'];
};

export type InstantCreatePaymentIntent = {
  parkEntryId: Scalars['String']['input'];
  receiptEmail?: InputMaybe<Scalars['String']['input']>;
  sendReceipt?: InputMaybe<Scalars['Boolean']['input']>;
};

export type InstantCreatePaymentIntentReesult = {
  __typename?: 'InstantCreatePaymentIntentReesult';
  clientSecret: Scalars['String']['output'];
  parkEntry: PublicParkEntry;
  paymentRequest: PublicPaymentRequest;
};

export type ListParkEntriesSimilar = {
  enteredBefore: Scalars['DateTime']['input'];
  minScore?: InputMaybe<Scalars['Float']['input']>;
  parkId: Scalars['String']['input'];
  plate: InputPlate;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateAutoPaymentApplication: ActivateAutoPaymentApplicationResult;
  changePassword: User;
  changeUserAttributes: User;
  claimDeviceRegistration: DeviceRegistration;
  confirmPublicPayment: PublicPaymentRequest;
  createAutoPaymentApplication: AutoPaymentApplication;
  createDeviceRegistrationRequest: DeviceRegistrationRequest;
  createPark: Park;
  createParkingSlot: ParkingSlot;
  createPriceBlock: PriceBlock;
  createResourceShare: ResourceShare;
  createUserFeedback: UserFeedback;
  createVehicle: Vehicle;
  createVehicleUserBinding: VehicleUser;
  createWhiteListedVehicleParkBinding: WhiteListedVehicleParkBinding;
  deleteDeviceConfiguration: DeletedObject;
  deleteDeviceRegistration: DeletedObject;
  deleteMyAutoPaymentSubscription: DeletedObject;
  deleteParkEntry: DeletedObject;
  deleteParkingSlot: DeletedObject;
  deletePriceblock: DeletedObject;
  deleteResourceShare: DeletedObject;
  deleteUser: User;
  deleteVehicle: DeletedObject;
  deleteVehicleUserBinding: DeletedObject;
  deleteWhiteListedVehicleParkBinding: DeletedObject;
  enterParkEntryMax: ParkEntry;
  enterParkEntryMini: ParkEntry;
  enterParkEntrySensor: ParkEntry;
  exitParkEntryMax: ParkEntry;
  exitParkEntryMini: ParkEntry;
  exitParkEntrySensor: ParkEntry;
  exportClosedSaleDetails: FileDownload;
  exportClosedSales: FileDownload;
  /**
   * As the fare of parking is incremented at certain increments (e.g. every 5 minutes) and the payment is made before the user exits the car park,
   *     there can be a confusing situation where the fare is incremented after the user has made the payment.
   *     For example, if the user pays the fare at 1000 yen but if they take 9 minutes to leave the car park, the fare at that point might be 1100 yen.
   *     To avoid the fare from changing AFTER the user has made payment, the price of the fare may be tentatively fixed for a grace period (approx 10 minutes... subject to change)
   *     This allows the user to exit the car parking with reasonable amount of time without worrying about the fares changing.
   *     fixParkEntryFare should be called immediately before the user sees the fare.
   *
   */
  fixParkEntryFare: ParkEntry;
  forceOpenGate: Status;
  payParkEntry: PaymentRequest;
  publicFixParkEntryFare: ParkEntry;
  publicPayParkEntry?: Maybe<InstantCreatePaymentIntentReesult>;
  publicUnfixParkEntryFare: ParkEntry;
  rerunFromCameraEventsDto: RerunFromCameraEvents;
  scheduleParkEntryDedupe: ParkEntriesListSimilar;
  sendSms: SmsSendResult;
  /**
   * Please see fixParkEntryFare for the full description of what fixing fare entails.
   *     Unfixing the fare is the opposite. It puts the park entry into a state before it was ever fixed.
   *     This should be called in an event that the user decided not to complete the payment, like they cancelled, went back to top, or timedout... or for whatever reason they left the car selection page.
   *     When you fix fare, it is only good for 10 minutes. i.e. it will expire after 10 minutes. So unfixing it might seem not so important,
   *     but to maintain the data sanitary, this should be called if the user isn't going to go through with the payment
   */
  unfixParkEntryFare: ParkEntry;
  updateDeviceConfiguration: DeviceConfiguration;
  updateDeviceRegistration: DeviceRegistration;
  updateMyAutoPaymentSubscription: AutoPaymentSubscription;
  updateMyParkEntry: ParkEntry;
  updatePark: Park;
  updateParkingSlot: ParkingSlot;
  updatePaymentRequest: PaymentRequest;
  updatePriceBlock: PriceBlock;
  updatePublicPaymentRequest: PublicPaymentRequest;
  updateVehicle: Vehicle;
};


export type MutationActivateAutoPaymentApplicationArgs = {
  data: InputActivateAutoPaymentApplication;
};


export type MutationChangePasswordArgs = {
  data: PasswordDetail;
};


export type MutationChangeUserAttributesArgs = {
  data: UserAttrDetail;
};


export type MutationClaimDeviceRegistrationArgs = {
  data: DeviceRegistrationRequestClaim;
};


export type MutationConfirmPublicPaymentArgs = {
  data: InstanceConfirmPaymentIntent;
};


export type MutationCreateAutoPaymentApplicationArgs = {
  data: AutoPaymentApplicationCreate;
};


export type MutationCreateDeviceRegistrationRequestArgs = {
  data: DeviceRegistrationRequestCreate;
};


export type MutationCreateParkArgs = {
  data: ParkCreate;
};


export type MutationCreateParkingSlotArgs = {
  data: ParkingSlotCreate;
};


export type MutationCreatePriceBlockArgs = {
  data: PriceBlockCreate;
};


export type MutationCreateResourceShareArgs = {
  data: InputResourceShareCreate;
};


export type MutationCreateUserFeedbackArgs = {
  data: UserFeedbackCreate;
};


export type MutationCreateVehicleArgs = {
  data: VehicleCreate;
};


export type MutationCreateVehicleUserBindingArgs = {
  data: VehicleUserCreate;
};


export type MutationCreateWhiteListedVehicleParkBindingArgs = {
  data: WhiteListedVehicleParkBindingCreate;
};


export type MutationDeleteDeviceConfigurationArgs = {
  data: InputDelete;
};


export type MutationDeleteDeviceRegistrationArgs = {
  data: InputDelete;
};


export type MutationDeleteMyAutoPaymentSubscriptionArgs = {
  data: InputDelete;
};


export type MutationDeleteParkEntryArgs = {
  data: InputDelete;
};


export type MutationDeleteParkingSlotArgs = {
  data: InputDelete;
};


export type MutationDeletePriceblockArgs = {
  data: InputDelete;
};


export type MutationDeleteResourceShareArgs = {
  data: ResourceShareDelete;
};


export type MutationDeleteVehicleArgs = {
  data: InputDelete;
};


export type MutationDeleteVehicleUserBindingArgs = {
  data: InputDelete;
};


export type MutationDeleteWhiteListedVehicleParkBindingArgs = {
  data: InputDelete;
};


export type MutationEnterParkEntryMaxArgs = {
  data: ParkEntryEntryMax;
};


export type MutationEnterParkEntryMiniArgs = {
  data: ParkEntryEntryMini;
};


export type MutationEnterParkEntrySensorArgs = {
  data: ParkEntryEntrySensor;
};


export type MutationExitParkEntryMaxArgs = {
  data: ParkEntryExitMax;
};


export type MutationExitParkEntryMiniArgs = {
  data: ParkEntryExitMini;
};


export type MutationExitParkEntrySensorArgs = {
  data: ParkEntryExitSensor;
};


export type MutationExportClosedSaleDetailsArgs = {
  data: ClosedSaleList;
};


export type MutationExportClosedSalesArgs = {
  data: ClosedSaleList;
};


export type MutationFixParkEntryFareArgs = {
  data: InputDetail;
};


export type MutationForceOpenGateArgs = {
  data: ForceGateOpen;
};


export type MutationPayParkEntryArgs = {
  data: ParkEntryPay;
};


export type MutationPublicFixParkEntryFareArgs = {
  data: InputDetail;
};


export type MutationPublicPayParkEntryArgs = {
  data: InstantCreatePaymentIntent;
};


export type MutationPublicUnfixParkEntryFareArgs = {
  data: InputDetail;
};


export type MutationRerunFromCameraEventsDtoArgs = {
  data: InputRerunFromCameraEvents;
};


export type MutationScheduleParkEntryDedupeArgs = {
  data: InputParkEntriesListSimilar;
};


export type MutationSendSmsArgs = {
  data: InputSmsSend;
};


export type MutationUnfixParkEntryFareArgs = {
  data: InputDetail;
};


export type MutationUpdateDeviceConfigurationArgs = {
  data: DeviceConfigurationUpdate;
};


export type MutationUpdateDeviceRegistrationArgs = {
  data: DeviceRegistrationUpdate;
};


export type MutationUpdateMyAutoPaymentSubscriptionArgs = {
  data: AutoPaymentSubscriptionUpdate;
};


export type MutationUpdateMyParkEntryArgs = {
  data: ParkEntryUpdateUser;
};


export type MutationUpdateParkArgs = {
  data: ParkUpdate;
};


export type MutationUpdateParkingSlotArgs = {
  data: ParkingSlotUpdate;
};


export type MutationUpdatePaymentRequestArgs = {
  data: PaymentRequestUpdate;
};


export type MutationUpdatePriceBlockArgs = {
  data: PriceBlockUpdate;
};


export type MutationUpdatePublicPaymentRequestArgs = {
  data: PublicPaymentRequestUpdate;
};


export type MutationUpdateVehicleArgs = {
  data: VehicleUpdate;
};

export enum Operator {
  Equals = 'equals',
  StartsWith = 'startsWith'
}

export type OverallHealthCheckStatus = {
  __typename?: 'OverallHealthCheckStatus';
  healthCheckStatuses: Array<HealthCheckStatus>;
  lastLiveAt?: Maybe<Scalars['DateTime']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  status: HealthCheckStatusStatus;
};

export type PageOption = {
  nextToken?: InputMaybe<Scalars['String']['input']>;
  prevToken?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  sortOptions?: InputMaybe<Array<SortOption>>;
};

export type Park = {
  __typename?: 'Park';
  active: Scalars['Boolean']['output'];
  activeEntranceDevices: Array<DeviceRegistration>;
  activeExitDevices: Array<DeviceRegistration>;
  address: Scalars['String']['output'];
  capacity: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  deviceRegistrations: Array<DeviceRegistration>;
  entranceDevices: Array<DeviceRegistration>;
  exitDevices: Array<DeviceRegistration>;
  hasSlots: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isAnpr: Scalars['Boolean']['output'];
  isPublic: Scalars['Boolean']['output'];
  kioskDevices: Array<DeviceRegistration>;
  name: Scalars['String']['output'];
  operatorAttribute1?: Maybe<Scalars['String']['output']>;
  operatorName?: Maybe<Scalars['String']['output']>;
  owner: User;
  ownerId: Scalars['String']['output'];
  parkingSlots: Array<ParkingSlot>;
  priceBlockPark?: Maybe<PriceBlockPark>;
  priceBlocks: Array<PriceBlock>;
  resourceShares: Array<ResourceShare>;
  shouldDedupe: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ParkCreate = {
  address: Scalars['String']['input'];
  capacity: Scalars['Float']['input'];
  hasSlots?: InputMaybe<Scalars['Boolean']['input']>;
  isAnpr?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  operatorAttribute1?: InputMaybe<Scalars['String']['input']>;
  operatorName: Scalars['String']['input'];
  shouldDedupe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ParkDetail = {
  id: Scalars['String']['input'];
};

export type ParkEntriesListSimilar = {
  __typename?: 'ParkEntriesListSimilar';
  entryOrExit: EntryOrExit;
  id: Scalars['String']['output'];
};

export type ParkEntry = {
  __typename?: 'ParkEntry';
  amountStatus: Scalars['String']['output'];
  autoPaymentSubscription?: Maybe<AutoPaymentSubscription>;
  autoPaymentSubscriptionId?: Maybe<Scalars['String']['output']>;
  canSignupAutoPaymentSubscription: Scalars['Boolean']['output'];
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentFare: Scalars['Float']['output'];
  /** 今回だけ使わない場合はtrueになる */
  disableAutoPayment?: Maybe<Scalars['Boolean']['output']>;
  elapsedSeconds?: Maybe<Scalars['Float']['output']>;
  enteredAt?: Maybe<Scalars['DateTime']['output']>;
  exitedAt?: Maybe<Scalars['DateTime']['output']>;
  fixUntil?: Maybe<Scalars['DateTime']['output']>;
  /** this is the amount to chage including the tax */
  fixedFare?: Maybe<Scalars['Float']['output']>;
  fixedTax?: Maybe<Scalars['Float']['output']>;
  fixedTaxRate?: Maybe<Scalars['Float']['output']>;
  hasActiveAutoPaymentSubscription: Scalars['Boolean']['output'];
  hasError: Scalars['Boolean']['output'];
  hasInactiveAutoPaymentSubscription: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  images: Array<ParkEntryImage>;
  large?: Maybe<Scalars['String']['output']>;
  letter?: Maybe<Scalars['String']['output']>;
  paidFare: Scalars['Float']['output'];
  park: Park;
  parkId: Scalars['String']['output'];
  parkingSlot?: Maybe<ParkingSlot>;
  parkingSlotId?: Maybe<Scalars['String']['output']>;
  plateValue?: Maybe<Scalars['String']['output']>;
  referenceNumber: Scalars['String']['output'];
  remainingFare: Scalars['Float']['output'];
  similarParkEntries: Array<ParkEntry>;
  similarRecords: Array<Scalars['String']['output']>;
  small?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  successfulPaymentRequests: Array<PaymentRequest>;
  temporarilyInactiveAutoPaymentSubscription: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['String']['output']>;
  vehicleId?: Maybe<Scalars['String']['output']>;
};

export type ParkEntryEntryMax = {
  city?: InputMaybe<Scalars['String']['input']>;
  enteredAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<InputParkEntryImage>;
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  large?: InputMaybe<Scalars['String']['input']>;
  letter?: InputMaybe<Scalars['String']['input']>;
  parkId: Scalars['String']['input'];
  small?: InputMaybe<Scalars['String']['input']>;
};

export type ParkEntryEntryMini = {
  city?: InputMaybe<Scalars['String']['input']>;
  enteredAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<InputParkEntryImage>;
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  large?: InputMaybe<Scalars['String']['input']>;
  letter?: InputMaybe<Scalars['String']['input']>;
  parkId: Scalars['String']['input'];
  parkingSlotId: Scalars['String']['input'];
  small?: InputMaybe<Scalars['String']['input']>;
};

export type ParkEntryEntrySensor = {
  enteredAt?: InputMaybe<Scalars['DateTime']['input']>;
  parkId: Scalars['String']['input'];
  parkingSlotId: Scalars['String']['input'];
};

export type ParkEntryExitMax = {
  city?: InputMaybe<Scalars['String']['input']>;
  exitedAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<InputParkEntryImage>;
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  large?: InputMaybe<Scalars['String']['input']>;
  letter?: InputMaybe<Scalars['String']['input']>;
  parkId: Scalars['String']['input'];
  small?: InputMaybe<Scalars['String']['input']>;
};

export type ParkEntryExitMini = {
  city?: InputMaybe<Scalars['String']['input']>;
  exitedAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<InputParkEntryImage>;
  imageBase64?: InputMaybe<Scalars['String']['input']>;
  large?: InputMaybe<Scalars['String']['input']>;
  letter?: InputMaybe<Scalars['String']['input']>;
  parkId: Scalars['String']['input'];
  parkingSlotId: Scalars['String']['input'];
  small?: InputMaybe<Scalars['String']['input']>;
};

export type ParkEntryExitSensor = {
  exitedAt?: InputMaybe<Scalars['DateTime']['input']>;
  parkId: Scalars['String']['input'];
  parkingSlotId: Scalars['String']['input'];
};

export type ParkEntryImage = {
  __typename?: 'ParkEntryImage';
  bucket: Scalars['String']['output'];
  eventType: Scalars['String']['output'];
  file: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type ParkEntryList = {
  pageOption?: InputMaybe<PageOption>;
  parkId?: InputMaybe<Scalars['String']['input']>;
  plateValue?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type ParkEntryListKiosk = {
  conditions?: InputMaybe<Array<DynamicQueryCondition>>;
  pageOption?: InputMaybe<PageOption>;
};

export type ParkEntryListResult = {
  __typename?: 'ParkEntryListResult';
  count: Scalars['Float']['output'];
  ids: Array<Scalars['String']['output']>;
  records: Array<ParkEntry>;
};

export type ParkEntryPay = {
  amount: Scalars['Float']['input'];
  autoPaymentContactNumber?: InputMaybe<Scalars['String']['input']>;
  parkEntryId: Scalars['String']['input'];
  paymentMethod: PaymentMethod;
  receiptEmail?: InputMaybe<Scalars['String']['input']>;
  receiptMethod?: InputMaybe<Scalars['String']['input']>;
  receiptSmsNumber?: InputMaybe<Scalars['String']['input']>;
  reenableAutoPayment?: InputMaybe<Scalars['Boolean']['input']>;
  sendReceipt?: InputMaybe<Scalars['Boolean']['input']>;
  signupAutoPayment: Scalars['Boolean']['input'];
};

export type ParkEntrySimilar = {
  __typename?: 'ParkEntrySimilar';
  parkEntry: ParkEntry;
  score: Scalars['Float']['output'];
};

export type ParkEntrySimilarResult = {
  __typename?: 'ParkEntrySimilarResult';
  similarList: Array<ParkEntrySimilar>;
};

export type ParkEntryUpdateUser = {
  disableAutoPayment?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
};

export type ParkPublic = {
  __typename?: 'ParkPublic';
  address: Scalars['String']['output'];
  capacity: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parkingSlots: Array<PublicParkingSlot>;
  priceBlockPark: PriceBlockPark;
};

export type ParkUpdate = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['Float']['input']>;
  hasSlots?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  isAnpr?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  operatorAttribute1?: InputMaybe<Scalars['String']['input']>;
  operatorName?: InputMaybe<Scalars['String']['input']>;
  priceBlockPark?: InputMaybe<PriceBlockParkCreate>;
  shouldDedupe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ParkingSlot = {
  __typename?: 'ParkingSlot';
  createdAt: Scalars['DateTime']['output'];
  currentParkEntry?: Maybe<ParkEntry>;
  deviceId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  occupied: Scalars['Boolean']['output'];
  order?: Maybe<Scalars['Float']['output']>;
  park: Park;
  parkId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ParkingSlotCreate = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Float']['input']>;
  parkId: Scalars['String']['input'];
};

export type ParkingSlotGetUnique = {
  deviceId: Scalars['String']['input'];
};

export type ParkingSlotUpdate = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
};

export type PasswordDetail = {
  newPassword: Scalars['String']['input'];
};

export type PaymentApparatuses = {
  __typename?: 'PaymentApparatuses';
  cardBrand: Scalars['String']['output'];
  cardExpiresAt: Scalars['String']['output'];
  cardLast4Digits: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  paymentTokenId: Scalars['String']['output'];
  transactor: Transactor;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export enum PaymentMethod {
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  JpEmoney = 'JP_EMONEY'
}

export type PaymentRequest = {
  __typename?: 'PaymentRequest';
  /** the total amount to be charged including tax */
  amount: Scalars['Float']['output'];
  /** if auto payment application is made, this is the id  */
  autoPaymentApplicationId?: Maybe<Scalars['String']['output']>;
  /** this is the reference number to this transaction which is known to the main system. This should be equal to the ParkEntry.id if we are charing for the park entries */
  bizReferenceId: Scalars['String']['output'];
  /** like VISA MASTERCARD */
  cardBrand?: Maybe<Scalars['String']['output']>;
  /** card expires at 4 digits like 2412 */
  cardExpiresAt?: Maybe<Scalars['String']['output']>;
  /** last 4 digits of the credit card like 1234 */
  cardLast4Digits?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** the kiosk device that this payment request is going to */
  deviceId: Scalars['String']['output'];
  /** this is supplied as a supplimentary information from the payment backend. No detail will be provide other than enum of CANCELLED, TIMEOUT, UNEXPECTED */
  errorCode?: Maybe<PaymentRequestErrorCode>;
  id: Scalars['String']['output'];
  parkEntry: ParkEntry;
  parkId: Scalars['String']['output'];
  /** enum of credit CREDIT_CARD, JP_EMONEY etc */
  paymentMethod: PaymentMethod;
  /** this ID refers to a collision free token ID that was issued in the payment backend. The payment backend will not return the token itself for the security reason, but it will return the ID to refer to it. */
  paymentTokenId?: Maybe<Scalars['String']['output']>;
  /** this is the reference number to this transaction which is known to the payment transactor. If we have control of this value this, this value should start with bizRefernceId then appended by some brach values */
  pgReferenceId?: Maybe<Scalars['String']['output']>;
  receiptEmail?: Maybe<Scalars['String']['output']>;
  receiptMethod?: Maybe<Scalars['String']['output']>;
  receiptSmsNumber?: Maybe<Scalars['String']['output']>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  reenableAutoPayment?: Maybe<Scalars['Boolean']['output']>;
  referenceNumber: Scalars['String']['output'];
  /** If set to true, the payment will not only process the payment, but it will retail the token for future use. The returned payload will include paymentTokenId */
  retainPaymentToken?: Maybe<Scalars['Boolean']['output']>;
  sendReceipt?: Maybe<Scalars['Boolean']['output']>;
  /** this is enum of PENDING, SUCCESS, FAILED */
  status: PaymentRequestResultStatus;
  /** the date of the transaction that is known to the payment transactor */
  transactionDate?: Maybe<Scalars['DateTime']['output']>;
  transactor: Transactor;
  updatedAt: Scalars['DateTime']['output'];
};

export enum PaymentRequestErrorCode {
  Cancelled = 'CANCELLED',
  Timeout = 'TIMEOUT',
  Unexpected = 'UNEXPECTED'
}

export enum PaymentRequestResultStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type PaymentRequestSubscribe = {
  id: Scalars['String']['input'];
};

export type PaymentRequestUpdate = {
  /** like VISA MASTERCARD */
  cardBrand?: InputMaybe<Scalars['String']['input']>;
  /** card expires at 4 digits like 2412 */
  cardExpiresAt?: InputMaybe<Scalars['String']['input']>;
  /** last 4 digits of the credit card like 1234 */
  cardLast4Digits?: InputMaybe<Scalars['String']['input']>;
  errorCode?: InputMaybe<PaymentRequestErrorCode>;
  id: Scalars['String']['input'];
  paymentTokenId?: InputMaybe<Scalars['String']['input']>;
  pgReferenceId?: InputMaybe<Scalars['String']['input']>;
  status: PaymentRequestResultStatus;
  transactionDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PaymentReuqestList = {
  pageOption?: InputMaybe<PageOption>;
};

export type PointInWeek = {
  __typename?: 'PointInWeek';
  hour: Scalars['Float']['output'];
  minute: Scalars['Float']['output'];
  weekday: Weekday;
};

export type PriceBlock = {
  __typename?: 'PriceBlock';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parkId: Scalars['String']['output'];
  priceCap?: Maybe<Scalars['Float']['output']>;
  priceIncrement: Duration;
  priceIncrementSec: Scalars['Float']['output'];
  timeout?: Maybe<Duration>;
  timeoutSec?: Maybe<Scalars['Float']['output']>;
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PriceBlockCreate = {
  name: Scalars['String']['input'];
  parkId: Scalars['String']['input'];
  priceCap?: InputMaybe<Scalars['Float']['input']>;
  priceIncrement: DurationInput;
  timeout?: InputMaybe<DurationInput>;
  unitPrice: Scalars['Float']['input'];
};

export type PriceBlockInstance = {
  __typename?: 'PriceBlockInstance';
  createdAt: Scalars['DateTime']['output'];
  end: PointInWeek;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parkId: Scalars['String']['output'];
  priceBlockId: Scalars['String']['output'];
  priceCap?: Maybe<Scalars['Float']['output']>;
  priceIncrement: Duration;
  priceIncrementSec: Scalars['Float']['output'];
  start: PointInWeek;
  timeout?: Maybe<Duration>;
  timeoutSec?: Maybe<Scalars['Float']['output']>;
  unitPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PriceBlockInstanceCreate = {
  end: IPointInWeek;
  priceBlockId: Scalars['String']['input'];
  start: IPointInWeek;
};

export type PriceBlockList = {
  parkId: Scalars['String']['input'];
};

export type PriceBlockPark = {
  __typename?: 'PriceBlockPark';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  parkId: Scalars['String']['output'];
  priceBlocks: Array<PriceBlockInstance>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PriceBlockParkCreate = {
  parkId: Scalars['String']['input'];
  priceBlocks: Array<PriceBlockInstanceCreate>;
};

export type PriceBlockUpdate = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  priceCap?: InputMaybe<Scalars['Float']['input']>;
  priceIncrement?: InputMaybe<DurationInput>;
  timeout?: InputMaybe<DurationInput>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type PublicParkEntry = {
  __typename?: 'PublicParkEntry';
  amountStatus: Scalars['String']['output'];
  currentFare: Scalars['Float']['output'];
  elapsedSeconds?: Maybe<Scalars['Float']['output']>;
  enteredAt?: Maybe<Scalars['DateTime']['output']>;
  fixUntil?: Maybe<Scalars['DateTime']['output']>;
  /** this is the amount to chage including the tax */
  fixedFare?: Maybe<Scalars['Float']['output']>;
  fixedTax?: Maybe<Scalars['Float']['output']>;
  fixedTaxRate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  paidFare: Scalars['Float']['output'];
  parkId: Scalars['String']['output'];
  parkingSlotId?: Maybe<Scalars['String']['output']>;
  referenceNumber: Scalars['String']['output'];
  remainingFare: Scalars['Float']['output'];
};

export type PublicParkingSlot = {
  __typename?: 'PublicParkingSlot';
  currentParkEntry?: Maybe<PublicParkEntry>;
  id: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  occupied: Scalars['Boolean']['output'];
  parkId: Scalars['String']['output'];
};

export type PublicPaymentRequest = {
  __typename?: 'PublicPaymentRequest';
  /** the total amount to be charged including tax */
  amount: Scalars['Float']['output'];
  bizReferenceId: Scalars['String']['output'];
  /** like VISA MASTERCARD */
  cardBrand?: Maybe<Scalars['String']['output']>;
  /** card expires at 4 digits like 2412 */
  cardExpiresAt?: Maybe<Scalars['String']['output']>;
  /** last 4 digits of the credit card like 1234 */
  cardLast4Digits?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** enum of credit CREDIT_CARD, JP_EMONEY etc */
  paymentMethod: PaymentMethod;
  receiptEmail?: Maybe<Scalars['String']['output']>;
  receiptMethod?: Maybe<Scalars['String']['output']>;
  receiptSmsNumber?: Maybe<Scalars['String']['output']>;
  referenceNumber: Scalars['String']['output'];
  sendReceipt?: Maybe<Scalars['Boolean']['output']>;
  /** this is enum of PENDING, SUCCESS, FAILED */
  status: PaymentRequestResultStatus;
  transactionDate?: Maybe<Scalars['DateTime']['output']>;
};

export type PublicPaymentRequestUpdate = {
  id: Scalars['String']['input'];
  receiptEmail?: InputMaybe<Scalars['String']['input']>;
  sendReceipt?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** checks if the user exists or not */
  checkUserExists: CheckUserExistsResul;
  closedSales: Array<ClosedSale>;
  getAuthenticatedUrl: AuthenticatedLink;
  getAutoPaymentApplication: AutoPaymentApplication;
  getDeviceConfiguration: DeviceConfiguration;
  getDeviceRegistration: DeviceRegistration;
  getMyAutoPaymentSubscription: AutoPaymentSubscription;
  getMyDeviceRegistration: DeviceRegistrationResult;
  getMyParkEntry: ParkEntry;
  getMyPaymentRequest: PaymentRequest;
  getParkEntry: ParkEntry;
  getParkingSlot: ParkingSlot;
  getParkingSlotUnique?: Maybe<ParkingSlot>;
  getPaymentRequest: PaymentRequest;
  getPublicPark: ParkPublic;
  getPublicParkEntry: PublicParkEntry;
  getVehicle: Vehicle;
  listMyAutoPaymentSubscriptions: Array<AutoPaymentSubscription>;
  listMyPaidParkEntries: Array<ParkEntry>;
  listMyPaymentApparatuses: Array<PaymentApparatuses>;
  listParkEntries: Array<ParkEntry>;
  listParkEntriesErrors: Array<ParkEntry>;
  listParkEntriesPessimisticallySimilar: ParkEntrySimilarResult;
  listParkingSlots?: Maybe<Array<ParkingSlot>>;
  listParks: Array<Park>;
  listSimilarParkEntries: ParkEntrySimilarResult;
  listVehicleUserBindings: Array<VehicleUser>;
  listVehicles: Array<Vehicle>;
  listWhiteListedVehicleParkBindings: Array<WhiteListedVehicleParkBinding>;
  myCameraEvents: Array<CameraEvent>;
  myDeviceRegistrations: Array<DeviceRegistration>;
  myParks: Array<Park>;
  myVehicleUserBinding: VehicleUser;
  myVehicleUserBindings: Array<VehicleUser>;
  park: Park;
  parkEntries: Array<ParkEntry>;
  payableParkEntries: ParkEntryListResult;
  payableParkEntry: ParkEntry;
  paymentRequests: Array<PaymentRequest>;
  priceBlocks: Array<PriceBlock>;
  resourceShares: Array<ResourceShare>;
  searchCity: AutoCompleteSearchResult;
  sharedToMe: Array<ResourceShare>;
};


export type QueryCheckUserExistsArgs = {
  data: CheckUserExists;
};


export type QueryClosedSalesArgs = {
  data: ClosedSaleList;
};


export type QueryGetAuthenticatedUrlArgs = {
  data: InputDetail;
};


export type QueryGetAutoPaymentApplicationArgs = {
  data: InputDetail;
};


export type QueryGetDeviceConfigurationArgs = {
  data: InputDetail;
};


export type QueryGetDeviceRegistrationArgs = {
  data: InputDetail;
};


export type QueryGetMyAutoPaymentSubscriptionArgs = {
  data: InputDetail;
};


export type QueryGetMyParkEntryArgs = {
  data: InputDetail;
};


export type QueryGetMyPaymentRequestArgs = {
  data: InputDetail;
};


export type QueryGetParkEntryArgs = {
  data: InputDetail;
};


export type QueryGetParkingSlotArgs = {
  data: InputDetail;
};


export type QueryGetParkingSlotUniqueArgs = {
  data: ParkingSlotGetUnique;
};


export type QueryGetPaymentRequestArgs = {
  data: InputDetail;
};


export type QueryGetPublicParkArgs = {
  data: InputDetail;
};


export type QueryGetPublicParkEntryArgs = {
  data: InputDetail;
};


export type QueryGetVehicleArgs = {
  data: InputDetail;
};


export type QueryListParkEntriesArgs = {
  data: ParkEntryList;
};


export type QueryListParkEntriesErrorsArgs = {
  data: InputParkEntryError;
};


export type QueryListParkEntriesPessimisticallySimilarArgs = {
  data: ListParkEntriesSimilar;
};


export type QueryListParkingSlotsArgs = {
  data: InputList;
};


export type QueryListParksArgs = {
  data?: InputMaybe<InputList>;
};


export type QueryListSimilarParkEntriesArgs = {
  data: InputParkEntriesListSimilar;
};


export type QueryListVehicleUserBindingsArgs = {
  data?: InputMaybe<InputList>;
};


export type QueryListVehiclesArgs = {
  data?: InputMaybe<InputList>;
};


export type QueryListWhiteListedVehicleParkBindingsArgs = {
  data?: InputMaybe<InputList>;
};


export type QueryMyCameraEventsArgs = {
  data: CameraEventList;
};


export type QueryMyDeviceRegistrationsArgs = {
  data?: InputMaybe<DeviceRegistrationList>;
};


export type QueryMyVehicleUserBindingArgs = {
  data: InputDetail;
};


export type QueryMyVehicleUserBindingsArgs = {
  data?: InputMaybe<InputList>;
};


export type QueryParkArgs = {
  data: ParkDetail;
};


export type QueryParkEntriesArgs = {
  data: ParkEntryList;
};


export type QueryPayableParkEntriesArgs = {
  data?: InputMaybe<ParkEntryListKiosk>;
};


export type QueryPayableParkEntryArgs = {
  data: InputDetail;
};


export type QueryPaymentRequestsArgs = {
  data?: InputMaybe<PaymentReuqestList>;
};


export type QueryPriceBlocksArgs = {
  data: PriceBlockList;
};


export type QueryResourceSharesArgs = {
  data: ResourceShareList;
};


export type QuerySearchCityArgs = {
  data: AutoCompleteSearch;
};


export type QuerySharedToMeArgs = {
  data: ResourceShareList;
};

export type RerunFromCameraEvents = {
  __typename?: 'RerunFromCameraEvents';
  from: Scalars['DateTime']['output'];
  parkId: Scalars['String']['output'];
  to: Scalars['DateTime']['output'];
};

export type ResourceShare = {
  __typename?: 'ResourceShare';
  createdAt: Scalars['DateTime']['output'];
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  owner?: Maybe<User>;
  ownerId: Scalars['String']['output'];
  sharedTo?: Maybe<User>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ResourceShareDelete = {
  id: Scalars['String']['input'];
};

export type ResourceShareList = {
  entityId?: InputMaybe<Scalars['String']['input']>;
  entityType?: InputMaybe<Scalars['String']['input']>;
};

export type SmsSendResult = {
  __typename?: 'SmsSendResult';
  status: Scalars['String']['output'];
};

export type SortOption = {
  sortKey: Scalars['String']['input'];
  sortOrder: SortOrder;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Status = {
  __typename?: 'Status';
  status: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribePaymentRequest: PaymentRequest;
};


export type SubscriptionSubscribePaymentRequestArgs = {
  data: PaymentRequestSubscribe;
};

export enum Transactor {
  Remise = 'REMISE',
  Stripe = 'STRIPE'
}

export type User = {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  uid: Scalars['String']['output'];
};

export type UserAttrDetail = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UserFeedback = {
  __typename?: 'UserFeedback';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  score: Scalars['Float']['output'];
  subjectId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserFeedbackCreate = {
  score: Scalars['Float']['input'];
  subjectId: Scalars['String']['input'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  city: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  large: Scalars['String']['output'];
  letter: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  plateValue: Scalars['String']['output'];
  small: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vehicleUserBindings: Array<VehicleUser>;
  whiteListedVehicleParkBindings: Array<WhiteListedVehicleParkBinding>;
};

export type VehicleCreate = {
  city: Scalars['String']['input'];
  large: Scalars['String']['input'];
  letter: Scalars['String']['input'];
  name: Scalars['String']['input'];
  small: Scalars['String']['input'];
};

export type VehicleUpdate = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type VehicleUser = {
  __typename?: 'VehicleUser';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
  vehicle: Vehicle;
  vehicleId: Scalars['String']['output'];
};

export type VehicleUserCreate = {
  userId: Scalars['String']['input'];
  vehicleId: Scalars['String']['input'];
};

export enum Weekday {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum WhiteListReason {
  Free = 'FREE',
  Subscribed = 'SUBSCRIBED'
}

export type WhiteListedVehicleParkBinding = {
  __typename?: 'WhiteListedVehicleParkBinding';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  park: Park;
  parkId: Scalars['String']['output'];
  plateValue: Scalars['String']['output'];
  reason: WhiteListReason;
  updatedAt: Scalars['DateTime']['output'];
  vehicle: Vehicle;
  vehicleId: Scalars['String']['output'];
};

export type WhiteListedVehicleParkBindingCreate = {
  parkId: Scalars['String']['input'];
  reason: WhiteListReason;
  vehicleId: Scalars['String']['input'];
};

export type GetPublicParkQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPublicParkQuery = { __typename?: 'Query', getPublicPark: { __typename?: 'ParkPublic', name: string, parkingSlots: Array<{ __typename?: 'PublicParkingSlot', id: string, name: string, occupied: boolean, currentParkEntry?: { __typename?: 'PublicParkEntry', id: string } | null }> } };

export type GetPublicParkEntryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetPublicParkEntryQuery = { __typename?: 'Query', getPublicParkEntry: { __typename?: 'PublicParkEntry', id: string, remainingFare: number, elapsedSeconds?: number | null, enteredAt?: any | null } };

export type PublicPayParkEntryMutationVariables = Exact<{
  data: InstantCreatePaymentIntent;
}>;


export type PublicPayParkEntryMutation = { __typename?: 'Mutation', publicPayParkEntry?: { __typename?: 'InstantCreatePaymentIntentReesult', clientSecret: string, parkEntry: { __typename?: 'PublicParkEntry', id: string, remainingFare: number, elapsedSeconds?: number | null, enteredAt?: any | null }, paymentRequest: { __typename?: 'PublicPaymentRequest', id: string, referenceNumber: string, amount: number, paymentMethod: PaymentMethod } } | null };

export type UpdatePublicPaymentRequestMutationVariables = Exact<{
  data: PublicPaymentRequestUpdate;
}>;


export type UpdatePublicPaymentRequestMutation = { __typename?: 'Mutation', updatePublicPaymentRequest: { __typename?: 'PublicPaymentRequest', id: string, receiptEmail?: string | null, sendReceipt?: boolean | null } };

export type ConfirmPublicPaymentMutationVariables = Exact<{
  data: InstanceConfirmPaymentIntent;
}>;


export type ConfirmPublicPaymentMutation = { __typename?: 'Mutation', confirmPublicPayment: { __typename?: 'PublicPaymentRequest', amount: number, transactionDate?: any | null, referenceNumber: string, sendReceipt?: boolean | null } };


export const GetPublicParkDoc = gql`
    query getPublicPark($id: String!) {
  getPublicPark(data: {id: $id}) {
    name
    parkingSlots {
      id
      name
      occupied
      currentParkEntry {
        id
      }
    }
  }
}
    `;
export const GetPublicParkEntryDoc = gql`
    query getPublicParkEntry($id: String!) {
  getPublicParkEntry(data: {id: $id}) {
    id
    remainingFare
    elapsedSeconds
    enteredAt
  }
}
    `;
export const PublicPayParkEntryDoc = gql`
    mutation publicPayParkEntry($data: InstantCreatePaymentIntent!) {
  publicPayParkEntry(data: $data) {
    clientSecret
    parkEntry {
      id
      remainingFare
      elapsedSeconds
      enteredAt
    }
    paymentRequest {
      id
      referenceNumber
      amount
      paymentMethod
    }
  }
}
    `;
export const UpdatePublicPaymentRequestDoc = gql`
    mutation updatePublicPaymentRequest($data: PublicPaymentRequestUpdate!) {
  updatePublicPaymentRequest(data: $data) {
    id
    receiptEmail
    sendReceipt
  }
}
    `;
export const ConfirmPublicPaymentDoc = gql`
    mutation confirmPublicPayment($data: InstanceConfirmPaymentIntent!) {
  confirmPublicPayment(data: $data) {
    amount
    transactionDate
    referenceNumber
    sendReceipt
  }
}
    `;
export const getPublicPark = (
            options: Omit<
              WatchQueryOptions<GetPublicParkQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetPublicParkQuery> & {
              query: ObservableQuery<
                GetPublicParkQuery,
                GetPublicParkQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetPublicParkDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetPublicParkQuery> & {
                query: ObservableQuery<
                  GetPublicParkQuery,
                  GetPublicParkQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getPublicParkEntry = (
            options: Omit<
              WatchQueryOptions<GetPublicParkEntryQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetPublicParkEntryQuery> & {
              query: ObservableQuery<
                GetPublicParkEntryQuery,
                GetPublicParkEntryQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetPublicParkEntryDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetPublicParkEntryQuery> & {
                query: ObservableQuery<
                  GetPublicParkEntryQuery,
                  GetPublicParkEntryQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const publicPayParkEntry = (
            options: Omit<
              MutationOptions<any, PublicPayParkEntryMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<PublicPayParkEntryMutation, PublicPayParkEntryMutationVariables>({
              mutation: PublicPayParkEntryDoc,
              ...options,
            });
            return m;
          }
export const updatePublicPaymentRequest = (
            options: Omit<
              MutationOptions<any, UpdatePublicPaymentRequestMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<UpdatePublicPaymentRequestMutation, UpdatePublicPaymentRequestMutationVariables>({
              mutation: UpdatePublicPaymentRequestDoc,
              ...options,
            });
            return m;
          }
export const confirmPublicPayment = (
            options: Omit<
              MutationOptions<any, ConfirmPublicPaymentMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<ConfirmPublicPaymentMutation, ConfirmPublicPaymentMutationVariables>({
              mutation: ConfirmPublicPaymentDoc,
              ...options,
            });
            return m;
          }