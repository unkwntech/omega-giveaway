import { Request, Response } from "express";
import routable from "../decorators/routable.decorator";
import { JWTPayload } from "../models/jwtpayload.model";
import { default as User } from "../models/user.model";
import { DbUtilities as DB } from "../utilities/db-utilities";

export default class UserController {
    @routable({
        path: "/user/",
        method: "get",
        swagger: {
            tags: ["user"],
            summary: "Get user object",
        },
    })
    public async oAuthLogin(req: Request, res: Response, jwt: JWTPayload) {
        await DB.Get(jwt.sub, User.getFactory()).then((user) => {
            res.status(200).send({
                char: {
                    id: user.characters[0].id,
                    name: user.characters[0].name,
                },
                corp: user.characters[0].corporation,
                prizes: user.prizes,
            });
        });
    }
}
