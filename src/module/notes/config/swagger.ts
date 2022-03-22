const clientId = {
  name: 'clientId',
  example: '35172574848',
};
const dateFrom = {
  name: 'dateFrom',
  example: '3-18-2022',
  description: 'american standard date',
  required: false,
};
const dateTo = {
  name: 'dateTo',
  example: '3-21-2022',
  description: 'american standard date',
  required: false,
};
const status = {
  name: 'status',
  description: "'analyse' | 'success' | 'process' | 'pending' | 'invalid'",
  required: false,
};
const key = {
  name: 'key',
  description: 'your api key',
  example: 'f224e078',
};
const description = { summary: 'Get all notes' };

export { clientId, dateTo, dateFrom, description, key, status };
