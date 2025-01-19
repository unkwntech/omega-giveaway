import { Request, Response } from "express";
import routable from "../decorators/routable.decorator";
import { ObjectNotFoundError } from "../errors";
import { JWTPayload } from "../models/jwtpayload.model";
import Prize from "../models/prize.model";
import User from "../models/user.model";
import { DbUtilities as DB } from "../utilities/db-utilities";

export default class GiveawayController {
    public static usedCodes: string[] = [];

    @routable({
        path: "/giveaway/:code",
        method: "get",
        swagger: {
            tags: ["giveaway"],
            summary: "Get result of code giveaway.",
        },
    })
    public async GetGiveawayResult(
        req: Request,
        res: Response,
        jwt: JWTPayload
    ) {
        DB.Get(req.params.code, Prize.getFactory())
            .then((prize: Prize) => {
                if (prize.claimed) {
                    res.status(406).send("Already Claimed");
                    return;
                }
                DB.Get(jwt.sub, User.getFactory())
                    .then((user: User) => {
                        prize.claimed = true;
                        user.prizes.push(prize);
                        DB.Update(user, User.getFactory());
                        DB.Update(prize, Prize.getFactory());
                        res.status(202).send(prize);
                    })
                    .catch((e) => {
                        res.sendStatus(500);
                        console.error(e);
                    });
            })
            .catch((e) => {
                if (e instanceof ObjectNotFoundError) {
                    res.sendStatus(404);
                    return;
                }

                res.sendStatus(500);
                console.error(e);
            });
    }
}
