export const MailBoxAPI = (email) => {
  var data = {
    access_key: "4a3b9b72a0029523ac5dd0da00efae2e",
    email: email,
    smtp: 1,
    format: 1,
  };
  return fetch(
    `http://apilayer.net/api/check?access_key=${data.access_key}&email=${data.email}&smtp=${data.smtp}&format=${data.format}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((result) => result);
};
