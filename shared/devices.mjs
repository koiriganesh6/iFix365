export const devices = [
  { id: 'iphone', name: 'iPhone', desc: 'Recent models', icon: 'Smartphone', models: ['iPhone 15 series','iPhone 14 series','iPhone 13 series','iPhone 12 series','Other iPhone'] },
  { id: 'android', name: 'Android phones', desc: 'Major brands', icon: 'TabletSmartphone', models: ['Samsung Galaxy','OnePlus','Xiaomi / Redmi','Google Pixel','Other Android'] }, // TODO(verify) supported brands
  { id: 'macbook', name: 'MacBook', desc: 'Air and Pro', icon: 'Laptop', models: ['MacBook Air (M-series)','MacBook Pro (M-series)','MacBook (Intel)','Other MacBook'] },
  { id: 'windows', name: 'Windows laptops', desc: 'Dell, HP, Lenovo, Asus', icon: 'Monitor', models: ['Dell','HP','Lenovo','Asus','Acer','Other'] },
  { id: 'tablet', name: 'iPad and tablets', desc: 'iPad and Android', icon: 'Tablet', models: ['iPad','iPad Air / Pro','Samsung Galaxy Tab','Other tablet'] },
  { id: 'watch', name: 'Smartwatches', desc: 'Apple and others', icon: 'Watch', models: ['Apple Watch','Samsung Galaxy Watch','Other smartwatch'] },
];

export const productsForDevice = (category) => devices.find((device) => device.id === category)?.models || [];
