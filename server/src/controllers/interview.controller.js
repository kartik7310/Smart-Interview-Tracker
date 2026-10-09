import mongoose from "mongoose";
import Interview from "../models/interview.model.js";

// CREATE INTERVIEW
export const createInterview = async (req, res) => {
  try {
    const {
      candidateName,
      position,
      status,
      email,
      date,
      notes,
    } = req.body;

    if (
      !candidateName?.trim() ||
      !position?.trim() ||
      !email?.trim() ||
      !date ||
      !notes?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields except status are required",
      });
    }

    const interview = await Interview.create({
      candidateName: candidateName.trim(),
      position: position.trim(),
      status: status || "pending",
      email: email.trim().toLowerCase(),
      date,
      notes: notes.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET ALL INTERVIEWS WITH SEARCH, FILTERS AND PAGINATION
export const getAllInterviews = async (req, res) => {
  try {
    const {
      search = "",
      candidateName = "",
      status,
      position,
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Number(page);
    const pageSize = Number(limit);

    // VALIDATE PAGINATION
    if (
      !Number.isInteger(currentPage) ||
      !Number.isInteger(pageSize) ||
      currentPage < 1 ||
      pageSize < 1 ||
      pageSize > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
      });
    }

    const filter = {};

    // FILTER BY CANDIDATE NAME
    if (
      typeof candidateName === "string" &&
      candidateName.trim()
    ) {
      filter.candidateName = {
        $regex: escapeRegex(candidateName.trim()),
        $options: "i",
      };
    }

    // GENERAL SEARCH BY NAME, EMAIL OR POSITION
    if (typeof search === "string" && search.trim()) {
      const escapedSearch = escapeRegex(search.trim());

      filter.$or = [
        {
          candidateName: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          email: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
        {
          position: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
      ];
    }

    // FILTER BY POSITION
    if (
      typeof position === "string" &&
      position.trim()
    ) {
      filter.position = {
        $regex: escapeRegex(position.trim()),
        $options: "i",
      };
    }

    // FILTER BY STATUS
    if (status) {
      const allowedStatuses = [
        "pending",
        "scheduled",
        "completed",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid interview status",
        });
      }

      filter.status = status;
    }

    // PAGINATION
    const skip = (currentPage - 1) * pageSize;

    const [interviews, total] = await Promise.all([
      Interview.find(filter)
        .sort({ date: 1, _id: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),

      Interview.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: currentPage,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
      interviews,
    });
  } catch (error) {
    console.error("Get interviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};






// UPDATE INTERVIEW STATUS
export const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const interview = await Interview.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interview status updated successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// DELETE INTERVIEW
export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview ID",
      });
    }

    const interview = await Interview.findByIdAndDelete(id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error("Delete interview error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};