import { query } from '../config/db.js';
export var TripStatusEnum;
(function (TripStatusEnum) {
    TripStatusEnum[TripStatusEnum["PLANNING"] = 1] = "PLANNING";
    TripStatusEnum[TripStatusEnum["ACTIVE"] = 2] = "ACTIVE";
    TripStatusEnum[TripStatusEnum["COMPLETED"] = 3] = "COMPLETED";
})(TripStatusEnum || (TripStatusEnum = {}));
const statusMap = {
    [TripStatusEnum.PLANNING]: 'planning',
    [TripStatusEnum.ACTIVE]: 'active',
    [TripStatusEnum.COMPLETED]: 'completed',
};
export const tripModel = {
    create: async (trip) => {
        // Implementation to create a trip in the database
        const { title, description, start_date, end_date, created_by, currency, invite_code, budget, status, } = trip;
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
    update: async (tripId, userId, updateData) => {
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
    delete: async (tripId, userId) => {
        // user id will be used to check the user is the member of that trip or not
        const deleteQuery = 'DELETE from trips WHERE id = $1 AND created_by = $2';
        const queryResult = await query(deleteQuery, [tripId, userId]);
        return (queryResult.rowCount ?? 0) > 0;
    },
    // Get all trips of any user
    getAllTrips: async () => {
        const selectQuery = 'SELECT * FROM trips';
        const queryResult = await query(selectQuery);
        return queryResult.rows;
    },
};
//# sourceMappingURL=tripModel.js.map