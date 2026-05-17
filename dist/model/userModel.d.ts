export interface User {
    id?: number;
    name: string;
    email: string;
    password_hash: string;
    profile_pic?: string;
    created_at?: Date;
}
export declare const userModel: {
    getAllUsers: () => Promise<User[]>;
    findUserByEmail: (email: string) => Promise<User | null>;
    create: (user: User) => Promise<User>;
};
//# sourceMappingURL=userModel.d.ts.map