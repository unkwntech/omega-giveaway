import { Request, Response } from "express";
import routable from "../decorators/routable.decorator";
import { JWTPayload } from "../models/jwtpayload.model";

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
    public GetGiveawayResult(req: Request, res: Response, jwt: JWTPayload) {
        const prizes = [
            { id: 17740, name: "Vindicator", qty: 1 },
            { id: 17920, name: "Bhaalgorn", qty: 1 },
            { id: 44992, name: "PLEX", qty: 500 },
            { id: 44992, name: "PLEX", qty: 69 },
            { id: 40520, name: "Large Skill Injector", qty: 1 },
        ];

        console.log(req.params);

        if (GiveawayController.usedCodes.includes(req.params.code)) {
            console.log(req.params.code, GiveawayController.usedCodes);
            res.sendStatus(406); //Not Acceptable
            return;
        }

        GiveawayController.usedCodes.push(req.params.code);
        const random = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        res.send({ prize: prizes[random(0, prizes.length - 1)] });
    }
}
