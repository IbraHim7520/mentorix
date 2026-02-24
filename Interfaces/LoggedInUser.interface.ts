export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  status: "ACTIVE" |"BLOCKED" |"DELETED",
  image?: string | null;
  role: "STUDENT" | "ADMIN" | "TEACHER"; // ✅ add this
}