import test from "node:test";
import assert from "node:assert/strict";
import { calculatePrice } from "./pricing";

const base = { width: 5, height: 5, material: "Standard Vinyl" as const, finish: "Glossy" as const, quantity: 10 };
test("applies the minimum custom order price", () => assert.equal(calculatePrice(base).total, 900));
test("applies a higher volume discount", () => { const result = calculatePrice({ ...base, quantity: 100 }); assert.equal(result.discountPercentage, 15); assert.ok(result.discount > 0); });
test("rejects unusable dimensions", () => assert.throws(() => calculatePrice({ ...base, width: 0 })));
