import type { AdvisoryMessage, DiagnosisResult, UserProfile } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(
    message: string,
    status: number,
    code?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export class ApiUnavailableError extends Error {
  constructor(message = 'The service is currently unavailable.') {
    super(message);
    this.name = 'ApiUnavailableError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function request<T>(path: string, body?: unknown): Promise<T> {
  let response: Response;
  try {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: body === undefined || isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined
        ? undefined
        : isFormData
          ? body
          : JSON.stringify(body)
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new ApiUnavailableError('Could not connect to the service. Check your connection and retry.');
    }
    throw error;
  }

  let payload: unknown = {};
  if (response.status !== 204) {
    try {
      payload = await response.json();
    } catch (error) {
      if (response.ok) {
        throw new ApiError('The service returned an invalid response.', response.status, 'INVALID_RESPONSE');
      }
      if (!(error instanceof SyntaxError)) throw error;
    }
  }

  if (!response.ok) {
    const record = isRecord(payload) ? payload : {};
    const message = typeof record.error === 'string'
      ? record.error
      : `Request failed (${response.status}).`;
    const code = typeof record.code === 'string' ? record.code : undefined;
    if (response.status === 404) {
      throw new ApiUnavailableError(message);
    }
    throw new ApiError(message, response.status, code);
  }

  if (response.status === 204) return undefined as T;
  if (isRecord(payload)) {
    if ('data' in payload) return payload.data as T;
    if ('user' in payload) return payload.user as T;
  }
  return payload as T;
}

export interface SignupRequest {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  farmState: string;
  farmLga: string;
  selectedPlan: 'free' | 'premium';
}

export type OtpPurpose = 'signup' | 'password_reset';

export interface OtpRequest {
  phone: string;
  purpose: OtpPurpose;
}

export interface OtpRequestResponse {
  message: string;
  expiresInSeconds?: number;
}

export interface OtpVerificationRequest extends OtpRequest {
  code: string;
}

export interface LoginResponse extends UserProfile {}

export interface WalletResponse {
  balance: number;
  currency: 'credits';
}

export interface WalletTransaction {
  id: string;
  reference?: string;
  type: 'credit' | 'debit';
  amount: number;
  credits: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  description: string;
}

export interface WalletTransactionsResponse {
  transactions: WalletTransaction[];
}

export interface PaymentInitializeRequest {
  amountNaira: number;
  email?: string;
}

export interface PaymentInitializeResponse {
  checkoutUrl?: string;
  reference?: string;
  amountKobo?: number;
  email?: string;
  currency?: 'NGN';
}

export interface DiagnosisRequest {
  cropId: string;
  image: File | string;
  symptoms: string[];
  imageStats?: DiagnosisResult['imageStats'];
  locationState: string;
}

export interface AdvisoryRequest {
  message: string;
  language: string;
}

export const signup = (data: SignupRequest): Promise<void> =>
  request<void>('/auth/signup', data);

export const login = (phone: string, password: string): Promise<LoginResponse> =>
  request<LoginResponse>('/auth/login', { phone, password });

export const requestOtp = (data: OtpRequest): Promise<OtpRequestResponse> =>
  request<OtpRequestResponse>('/auth/otp/request', data);

export const verifySignupOtp = (
  data: OtpVerificationRequest
): Promise<LoginResponse> => request<LoginResponse>('/auth/otp/verify', data);

export const resetPassword = (
  data: OtpVerificationRequest & { newPassword: string }
): Promise<void> => request<void>('/auth/password/reset', data);

export const getWallet = (): Promise<WalletResponse> =>
  request<WalletResponse>('/wallet');

export const getWalletTransactions = (): Promise<WalletTransactionsResponse> =>
  request<WalletTransactionsResponse>('/wallet/transactions');

export const initializePayment = (
  data: PaymentInitializeRequest
): Promise<PaymentInitializeResponse> =>
  request<PaymentInitializeResponse>('/payments/initialize', data);

export const analyzeDiagnosis = (data: DiagnosisRequest): Promise<DiagnosisResult> => {
  const form = new FormData();
  form.append('cropId', data.cropId);
  form.append('symptoms', JSON.stringify(data.symptoms));
  form.append('locationState', data.locationState);
  form.append('imageStats', JSON.stringify(data.imageStats || {}));
  if (data.image instanceof File && data.image.size > 0) {
    form.append('image', data.image);
  } else {
    form.append('imageUrl', String(data.image));
  }
  return request<DiagnosisResult>('/diagnosis/analyze', form);
};

export const sendAdvisoryMessage = (data: AdvisoryRequest): Promise<AdvisoryMessage> =>
  request<AdvisoryMessage>('/advisory/chat', data);
