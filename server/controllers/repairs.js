import Repair from '../models/Repair.js';
const FIELDS = ['category','brand','model','issue','name','phone','email','location','date','time','details'];
export async function createRepair(req, res, next) {
  try {
    const d = {};
    for (const k of FIELDS) d[k] = typeof req.body[k] === 'string' ? req.body[k].trim() : '';
    const errors = {};
    for (const k of ['category','brand','model','issue','name','location']) if (!d[k]) errors[k] = 'Required';
    if (!/^[+]?[\d\s-]{10,14}$/.test(d.phone)) errors.phone = 'Enter a valid phone number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errors.email = 'Enter a valid email address';
    if (Object.keys(errors).length) return res.status(400).json({ message: 'Please fix the highlighted fields.', errors });
    const doc = await Repair.create(d);
    res.status(201).json({ id: doc._id });
  } catch (e) { next(e); }
}
