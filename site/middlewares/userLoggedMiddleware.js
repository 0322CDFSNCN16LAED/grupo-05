const { User } = require("../database/models");

async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;


	let IdInCookie = req.cookies.userId;
	let userFromCookie = await User.findByPk(IdInCookie, {
		include: [{association: "address"}]
	})

	if (userFromCookie) {
		req.session.userLogged = userFromCookie;
	}
    
	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;
