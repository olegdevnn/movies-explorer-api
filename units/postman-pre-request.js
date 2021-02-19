/*
----------------------------------------------------------------------
Нужно установить в коллекцию PostMan, в раздел Pre-request Scripts.
Дальше он будет сам обрабатывать все запросы.
----------------------------------------------------------------------

const reqObject = {
  url: 'http://localhost:3000/getToken',
  method: 'GET',
  header: {
    'Content-Type': 'application/json',
    Cache: 'no-cache',
  },
};

pm.sendRequest(reqObject, (err, res, { cookies }) => {
  if (err) {
    console.log(err);
  } else {
    try {
      const csrfToken = cookies.one('csrfToken').value;
      console.log(`fetched token ${csrfToken}`);
      pm.request.headers.add({ key: 'csrfToken', value: csrfToken });
    } catch (e) {
      console.log(e);
    }
  }
});

*/
