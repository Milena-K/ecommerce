export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type Comment = {
  id: number
  body: string
  postId: number
  user: User
}

export type User = {
  id: number
  username: string
}

export type UserData = {
  id: number,
  firstName: string,
  lastName: string,
  maidenName: string,
  age: number,
  gender: string,
  email: string,
  phone: string,
  username: string,
  password: string,
  birthDate: string,
  image: string,
  bloodGroup: string,
  height: number,
  weight: number,
  eyeColor: string,
  hair: {
    color: string,
    type: string,
  },
  domain: string,
  ip: string,
  address: {
    address: string,
    city: string,
    coordinates: {
      lat: number,
      lng: number
    },
    postalCode: string,
    state: string,
  },
  macAddress: string,
  university: string,
  bank: {
    cardExpire: string,
    cardNumber: string,
    cardType: string,
    currency: string,
    iban: string,
  },
  company: {
    address: {
      address: string,
      city: string,
      coordinates: {
        lat: number,
        lng: number
      },
      postalCode: string,
      state: string,
    },
    department: string,
    name: string,
    title: string,
  },
  ein: string,
  ssn: string,
  userAgent: string,
}


export interface ContactFormValues {
    name: string
    email: string
    subject: string
    message: string
}

export type Post = {
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: string[],
    reactions: number
}

type Cart = {
  id: number,
  products: CartProduct[],
  total: number,
  discountedTotal: number,
  userId: number,
  totalProducts: number,
  totalQuantity: number
}

type CartProduct = {
  discountPercentage: number,
  discountedPrice: number,
  id: number,
  price: number,
  quantity: number,
  title: string,
  total: number
}

interface Values {
    firstName: string
    lastName: string
    companyName?: string | null
    country: string
    streetAddress: string
    city: string
    province?: string
    zipCode: number | null
    phone: string | null
    email: string
    additionalInfo?: string
    transferOption: 1 | 2
}
