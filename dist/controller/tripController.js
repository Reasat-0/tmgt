import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR, HTTP_NOT_FOUND, HTTP_OK, } from '../utils/httpStatusCodes.js';
import { generateResponse } from '../utils/response.js';
import { generateUniqueCode } from '../utils/uniqueCodeGenerator.js';
import { tripModel, TripStatusEnum } from '../model/tripModel.js';
// -------- CREATE -----------
export const createTrip = async (req, res) => {
    const { title, description, start_date, end_date, created_by, currency, invite_code, budget, status, } = req.body;
    try {
        if (!title || !start_date || !end_date) {
            return res.status(HTTP_BAD_REQUEST).json(generateResponse({
                message: 'Please provide all required fields',
                statusCode: HTTP_BAD_REQUEST,
                success: false,
            }));
        }
        const generatedInviteCode = generateUniqueCode('tr-inv', 8);
        const newTrip = {
            ...req.body,
            description: description || '',
            invite_code: generatedInviteCode,
            created_by: req.user?.id,
            currency: currency || 'BDT',
            status: TripStatusEnum.PLANNING,
        };
        const createTrip = await tripModel.create(newTrip);
        res.status(201).json(generateResponse({
            message: 'Trip created successfully',
            statusCode: 201,
            success: true,
            data: createTrip,
        }));
    }
    catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json(generateResponse({
            message: error.message,
            statusCode: HTTP_INTERNAL_SERVER_ERROR,
            success: false,
        }));
    }
};
// -------- UPDATE -----------
export const updateTrip = async (req, res) => {
    // Update FUnctionality
    // 1. getting the id of trip, which would be updated.
    const { id } = req.params;
    // 2. check the id is provided or not
    if (!id) {
        return res.status(HTTP_BAD_REQUEST).json(generateResponse({
            message: 'Trip id is required',
            statusCode: HTTP_BAD_REQUEST,
            success: false,
        }));
    }
    // 3. Based on the id and the user id, we will check the trip is exist or not, and also the user is the member of that trip or not.
    const userId = req.user?.id;
    try {
        if (!userId) {
            return res.status(HTTP_INTERNAL_SERVER_ERROR).json(generateResponse({
                message: 'User not found in request',
                statusCode: HTTP_INTERNAL_SERVER_ERROR,
                success: false,
            }));
        }
        const updateTrip = await tripModel.update(parseInt(id), userId, req.body);
        if (!updateTrip) {
            return res.status(HTTP_BAD_REQUEST).json(generateResponse({
                message: 'Trip not found or you are not authorized to update this trip',
                statusCode: HTTP_BAD_REQUEST,
                success: false,
            }));
        }
        return res.status(HTTP_OK).json(generateResponse({
            message: 'Trip updated successfully',
            statusCode: HTTP_OK,
            success: true,
            data: updateTrip,
        }));
    }
    catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json(generateResponse({
            message: error.message,
            statusCode: HTTP_INTERNAL_SERVER_ERROR,
            success: false,
        }));
    }
};
// -------- DELETE -----------
export const deleteTrip = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(HTTP_BAD_REQUEST).json(generateResponse({
            message: 'Trip id is required',
            statusCode: HTTP_BAD_REQUEST,
            success: false,
        }));
    }
    const userId = req.user?.id;
    try {
        if (!userId) {
            return res.status(HTTP_BAD_REQUEST).json(generateResponse({
                message: 'User is missing',
                statusCode: HTTP_BAD_REQUEST,
                success: false,
            }));
        }
        const deletedTrip = await tripModel.delete(parseInt(id), userId);
        if (deletedTrip) {
            return res.status(HTTP_OK).json(generateResponse({
                message: 'Trip deleted Successfully',
                statusCode: HTTP_OK,
                success: true,
            }));
        }
        return res.status(HTTP_NOT_FOUND).json(generateResponse({
            message: 'Trip not found or you are not authorized to delete this trip',
            statusCode: HTTP_NOT_FOUND,
            success: false,
        }));
    }
    catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json(generateResponse({
            message: error.message,
            statusCode: HTTP_INTERNAL_SERVER_ERROR,
            success: false,
        }));
    }
};
// -------- GET ALL TRIPS of ANy user-----------
export const getAllTrips = async (req, res) => {
    // Get all trips
    const allTrips = await tripModel.getAllTrips();
    if (allTrips.length === 0) {
        return res.status(HTTP_NOT_FOUND).json(generateResponse({
            message: 'No trips found',
            statusCode: HTTP_NOT_FOUND,
            success: false,
        }));
    }
    return res.status(HTTP_OK).json(generateResponse({
        message: 'Trips retrieved successfully',
        statusCode: HTTP_OK,
        success: true,
        data: allTrips,
    }));
};
//# sourceMappingURL=tripController.js.map