import dotenv from "dotenv";
import passport from "passport";
import GithubStrategy from "passport-github";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import {
  githubLoginCallback,
  naverLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://c-posture.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://c-posture.herokuapp.com${routes.naverCallback}`
        : `http://localhost:4000${routes.naverCallback}`,
    },
    naverLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
