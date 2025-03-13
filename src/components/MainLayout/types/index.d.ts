export interface userType {
  id: string;
  email: string;
  phone: number;
}

export interface LayoutType {
  children: React.ReactNode;
  user: userType;
}
