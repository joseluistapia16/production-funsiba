import { Request, Response } from "express";
import fs from "fs/promises";
import { RowDataPacket } from "mysql2";
import path from "path";
import { connect } from "../config/database";

export function helloWorld(req: Request, res: Response) {
  res.json({ msg: "Hello World!" });
}

export async function getAvatars(req: Request, res: Response) {
  try {
    const conn = await connect();
    const avatars = await conn.query<RowDataPacket[]>(
      "CALL `funsiba`.`sp_get_avatars`();"
    );
    res.status(200).json(avatars[0][0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "error", msg: e });
  }
}

export async function getAvatarbyId(req: Request, res: Response) {
  try {
    const conn = await connect();
    const avatar = await conn.query<RowDataPacket[]>(
      `CALL sp_get_avatar_by_id(${req.params.id});`
    );
    res.status(200).json(avatar[0][0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "error", msg: e });
  }
}
