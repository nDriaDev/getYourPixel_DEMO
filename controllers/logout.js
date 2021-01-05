module.exports = (req, res, next) => {
  console.log("Logout_controller [logout] START");
  delete req.session.password;
  delete req.session.secret;
  delete req.session.email;
  res.status(202).send({code: 200, message: 'logout avvenuto con successo'})
  // req.session.destroy(function(err) {
  //     if(err) {
  //       console.log("Logout_controller [logout] ERROR -",err.message);
  //       res.status(202).send({code: 500, message: err.message})
  //     } else {
  //       res.status(202).send({code: 200, message: 'logout avvenuto con successo'})
  //     }
  // });
  console.log("Logout_controller [logout] FINISH");
};
