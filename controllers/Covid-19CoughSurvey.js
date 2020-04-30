const persist = async (datastore, entity, id) => {
  try {
    return datastore.insert({
      key: datastore.key(['covid19CoughSurvey', id]),
      data: entity
    });
  } catch (error) {
    return error;
  }
};

const getVisits = (datastore) => {
  const query = datastore
    .createQuery('covid19CoughSurvey')
    .order('timestamp', { descending: true })
    .limit(10);

  return datastore.runQuery(query);
};

module.exports = { persist, getVisits };
