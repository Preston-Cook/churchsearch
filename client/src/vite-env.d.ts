/// <reference types="vite/client" />

interface CarouselItemProps {
  id: string;
  name: string;
  city: string;
  state: string;
  image: string;
  isProfile: boolean;
}

interface CarouselArrowProps {
  currentSlide?: number;
  slideCount?: number;

  // eslint-disable-next-line
  // @ts-ignore
  props?: any[]; // eslint-disable-line
}

interface PastorCardProps {
  name: string;
  description: string;
  image: string;
}

interface AddChurchAction {
  request: Request;
}

interface AddChurchErrors {
  name?: string | undefined;
  email?: string | undefined;
  church?: string | undefined;
  message?: string | undefined;
  api?: string | undefined;
}

interface FeaturedChurch {
  _id: string;
  name: string;
  city: string;
  state: string;
  images: string[];
}

interface FeaturedChurches {
  data: FeaturedChurch[];
}

interface FeedbackAction {
  request: Request;
}

interface FeedbackErrors {
  api?: string | undefined;
  empty?: string | undefined;
  email?: string | undefined;
}

interface ContactAction {
  request: Request;
}

interface ContactErrors {
  name?: string | undefined;
  email?: string | undefined;
  subject?: string | undefined;
  message?: string | undefined;
  email?: string | undefined;
  api?: string | undefined;
}

interface LoginAction {
  request: Request;
}

interface SignUpAction {
  request: Request;
}

interface ForgotPasswordAction {
  request: Request;
}

interface ResetPasswordAction {
  request: Request;
}

interface ResetPasswordErrors {
  password?: string | undefined;
  confirmation?: string | undefined;
  api?: string | undefined;
}

interface ForgotPasswordErrors {
  email?: string | undefined;
  api?: string | undefined;
}

interface SignUpErrors {
  email?: string | undefined;
  first?: string | undefined;
  last?: string | undefined;
  password?: string | undefined;
  confirmation?: string | undefined;
  api?: string | undefined;
}

interface LoginErrors {
  email?: string | undefined;
  password?: string | undefined;
  api?: string | undefined;
}

interface LoginUser {
  status: string;
  first: string;
  last: string;
  email: string;
  accessToken: string;
}

interface HomeAction {
  request: Request;
}

interface LoaderParams {
  // eslint-disable-next-line
  // @ts-ignore
  params: any; // eslint-disable-line
  request: Request;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface AuthState {
  email: string | null;
  accessToken: string | null;
  id: string | null;
}

interface ServiceTime {
  _id: string;
  day: string;
  hour: string;
  minute: string;
  category: string | undefined;
}

interface Church {
  _id: string;
  name: string;
  pastorName: string;
  pastorBio: string;
  pastorImage: string;
  denomination: string[] | undefined;
  images: string[] | undefined;
  attendance: string;
  vibe: string;
  serviceTimes: ServiceTime[];
  ministry: string[] | undefined;
  preaching: string[];
  worship: string;
  location: {
    type: string;
    coordinates: number[];
  };
  street: string;
  city: string;
  state: string;
  zip: string;
  serviceOpportunities: boolean;
  missionTrips: boolean;
  counseling: boolean;
  featured: boolean;
  testimonials: Testimonial[];
  preferredContact: string | null;
  contactType: string;
}

interface ChurchCardProps {
  distance: number;
  id: string;
  name: string;
  city: string;
  state: string;
  image: string;
  denomination: string[];
  vibe: string;
  preaching: string[];
  worship: string;
  ministry: string[];
  lat: number;
  lng: number;
  serviceOpportunities: boolean;
  missionTrips: boolean;
  counseling: boolean;
  attendance: string;
}

interface ChurchDetailsProps {
  lat: number;
  lng: number;
  denomination: string[];
  vibe: string;
  preaching: string[];
  worship: string;
  ministry: string[];
  serviceOpportunities: boolean;
  missionTrips: boolean;
  counseling: boolean;
  attendance: string;
  state: string;
  street: string;
  city: string;
  zip: string;
  children: React.ReactNode;
}

interface FilterMenuProps {
  open: boolean;
  onOpen(): void;
}

interface ChurchHeaderProps {
  id: string;
  name: string;
  images: string[];
  city: string;
  state: string;
  street: string;
  zip: string;
}

interface Testimonial {
  _id: string | undefined;
  id: string | undefined;
  name: string;
  denomination: string;
  worship: string;
  preaching: string;
  community: string;
}

interface TestimonialItemsProps {
  name: string;
  subject: string;
  text: string;
}

interface ConnectAction {
  request: Request;
}

interface ConnectProps {
  contactType: string;
  preferredContact: string;
}

interface User {
  first: string | null;
  last: string | null;
  email: string | null;
  accessToken: string | null;
}

interface AuthContext {
  first: string | null;
  last: string | null;
  email: string | null;
  roles: string[] | null;
  accessToken: string | null;
  login(
    first: string,
    last: string,
    accessToken: string,
    email: string,
    roles: string[]
  ): void;
  logout(): void;
}

interface ContextProvider {
  children: React.ReactNode;
}

enum AuthReducerActionType {
  LOGIN_USER,
  LOGOUT_USER,
}

interface AuthContextReducerPayload {
  first: string;
  last: string;
  email: string;
  accessToken: string;
}

interface AuthContextReducerAction {
  type: AuthReducerActionType;
  payload?: AuthContextReducerPayload;
}

interface Coordinates {
  lat: number;
  lng: number;
}

type SearchLoaderData = [Church[], Coordinates];

interface ConnectErrors {
  api?: string | undefined;
}

interface ServiceTimeInputProps {
  id: number;
  day;
  hour;
  minute;
  onDelete(e: num): void;
  onChange(id: number, field: string, newVal: string | number): void;
}

interface ServiceTimeInput {
  id: number;
  day: string;
  hour: number | undefined;
  minute: number | undefined;
}

interface EditServiceTimeInput {
  _id: string;
  day: string;
  hour: number | undefined;
  minute: number | undefined;
}

interface CreateChurchErrors {
  name: string | undefined;
  pastorName: string | undefined;
  pastorBio: string | undefined;
  pastorImage: string | undefined;
  street: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zip: string | undefined;
  churchImages: string | undefined;
  denomination: string | undefined;
  attendance: string | undefined;
  vibe: string | undefined;
  ministry: string | undefined;
  preaching: string | undefined;
  worship: string | undefined;
  preferredContact: string | undefined;
  contactType: string | undefined;
  serviceTimes: string | undefined;
  api: string | undefined;
}

interface ServiceTimeJSON {
  day: string;
  hour: number;
  minute: number;
}

interface TestimonialInputProps {
  testimonials: Testimonial[] | undefined;
  onSaveTestimonial(): void;
  onAddTestimonial(): void;
  onDeleteTestimonial(id: string): void;
  onUpdateTestimonial(id: string, field: string, newVal: string): void;
  isSubmitting: boolean;
  successMsg: string | undefined;
}
