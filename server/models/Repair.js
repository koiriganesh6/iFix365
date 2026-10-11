import mongoose from 'mongoose';
const s = new mongoose.Schema({
  category: { type: String, required: true }, brand: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true }, issue: { type: String, required: true },
  name: { type: String, required: true, trim: true, maxlength: 80 }, phone: { type: String, required: true },
  email: { type: String, required: true, lowercase: true }, location: { type: String, required: true, maxlength: 200 },
  date: String, time: String, details: { type: String, maxlength: 1000 }, status: { type: String, default: 'new' },
}, { timestamps: true });
export default mongoose.model('Repair', s);
