const persist = (datastore, entity) => {
  return datastore.insert({
    key: datastore.key('covid19CoughSurvey'),
    data: entity,
  });
};

const getVisits = (datastore) => {
  const query = datastore
    .createQuery('covid19CoughSurvey')
    .order('timestamp', {descending: true})
    .limit(10);

  return datastore.runQuery(query);
};

module.exports =  { persist, getVisits };
