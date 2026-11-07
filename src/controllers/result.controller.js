import * as resultService from "../Service/result.service.js";

export const createResult = async (req, res) => {
  try {
    const result = await resultService.createResult(req.body);

    res.status(201).json({
      success: true,
      message: "Result created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await resultService.getResults();

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleResult = async (req, res) => {
  try {
    const result = await resultService.getSingleResult(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateResult = async (req, res) => {
  try {
    const result = await resultService.updateResult(
      req.params.id,
      req.body
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const result = await resultService.deleteResult(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await resultService.getAnalyticsData();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getOverallSummary = async (req, res) => {
  try {
    const summary = await resultService.getOverallSummary();

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};