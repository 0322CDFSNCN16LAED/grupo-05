function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/user/account');
	}
    else{
        next();
    }
}

module.exports = guestMiddleware;
