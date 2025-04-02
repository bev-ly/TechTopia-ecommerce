import { Laptop } from "../../types/laptops";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getLaptopsByBrand(brand: string): Promise<Laptop[]> {
  const response = await fetch(`${API_BASE_URL}/laptops?brand=${brand}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}