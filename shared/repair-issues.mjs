const allDevices = ['iphone', 'android', 'macbook', 'windows', 'tablet', 'watch'];

export const repairIssues = [
  { name: 'Screen replacement', label: 'Display / screen replacement', devices: allDevices },
  { name: 'Battery replacement', devices: allDevices },
  { name: 'Charging-port repair', devices: ['iphone', 'android', 'tablet', 'macbook', 'windows'] },
  { name: 'Camera and speaker repair', devices: ['iphone', 'android', 'tablet'] },
  { name: 'Water-damage diagnostics', devices: allDevices },
  { name: 'Laptop hardware repair', devices: ['macbook', 'windows'] },
  { name: 'Software troubleshooting', devices: allDevices },
  { name: 'Something else', devices: allDevices },
];

export const issuesForDevice = (category) => repairIssues.filter((issue) => !category || issue.devices.includes(category));
