import { describe, it, expect } from "vitest";
import {
  DESTINATIONS,
  searchDestinations,
  getDestinationById,
  getRelatedDestinations,
} from "@/lib/destinations";

// REVIEWER_NOTE: Unit tests for the data service layer (Backend Role output).
// These run without a browser — pure logic validation.

describe("DESTINATIONS data", () => {
  it("should have at least 5 destinations", () => {
    expect(DESTINATIONS.length).toBeGreaterThanOrEqual(5);
  });

  it("every destination should have required fields", () => {
    for (const dest of DESTINATIONS) {
      expect(dest.id).toBeTruthy();
      expect(dest.title).toBeTruthy();
      expect(dest.location).toBeTruthy();
      expect(dest.country).toBeTruthy();
      expect(dest.tags).toBeInstanceOf(Array);
      expect(dest.tags.length).toBeGreaterThan(0);
      expect(dest.imageUrl).toBeTruthy();
      expect(dest.smallUrl).toBeTruthy();
      expect(dest.thumbUrl).toBeTruthy();
    }
  });

  it("every destination id should be unique", () => {
    const ids = DESTINATIONS.map((d) => d.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

describe("searchDestinations", () => {
  it("returns all destinations when query is empty", () => {
    expect(searchDestinations("").length).toBe(DESTINATIONS.length);
  });

  it("returns all destinations when query is whitespace", () => {
    expect(searchDestinations("   ").length).toBe(DESTINATIONS.length);
  });

  it("filters by location name (case insensitive)", () => {
    const results = searchDestinations("tokio");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((d) => d.id === "tokyo")).toBe(true);
  });

  it("filters by country name", () => {
    const results = searchDestinations("japón");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((d) => d.country === "Japón")).toBe(true);
  });

  it("filters by tag", () => {
    const results = searchDestinations("playa");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((d) => d.tags.includes("playa"))).toBe(true);
  });

  it("returns empty array for no matches", () => {
    const results = searchDestinations("destino_que_no_existe_xyz");
    expect(results.length).toBe(0);
  });

  it("filters by partial title match", () => {
    const results = searchDestinations("París");
    expect(results.some((d) => d.id === "paris")).toBe(true);
  });
});

describe("getDestinationById", () => {
  it("returns the correct destination", () => {
    const dest = getDestinationById("tokyo");
    expect(dest).toBeDefined();
    expect(dest?.id).toBe("tokyo");
    expect(dest?.location).toBe("Tokio");
  });

  it("returns undefined for unknown id", () => {
    const dest = getDestinationById("nonexistent-id");
    expect(dest).toBeUndefined();
  });
});

describe("getRelatedDestinations", () => {
  it("does not include the destination itself", () => {
    const tokyo = getDestinationById("tokyo")!;
    const related = getRelatedDestinations(tokyo);
    expect(related.every((d) => d.id !== "tokyo")).toBe(true);
  });

  it("respects the limit parameter", () => {
    const tokyo = getDestinationById("tokyo")!;
    const related = getRelatedDestinations(tokyo, 2);
    expect(related.length).toBeLessThanOrEqual(2);
  });

  it("returns destinations sharing at least one tag", () => {
    const tokyo = getDestinationById("tokyo")!;
    const related = getRelatedDestinations(tokyo);
    for (const dest of related) {
      const sharedTags = dest.tags.filter((t) => tokyo.tags.includes(t));
      expect(sharedTags.length).toBeGreaterThan(0);
    }
  });
});
