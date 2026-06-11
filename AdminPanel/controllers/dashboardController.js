const dashboardController = {
    index : (res , req  ) => {
        req.render('dashboard')
    },
    tables : (res , req  ) => {
        req.render('tables')
    },
    forms : (res , req  ) => {
        req.render('forms')
    },
    login : (res , req  ) => {
        req.render('login')
    },
    mailbox : (res , req  ) => {
        req.render('mailbox')
    },

}
module.exports = dashboardController