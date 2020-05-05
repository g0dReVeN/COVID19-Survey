const persist = (datastore, entity, id) => {
  return datastore.insert({
    key: datastore.key(['covid19CoughSurvey', id]),
    data: entity
  });
};

module.exports = { persist };
