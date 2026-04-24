import * as comparisonsService from './comparisons.service.js';

export const getAllComparisons = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    let data;
    if (projectId) {
      data = await comparisonsService.getComparisonByProjectId(req.user.id, projectId);
    } else {
      data = await comparisonsService.getAllComparisons(req.user.id);
    }
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    next(error);
  }
};
