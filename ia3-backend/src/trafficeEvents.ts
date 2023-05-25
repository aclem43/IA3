export const processEventData = (data: trafficeEventRaw[]): trafficeEvent[] => {
  const trafficeEvents: trafficeEvent[] = [];
  data.forEach((feature) => {
    const trafficeEvent: trafficeEvent = {
      id: feature.properties.id,
      area_alert: feature.properties.area_alert,
      status: feature.properties.status,
      source: {
        provided_by: feature.properties.source.provided_by,
        provided_by_url: feature.properties.source.provided_by_url,
      },
      url: feature.properties.url,
      image: feature.properties.image,
      event_type: feature.properties.event_type,
      event_subtype: feature.properties.event_subtype,
      event_due_to: feature.properties.event_due_to,
      impact: {
        direction: feature.properties.impact.direction,
        towards: feature.properties.impact.towards,
        impact_type: feature.properties.impact.impact_type,
        impact_subtype: feature.properties.impact.impact_subtype,
        delay: feature.properties.impact.delay,
      },
      duration: {
        start: feature.properties.duration.start,
        end: feature.properties.duration.end,

        active_days: feature.properties.duration.active_days,
        recurrences: feature.properties.duration.recurrences,
      },
      event_priority: feature.properties.event_priority,
      description: feature.properties.description,
      advice: feature.properties.advice,
      information: feature.properties.information,
      road_summary: {
        road_name: feature.properties.road_summary.road_name,
        locality: feature.properties.road_summary.locality,
        postcode: feature.properties.road_summary.postcode,
        local_government_area:
          feature.properties.road_summary.local_government_area,
        district: feature.properties.road_summary.district,
      },
      last_updated: feature.properties.last_updated,
      next_inspection: feature.properties.next_inspection,
      web_link: feature.properties.web_link,
      alert_message: feature.properties.alert_message,
    };
    trafficeEvents.push(trafficeEvent);
  });
  return trafficeEvents;
};

interface trafficeEvent {
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

interface trafficeEventRaw {
  type: string;
  geometry: {
    type: string;
    crs: {
      type: string;
      properties: {
        name: string;
      };
    };
    coordinates: number[][];
  };
  properties: {
    id: number;
    area_alert: boolean;
    status: string;
    source: {
      source_name: unknown;
      source_id: unknown;
      account: unknown;
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
  };
}
