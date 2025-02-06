export default class ApiError extends Error {
    status;
    access;

    constructor(status, message, access = 'block') {
        super(message)
        this.status = status
        this.access = access
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не авторизован")
    }

    static BadRequest(message, access = 'block') {
        return new ApiError(400, message, access)
    }

    static NotFoundRequest(message, access = 'block') {
        return new ApiError(404, message, access)
    }

    static ForbiddenRequest(message, access = 'block') {
        return new ApiError(403, message, access)
    }
}