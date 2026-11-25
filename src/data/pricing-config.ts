export const pricingConfig = {
  currency: "DZD", setupFee: 320, pricePerSquareCm: 2, minimumOrderPrice: 900,
  materialMultipliers: { "Standard Vinyl": 1, "Glossy Vinyl": 1.12, "Matte Vinyl": 1.08, "Transparent Vinyl": 1.22 },
  finishSurcharges: { Glossy: 0, Matte: 5, Holographic: 24 },
  quantityDiscounts: [
    { minimumQuantity: 250, discountPercentage: 20 }, { minimumQuantity: 100, discountPercentage: 15 },
    { minimumQuantity: 50, discountPercentage: 10 }, { minimumQuantity: 25, discountPercentage: 5 },
  ],
} as const;
