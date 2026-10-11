import mongoose from 'mongoose';
import Repair from '../models/Repair.js';
import { configured, checkPassword, signToken } from '../middleware/auth.js';
const STATUSES = ['new', 'contacted', 'in-progress', 'completed', 'cancelled'];

export function login(req, res) {
  if (!configured()) return res.status(503).json({ message: 'Admin is not configured on the server.' });
  if (!checkPassword(req.body.password)) return res.status(401).json({ message: 'Wrong password.' });
  res.json({ token: signToken() });
}
export async function list(_req, res, next) {
  try { res.json(await Repair.find().sort({ createdAt: -1 }).limit(500).lean()); } catch (e) { next(e); }
}
export async function setStatus(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id) || !STATUSES.includes(req.body.status)) return res.status(400).json({ message: 'Invalid request.' });
    const doc = await Repair.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).lean();
    doc ? res.json(doc) : res.status(404).json({ message: 'Not found.' });
  } catch (e) { next(e); }
}
export async function remove(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid request.' });
    await Repair.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
}
