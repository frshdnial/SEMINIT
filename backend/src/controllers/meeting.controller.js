export const getAllMeetings = async (req, res) => {
  const meetings = [
    {
      id: 1,
      title: "Weekly Team Meeting",
      organizer: "Apis",
      status: "Completed",
    },
    {
      id: 2,
      title: "Project Discussion",
      organizer: "Supervisor",
      status: "Processing",
    },
  ];

  res.status(200).json({
    success: true,
    count: meetings.length,
    data: meetings,
  });
};

export const getMeetingById = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.params.id,
      title: "Weekly Team Meeting",
      organizer: "Apis",
    },
  });
};

export const createMeeting = async (req, res) => {
  res.status(201).json({
    success: true,
    message: "Meeting created successfully",
    data: req.body,
  });
};