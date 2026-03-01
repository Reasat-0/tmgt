import { query } from '../config/db.js';

export enum TripStatusEnum {
  PLANNING = 1,
  ACTIVE,
  COMPLETED,
}

const statusMap = {
  [TripStatusEnum.PLANNING]: 'planning',
  [TripStatusEnum.ACTIVE]: 'active',
  [TripStatusEnum.COMPLETED]: 'completed',
};

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

export const tripModel = {
  create: async (trip: Omit<Trip, 'id' | 'created_at'>): Promise<Trip> => {
    // Implementation to create a trip in the database
    const {
      title,
      description,
      start_date,
      end_date,
      created_by,
      currency,
      invite_code,
      budget,
      status,
    } = trip;

    const dbStatus = statusMap[status || TripStatusEnum.PLANNING];
    const insertQuery = `insert into trips (title, description, start_date, end_date, created_by, currency, invite_code, budget, status) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
    const queryResult = await query(insertQuery, [
      title,
      description,
      start_date,
      end_date,
      created_by,
      currency,
      invite_code,
      budget,
      dbStatus,
    ]);
    return queryResult.rows[0];
  },
  update: async (
    tripId: number,
    userId: number,
    updateData: Partial<Trip>
  ): Promise<Trip> => {
    // user id will be used to check the user is the member of that trip or not

    // Update query :
    const updateQuery = `update trips
      set title = COALESCE($1, title),
          description = COALESCE($2, description),
          start_date = COALESCE($3, start_date),
          end_date = COALESCE($4, end_date),
          currency = COALESCE($5, currency),
          budget = COALESCE($6, budget),
          status = COALESCE($7, status)
      where id = $8 and created_by = $9
      returning *`;

    const queryResult = await query(updateQuery, [
      updateData.title,
      updateData.description,
      updateData.start_date,
      updateData.end_date,
      updateData.currency,
      updateData.budget,
      statusMap[updateData.status || TripStatusEnum.PLANNING],
      tripId,
      userId,
    ]);
    return queryResult.rows[0];
  },
  // getAllByUserId: async (userId: number): Promise<Trip[]> => {
  //   const result = await query(
  //     'SELECT * FROM trips WHERE creator_id = $1 ORDER BY created_at DESC',
  //     [userId]
  //   );
  //   return result.rows;
  // },
};
