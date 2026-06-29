export const getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        userId: "USR001",
        name: "Apis Aziq",
      },
    ],
  });
};

export const createUser = (req, res) => {
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: req.body,
  });
};