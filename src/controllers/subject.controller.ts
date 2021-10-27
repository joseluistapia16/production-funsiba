import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import { connect } from "../config/database";

export async function getSubjects(req: Request, res: Response) {
  const user_id = req.params.id;
  try {
    const conn = await connect();
    const result = await conn.query<RowDataPacket[]>(
      "CALL `funsiba`.`sp_get_subjects`();"
    );
    res.status(200).json(result[0][0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "error", msg: e });
  }
}
