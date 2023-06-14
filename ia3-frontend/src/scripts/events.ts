import { ref } from "vue";

export const getEvents = async (): Promise<trafficEvent[]> => {
  const response = await fetch("/api/events");
  const data = await response.json();
  return data;
};

export interface trafficEvent {
  id: number;
  area_alert: boolean;
  status: string;
  source: {
    provided_by: string;
    provided_by_url: string;
  };
  url: string;
  image: null | string;
  event_type: string;
  event_subtype: string;
  event_due_to: unknown;
  impact: {
    direction: string;
    towards: string;
    impact_type: string;
    impact_subtype: unknown;
    delay: string;
  };
  duration: {
    start: string;
    end: string;
    active_days: string;
    recurrences: string;
  };
  event_priority: string;
  description: string;
  advice: string;
  information: null;
  road_summary: {
    road_name: string;
    locality: string;
    postcode: number;
    local_government_area: string;
    district: string;
  };
  last_updated: string;
  next_inspection: string;
  web_link: string;
  alert_message: string;
}
