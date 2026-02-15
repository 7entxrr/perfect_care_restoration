export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  description: string;
  status: string;
  image: string;
  type: string;
  details?: {
    features?: string[];
    year?: string;
    amenities?: string[];
    client?: string;
    size?: string;
    gallery?: string[];
  };
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "handbag-restoration",
    title: "Luxury Handbag Restoration",
    location: "Studio · Noida",
    description: "Color renewal, scratch repair, stitching, hardware polishing, and liner replacement for designer bags.",
    status: "Available",
    image: "https://images.pexels.com/photos/13525167/pexels-photo-13525167.jpeg",
    type: "Service",
    details: {
      features: [
        "Recoloring & finish renewal",
        "Edge coat repair & stitching",
        "Hardware cleaning & polishing",
        "Lining repair/replacement"
      ],
      gallery: [
        "https://images.pexels.com/photos/13525167/pexels-photo-13525167.jpeg",
        "https://images.pexels.com/photos/34279970/pexels-photo-34279970.jpeg",
        "https://images.pexels.com/photos/12588094/pexels-photo-12588094.jpeg"
      ]
    }
  },
  {
    id: 2,
    slug: "shoe-refinishing",
    title: "Premium Shoe Refinishing",
    location: "Studio · Noida",
    description: "Deep clean, conditioning, recoloring, sole repair, and high-gloss finishing for leather footwear.",
    status: "Available",
    image: "https://images.pexels.com/photos/32140515/pexels-photo-32140515.jpeg",
    type: "Service",
    details: {
      features: [
        "Deep clean & conditioning",
        "Color restoration & polish",
        "Sole & heel repair",
        "Protective finish"
      ],
      gallery: [
        "https://images.pexels.com/photos/32140515/pexels-photo-32140515.jpeg",
        "https://images.pexels.com/photos/25003973/pexels-photo-25003973.jpeg",
        "https://images.pexels.com/photos/35392698/pexels-photo-35392698.jpeg"
      ]
    }
  },
  {
    id: 3,
    slug: "leather-jacket-repair",
    title: "Leather Jacket Repair",
    location: "Studio · Noida",
    description: "Panel repair, zipper replacement, recoloring, and refinishing to restore jackets to like-new condition.",
    status: "Available",
    image: "https://images.pexels.com/photos/9267588/pexels-photo-9267588.jpeg",
    type: "Service",
    details: {
      features: [
        "Panel stitching & patching",
        "Zipper & hardware replacement",
        "Color touch-up & finish renewal",
        "Protective conditioning"
      ],
      gallery: [
        "https://images.pexels.com/photos/9267588/pexels-photo-9267588.jpeg",
        "https://images.pexels.com/photos/9453448/pexels-photo-9453448.jpeg",
        "https://images.pexels.com/photos/30750480/pexels-photo-30750480.jpeg"
      ]
    }
  },
  {
    id: 4,
    slug: "furniture-upholstery-renewal",
    title: "Furniture Upholstery Renewal",
    location: "On-Site · NCR",
    description: "On-site cleaning, conditioning, recoloring, and repair of leather sofas and chairs.",
    status: "Available",
    image: "https://images.pexels.com/photos/25003973/pexels-photo-25003973.jpeg",
    type: "Service",
    details: {
      features: [
        "On-site service",
        "Scratch & scuff repair",
        "Color restoration",
        "Deep conditioning & protection"
      ],
      gallery: [
        "https://images.pexels.com/photos/25003973/pexels-photo-25003973.jpeg",
        "https://images.pexels.com/photos/35392698/pexels-photo-35392698.jpeg",
        "https://images.pexels.com/photos/3829029/pexels-photo-3829029.jpeg"
      ]
    }
  },
  {
    id: 5,
    slug: "auto-interior-leather-repair",
    title: "Auto Interior Leather Repair",
    location: "On-Site · NCR",
    description: "Seat panel repairs, recoloring, and protective finishing for car interiors.",
    status: "Available",
    image: "https://images.pexels.com/photos/30750480/pexels-photo-30750480.jpeg",
    type: "Service",
    details: {
      features: [
        "Panel repair & stitching",
        "Color matching & refinishing",
        "Cleaning & conditioning",
        "Protective coating"
      ],
      gallery: [
        "https://images.pexels.com/photos/30750480/pexels-photo-30750480.jpeg",
        "https://images.pexels.com/photos/13525167/pexels-photo-13525167.jpeg",
        "https://images.pexels.com/photos/9453448/pexels-photo-9453448.jpeg"
      ]
    }
  }
];
