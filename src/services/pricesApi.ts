import { api } from "./authApi";

export type ServicePriceItem = {
  _id?: string;
  serviceKey: string; // e.g., "wash-dry-fold"
  key: string; // e.g., "small"
  name: string;
  subtitle?: string;
  unitPrice?: number; // use when single price
  currency?: string;
  displayPrice?: string; // e.g., "₵65–₵95"
  active?: boolean;
  sortOrder?: number;
  image?: string;
};

export async function getPrices(serviceKey: string): Promise<ServicePriceItem[]> {
  const res = await api.get(`/prices/${serviceKey}`);
  return res.data as ServicePriceItem[];
}

export type AllPricingResponse = {
  summaries: Array<{ serviceKey: string; priceLabel?: string; count: number }>;
  grouped: Record<string, ServicePriceItem[]>;
};

export async function getAllPricing(): Promise<AllPricingResponse> {
  const res = await api.get(`/pricing`);
  return res.data as AllPricingResponse;
}

export async function createPrice(item: ServicePriceItem): Promise<ServicePriceItem> {
  const res = await api.post(`/admin/prices`, item);
  return res.data as ServicePriceItem;
}

export async function updatePrice(id: string, item: Partial<ServicePriceItem>): Promise<ServicePriceItem> {
  const res = await api.put(`/admin/prices/${id}`, item);
  return res.data as ServicePriceItem;
}

export async function deletePrice(id: string): Promise<void> {
  await api.delete(`/admin/prices/${id}`);
}


