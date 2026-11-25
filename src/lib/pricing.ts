import { pricingConfig } from "@/data/pricing-config";

export type ProductionOptions = { width: number; height: number; material: keyof typeof pricingConfig.materialMultipliers; finish: keyof typeof pricingConfig.finishSurcharges; quantity: number };
export type PriceBreakdown = { area: number; subtotal: number; discount: number; total: number; unitPrice: number; discountPercentage: number };

export function calculatePrice(options: ProductionOptions): PriceBreakdown {
  if (!Number.isFinite(options.width) || !Number.isFinite(options.height) || !Number.isFinite(options.quantity) || options.width < 2 || options.height < 2 || options.width > 30 || options.height > 30 || options.quantity < 1) throw new Error("Please enter valid dimensions and quantity.");
  const area = options.width * options.height;
  const base = pricingConfig.setupFee + area * pricingConfig.pricePerSquareCm * options.quantity;
  const subtotal = base * pricingConfig.materialMultipliers[options.material] + options.quantity * pricingConfig.finishSurcharges[options.finish];
  const discountRule = pricingConfig.quantityDiscounts.find((rule) => options.quantity >= rule.minimumQuantity);
  const discountPercentage = discountRule?.discountPercentage ?? 0;
  const discount = subtotal * (discountPercentage / 100);
  const total = Math.max(pricingConfig.minimumOrderPrice, subtotal - discount);
  return { area, subtotal, discount, total, unitPrice: total / options.quantity, discountPercentage };
}

export const money = (value: number) => new Intl.NumberFormat("fr-DZ", { style: "currency", currency: pricingConfig.currency, maximumFractionDigits: 0 }).format(value);
