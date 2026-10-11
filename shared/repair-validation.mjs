export function normalizeIndianPhone(value) {
  const compact = value.trim().replace(/[\s-]/g, '');
  return /^(?:\+91)?[6-9]\d{9}$/.test(compact)
    ? `+91${compact.replace(/^\+91/, '')}` : null;
}

export function validateRepair(values) {
  const errors = {};
  if (values.name.trim().length < 2 || values.name.trim().length > 80) errors.name = 'Enter a name between 2 and 80 characters';
  if (!productsForDevice(values.category).includes(values.product)) errors.product = 'Choose a product for your device type';
  if (!['iphone', 'android', 'macbook', 'windows', 'tablet', 'watch'].includes(values.category)) errors.category = 'Choose a device type';
  if (!issuesForDevice(values.category).some((issue) => issue.name === values.issue)) errors.issue = 'Choose an issue for your device';
  if (!normalizeIndianPhone(values.phone)) errors.phone = 'Enter a 10-digit Indian mobile number starting with 6–9, optionally with +91';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.trim().length > 254) errors.email = 'Enter a valid email address';
  return errors;
}
import { issuesForDevice } from './repair-issues.mjs';

import { productsForDevice } from './devices.mjs';
