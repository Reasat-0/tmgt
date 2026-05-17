export declare enum TripStatusEnum {
    PLANNING = 1,
    ACTIVE = 2,
    COMPLETED = 3
}
export interface Trip {
    id: number;
    title: string;
    description?: string;
    start_date: Date;
    end_date: Date;
    created_by: number;
    currency?: string;
    created_at?: Date;
    invite_code: string;
    budget?: number;
    status?: TripStatusEnum;
}
export declare const tripModel: {
    create: (trip: Omit<Trip, "id" | "created_at">) => Promise<Trip>;
    update: (tripId: number, userId: number, updateData: Partial<Trip>) => Promise<Trip>;
    delete: (tripId: number, userId: number) => Promise<boolean>;
    getAllTrips: () => Promise<Trip[]>;
};
//# sourceMappingURL=tripModel.d.ts.map