import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DestinationCard } from "@/components/DestinationCard";
import { DESTINATIONS } from "@/lib/destinations";

// REVIEWER_NOTE: Component tests validate the Frontend Role output.
// We mock next/image to avoid SSR complexity in the test environment.
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    const { src, alt, ...rest } = props as { src: string; alt: string };
    return <img src={src as string} alt={alt as string} {...rest} />;
  },
}));

const mockDest = DESTINATIONS[0];

describe("DestinationCard", () => {
  it("renders destination title", () => {
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={false}
        onSelect={vi.fn()}
        onFavorite={vi.fn()}
      />
    );
    expect(screen.getByText(mockDest.title)).toBeInTheDocument();
  });

  it("renders location and country", () => {
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={false}
        onSelect={vi.fn()}
        onFavorite={vi.fn()}
      />
    );
    expect(screen.getByText(`${mockDest.location}, ${mockDest.country}`)).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={false}
        onSelect={vi.fn()}
        onFavorite={vi.fn()}
      />
    );
    const tags = screen.getAllByText(mockDest.tags[0]);
    expect(tags.length).toBeGreaterThan(0);
  });

  it("calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={false}
        onSelect={onSelect}
        onFavorite={vi.fn()}
      />
    );
    fireEvent.click(screen.getByTestId("destination-card"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("calls onFavorite when heart button clicked", () => {
    const onFavorite = vi.fn();
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={false}
        onSelect={vi.fn()}
        onFavorite={onFavorite}
      />
    );
    fireEvent.click(screen.getByTestId("favorite-button"));
    expect(onFavorite).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onSelect when favorite button is clicked", () => {
    const onSelect = vi.fn();
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={false}
        onSelect={onSelect}
        onFavorite={vi.fn()}
      />
    );
    fireEvent.click(screen.getByTestId("favorite-button"));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("has accessible aria-label", () => {
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={false}
        onSelect={vi.fn()}
        onFavorite={vi.fn()}
      />
    );
    expect(screen.getByRole("button", { name: `Ver ${mockDest.title}` })).toBeInTheDocument();
  });

  it("shows correct aria-label for favorite button when not favorited", () => {
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={false}
        onSelect={vi.fn()}
        onFavorite={vi.fn()}
      />
    );
    expect(screen.getByLabelText("Guardar en favoritos")).toBeInTheDocument();
  });

  it("shows correct aria-label for favorite button when favorited", () => {
    render(
      <DestinationCard
        destination={mockDest}
        isFavorite={true}
        onSelect={vi.fn()}
        onFavorite={vi.fn()}
      />
    );
    expect(screen.getByLabelText("Quitar de favoritos")).toBeInTheDocument();
  });
});
