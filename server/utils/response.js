export const successResponse = (
  res,
  code = 200,
  message = "Success",
  data = null
) => {
  return res.status(code).json({
    code,
    message,
    success: true,
    data,
  });
};

export const errorResponse = (
  res,
  code = 500,
  message = "Something went wrong",
  errors = null
) => {
  return res.status(code).json({
    code,
    message,
    success: false,
    errors,
  });
};