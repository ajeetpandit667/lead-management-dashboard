const Lead = require('../models/Lead');

const getLeads = async (req, res) => {
  try {
    const { search, stage, status, source, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    if (stage) {
      filter.stage = stage;
    }

    if (status) {
      filter.status = status;
    }

    if (source) {
      filter.source = source;
    }

    // Build sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Default sort by newest first
    }

    // Calculate pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const total = await Lead.countDocuments(filter);

    // Get leads
    const leads = await Lead.find(filter).sort(sort).skip(skip).limit(limitNum);

    res.json({
      leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLead = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, stage, status, source, value, notes } = req.body;

    const lead = new Lead({
      firstName,
      lastName,
      email,
      phone,
      company,
      stage,
      status,
      source,
      value,
      notes,
    });

    await lead.save();

    res.status(201).json({ message: 'Lead created successfully', lead });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, stage, status, source, value, notes } = req.body;

    let lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (firstName) lead.firstName = firstName;
    if (lastName) lead.lastName = lastName;
    if (email) lead.email = email;
    if (phone) lead.phone = phone;
    if (company) lead.company = company;
    if (stage) lead.stage = stage;
    if (status) lead.status = status;
    if (source) lead.source = source;
    if (value) lead.value = value;
    if (notes) lead.notes = notes;

    await lead.save();

    res.json({ message: 'Lead updated successfully', lead });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });
    const activeLeads = await Lead.countDocuments({ status: 'Active' });
    const lostLeads = await Lead.countDocuments({ status: 'Lost' });

    // Get leads by stage
    const leadsByStage = await Lead.aggregate([
      {
        $group: {
          _id: '$stage',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get leads by source
    const leadsBySource = await Lead.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get conversion rate
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

    res.json({
      totalLeads,
      convertedLeads,
      activeLeads,
      lostLeads,
      conversionRate,
      leadsByStage,
      leadsBySource,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getAnalytics,
};
