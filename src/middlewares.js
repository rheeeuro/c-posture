import routes from "./routes";

export const formatDate = (date) => {
  const d = new Date(date);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join(". ");
};

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "C-posture";
  res.locals.routes = routes;
  res.locals.formatDate = formatDate;
  res.locals.isAdmin = isAdmin;
  res.locals.loggedUser = req.user || null;
  console.log(req.user);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.id === "5eea2576c97fa3007359207a") {
    next();
  } else {
    res.redirect(routes.home);
  }
};
