const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: '',
    },
    stage: {
      type: String,
      enum: ['Lead', 'Prospect', 'Qualified', 'Negotiation', 'Closed'],
      default: 'Lead',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Converted', 'Lost'],
      default: 'Active',
    },
    source: {
      type: String,
      enum: ['Website', 'Email', 'Phone', 'Social Media', 'Referral'],
      default: 'Website',
    },
    value: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lead', leadSchema);
