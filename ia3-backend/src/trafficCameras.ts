export const processWebData = (data: WebData): WebCam[] => {
  const webcams: WebCam[] = [];
  data.features.forEach((feature) => {
    const webcam: WebCam = {
      id: feature.properties.id,
      url: feature.properties.url,
      description: feature.properties.description,
      direction: feature.properties.direction,
      location: {
        district: feature.properties.district,
        locality: feature.properties.locality,
        postcode: feature.properties.postcode,
      },
      image_url: feature.properties.image_url,
    };
    webcams.push(webcam);
  });
  return webcams;
};

interface WebCam {
  id: number;
  url: string;
  description: string;
  direction: string;
  location: {
    district: string;
    locality: string;
    postcode: string;
  };

  image_url: string;
}

interface WebData {
  type: string;
  features: Feature[];
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Properties {
  id: number;
  url: string;
  description: string;
  direction: string;
  district: string;
  locality: string;
  postcode: string;
  image_url: string;
  image_sourced_from: string;
  isCustom: boolean;
  extra_info: string;
}

interface Geometry {
  type: string;
  crs: Crs;
  coordinates: number[];
}

interface Crs {
  type: string;
  properties: {
    name: string;
  };
}
