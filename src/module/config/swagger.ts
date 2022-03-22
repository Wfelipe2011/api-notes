const clientId = {
  name: 'clientId',
  example: 'c15884ca-aa0d-11ec-b909-0242ac120002',
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
  required: false,
};
const key = { name: 'key', example: 'f224e078-313c-450f-8ad9-f6c84a607096' };
const description = { summary: 'Get all notes' };

export { clientId, dateTo, dateFrom, description, key, status };
