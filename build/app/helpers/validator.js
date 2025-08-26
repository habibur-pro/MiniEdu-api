"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = validator;
function validator(schema) {
    return (req, _res, next) => {
        try {
            const parsedData = schema.parse(req.body);
            req.body = parsedData;
            next();
        }
        catch (error) {
            next(error); // <-- pass ZodError to global error handler
        }
    };
}
