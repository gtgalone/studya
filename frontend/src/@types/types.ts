export interface Parcel {}

export interface OwnershipItem {
  id: number
  name: string
  type: string
  is_residence: boolean
  residence_address: string
  residence_pnu: string
  ho_name: string
  total_value: number
  real_estate_count: number
}

export interface Ownership {
  dong_name: string
  data: OwnershipItem[]
  total_count: number
}

export interface GrossProfitCaseItem {
  id: number
  address: string
  purchased_price: number
  purchased_price_per_pyeong: number
  date_purchased: string
  sold_price: number
  sold_price_per_pyeong: number
  date_sold: string
  gross_profit: number
  time_period: string
}

export interface GrossProfitCase {
  dong_name: string
  data: GrossProfitCaseItem[]
  total_count: number
}

export interface EntitiesState {
  parcels: Record<string, Parcel>
}

export interface UserState {
  id: string
  email: string
  username: string
  organization: string
  phone: string
  token: string
  is_confirmed: boolean
}

export interface ThemeState {
  bgPrimary: string
  bgSecondary: string
  logoPath: string
  logoSmallPath: string
  isShowFilterPercents: boolean
  isOpenNotice: boolean
  isAutofocusLogin: boolean
  isOpenFilter: boolean
  isDisplayRadius: boolean
  isDisplayRadiusDevelopment: boolean
  isMapTypeDistrict: boolean
  isShowListView: boolean
  defaultLatitude: number
  defaultLongitude: number
  defaultZoomLevel: number
  parcelSearchPath: string
  preventFilter: string
  mapFilterPath: string
}

export interface RootState {
  user: UserState
  entities: EntitiesState
  form: any
  errorMessage: string
  loading: boolean
  currentParcel: string
  currentPosition: string[]
  selectedParcel: string
  isDistrict: boolean
  routeChange: boolean
  authModal: boolean
  filter: FilterState
  isFilter: boolean
  isEstimatedPrice: boolean
  isDevelopmentCase: boolean
  isDevelopmentCaseSafety: boolean
  isWindows: boolean
  theme: ThemeState
  authModalType: string
  mapType: string
  feedbackModal: boolean
}

export interface GeometryState {
  type: string
  coordinates: any[]
}

export interface OwnershipState {

}

export interface ErrorMessageState {

}

export interface FilterState {
  area?: number[]
  estimatedPrice?: number[]
  unitPrice?: number[]
  age?: number[]
  ownType?: string[]
  mainUse?: string[]
  landuse?: string[]
  nearDev?: number[]
  areaSafety?: number[]
  gfAreaSafety?: number[]
  ageSafety?: number[]
  nearDevSafety?: number[]
  floor?: number[]
  structure?: string[]
  maintenanceArea?: string
}

export interface ParcelPolygonState {
  id: string
  address: string
  road_address: string
  geometry: GeometryState
}

export interface LinksState {
  sigungu: string[]
  luris: string[]
  sido: string[]
}

export interface PlanState {
  name: string
  links: LinksState
}

export interface ProfitScenarioState {
  totalCost: number,
  totalPrice: number,
  yearlyRentRatio: number,
  monthlyRent: number,
  totalConstCost: number,
  propertyCost: number,
  constCost: number,
  perAreaPrice: number,
  perAreaRent: number
}
