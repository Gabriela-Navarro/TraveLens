export interface Destination {
  id: string;
  title: string;
  location: string;
  country: string;
  tags: string[];
  imageUrl: string;
  thumbUrl: string;
  smallUrl: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Activity {
  time: string;
  name: string;
  description: string;
  type: "culture" | "food" | "adventure" | "rest" | "transport";
}

export interface TravelPlan {
  destination: string;
  duration: number;
  days: ItineraryDay[];
  tips: string[];
  bestTime: string;
  budget: string;
}
