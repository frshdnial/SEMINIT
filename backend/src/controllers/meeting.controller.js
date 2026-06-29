export const getAllMeetings = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Get all meetings",
        data: []
    });
};

export const getMeetingById = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Get meeting by ID",
        meetingId: req.params.id
    });
};

export const createMeeting = async (req, res) => {
    res.status(201).json({
        success: true,
        message: "Meeting created successfully",
        data: req.body
    });
};