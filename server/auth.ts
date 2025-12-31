import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { type User as SelectUser } from "@shared/schema";

declare global {
    namespace Express {
        interface User extends SelectUser { }
    }
}

async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

async function comparePasswords(supplied: string, stored: string) {
    return await bcrypt.compare(supplied, stored);
}

export function setupAuth(app: Express) {
    const sessionSettings: session.SessionOptions = {
        secret: process.env.SESSION_SECRET || "lead-autonomy-secret",
        resave: false,
        saveUninitialized: false,
        store: storage.sessionStore,
        cookie: {
            secure: app.get("env") === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        },
    };

    if (app.get("env") === "production") {
        app.set("trust proxy", 1);
    }

    app.use(session(sessionSettings));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await storage.getUserByUsername(username);
                if (!user || !(await comparePasswords(password, user.password))) {
                    return done(null, false, { message: "Invalid username or password" });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await storage.getUser(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    app.post("/api/register", async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }

            const existingUser = await storage.getUserByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: "Username already exists" });
            }

            const hashedPassword = await hashPassword(password);
            const user = await storage.createUser({
                ...req.body,
                password: hashedPassword,
            });

            req.login(user, (err) => {
                if (err) return next(err);
                res.status(201).json(user);
            });
        } catch (err) {
            next(err);
        }
    });

    app.post("/api/login", (req, res, next) => {
        passport.authenticate("local", (err: any, user: Express.User, info: any) => {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ message: info?.message || "Login failed" });
            }
            req.login(user, (err) => {
                if (err) return next(err);
                res.status(200).json(user);
            });
        })(req, res, next);
    });

    app.post("/api/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.sendStatus(200);
        });
    });

    app.get("/api/user", (req, res) => {
        if (!req.isAuthenticated()) return res.status(401).json(null);
        res.json(req.user);
    });
}
