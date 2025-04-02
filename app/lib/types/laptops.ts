// lib/api/types/laptops.ts
export type Laptop = {
    id: string;
    brand: string;
    name: string;
    price: number;
    specs: string[];
    image: string;
    description: string;
    stock?: number;
    rating?: number;
  };