import catchAsync from '../helpers/asyncHandler'
import sendResponse from '../helpers/sendResponse'
import SeedService from './seed.service'
import httpStatus from 'http-status'
const createSeedData = catchAsync(async (req, res) => {
    const data = await SeedService.createSeedData()
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'sample class and students created successfully',
        data,
    })
})
const SeedController = { createSeedData }
export default SeedController
