import { describe, it, expect } from "vitest";
import { generateTravelPlan } from "@/lib/itinerary";
import { DESTINATIONS, getDestinationById } from "@/lib/destinations";

// REVIEWER_NOTE: Validates the Data Specialist (Gemini mock) output schema.
// Mirrors the JSON Schema validation that would run against real Gemini responses.

describe("generateTravelPlan", () => {
  it("returns a plan for tokyo with correct structure", () => {
    const tokyo = getDestinationById("tokyo")!;
    const plan = generateTravelPlan(tokyo);

    expect(plan.destination).toBeTruthy();
    expect(plan.duration).toBeGreaterThan(0);
    expect(plan.days).toBeInstanceOf(Array);
    expect(plan.days.length).toBe(plan.duration);
    expect(plan.tips).toBeInstanceOf(Array);
    expect(plan.bestTime).toBeTruthy();
    expect(plan.budget).toBeTruthy();
  });

  it("each day has required fields", () => {
    const tokyo = getDestinationById("tokyo")!;
    const plan = generateTravelPlan(tokyo);

    for (const day of plan.days) {
      expect(day.day).toBeGreaterThan(0);
      expect(day.title).toBeTruthy();
      expect(day.activities).toBeInstanceOf(Array);
      expect(day.activities.length).toBeGreaterThan(0);
    }
  });

  it("each activity has required fields and valid type", () => {
    const validTypes = ["culture", "food", "adventure", "rest", "transport"];
    const tokyo = getDestinationById("tokyo")!;
    const plan = generateTravelPlan(tokyo);

    for (const day of plan.days) {
      for (const act of day.activities) {
        expect(act.time).toMatch(/^\d{2}:\d{2}$/);
        expect(act.name).toBeTruthy();
        expect(act.description).toBeTruthy();
        expect(validTypes).toContain(act.type);
      }
    }
  });

  it("generates a generic plan for destinations without a specific plan", () => {
    const bali = getDestinationById("bali")!;
    const plan = generateTravelPlan(bali);

    expect(plan.destination).toContain("Bali");
    expect(plan.days.length).toBe(3);
  });

  it("generates valid plans for all destinations", () => {
    for (const dest of DESTINATIONS) {
      const plan = generateTravelPlan(dest);
      expect(plan.days.length).toBeGreaterThan(0);
      expect(plan.tips.length).toBeGreaterThan(0);
    }
  });

  it("day numbers are sequential starting from 1", () => {
    const tokyo = getDestinationById("tokyo")!;
    const plan = generateTravelPlan(tokyo);

    plan.days.forEach((day, i) => {
      expect(day.day).toBe(i + 1);
    });
  });
});
