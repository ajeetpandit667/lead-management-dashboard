const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lead = require('../models/Lead');
const User = require('../models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const firstNames = [
  'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jessica',
  'James', 'Lauren', 'William', 'Amanda', 'Richard', 'Sophie', 'Joseph', 'Maria',
  'Charles', 'Elizabeth', 'Christopher', 'Jennifer', 'Thomas', 'Linda', 'Daniel',
  'Barbara', 'Matthew', 'Mary', 'Anthony', 'Susan', 'Mark', 'Dorothy', 'Donald',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
];

const companies = [
  'Acme Corp', 'TechFlow Inc', 'Global Solutions', 'Innovate Labs', 'Summit Enterprises',
  'Apex Digital', 'Horizon Tech', 'Velocity Systems', 'Prime Consulting', 'Elite Services',
  'NextGen Industries', 'Dynamic Solutions', 'QuantumLeap Corp', 'Stellar Analytics', 'Fusion Tech',
  'Aurora Systems', 'Zenith Partners', 'Momentum Technologies', 'Catalyst Group', 'Vertex Solutions',
];

const stages = ['Lead', 'Prospect', 'Qualified', 'Negotiation', 'Closed'];
const statuses = ['Active', 'Inactive', 'Converted', 'Lost'];
const sources = ['Website', 'Email', 'Phone', 'Social Media', 'Referral'];

const generateRandomLead = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const stage = stages[Math.floor(Math.random() * stages.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const source = sources[Math.floor(Math.random() * sources.length)];
  const value = Math.floor(Math.random() * 100000) + 1000;

  return {
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`,
    phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    company,
    stage,
    status,
    source,
    value,
    notes: `Lead from ${source}. Value: $${value}`,
  };
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Lead.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create demo user
    const demoUser = new User({
      username: 'demo',
      email: 'demo@example.com',
      password: 'demo123',
    });
    await demoUser.save();
    console.log('Created demo user (username: demo, password: demo123)');

    // Generate and insert 500 dummy leads
    const leads = [];
    for (let i = 0; i < 500; i++) {
      leads.push(generateRandomLead());
    }

    await Lead.insertMany(leads);
    console.log(`Successfully seeded ${leads.length} leads`);

    // Show analytics
    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: 'Converted' });
    const activeLeads = await Lead.countDocuments({ status: 'Active' });

    console.log('\n=== Seeding Summary ===');
    console.log(`Total Leads: ${totalLeads}`);
    console.log(`Converted Leads: ${convertedLeads}`);
    console.log(`Active Leads: ${activeLeads}`);
    console.log('=======================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
