export const getWebcams = async (): Promise<WebCam[]> => {
  const response = await fetch("/api/webcams");
  const data = await response.json();
  return data;
};

export interface WebCam {
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
