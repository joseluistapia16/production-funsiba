import { query, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { OkPacket, RowDataPacket } from "mysql2";
import { connect } from "../config/database";
import { User } from "../interfaces/types";

export async function createUser(req: Request, res: Response) {
  const user: User = req.body;
  try {
    const conn = await connect();
    await conn.query("set @error = ''");
    await conn.query<RowDataPacket[]>(
      `CALL funsiba.sp_create_user('${user.username}', ${user.avatar_id}, @error);`
    );
    const result = await conn.query<RowDataPacket[]>(`SELECT @error as error;`);
    res.status(200).json(result[0][0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "error", msg: e });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const conn = await connect();
    const result = await conn.query<RowDataPacket[]>(
      `SELECT user.*, avatar.url FROM funsiba.user, funsiba.avatar WHERE user.avatar_id = avatar.avatar_id;`
    );
    res.status(200).json(result[0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "error", msg: e });
  }
}

export async function getUser(req: Request, res: Response) {
  const user_id = req.params.id;
  try {
    const conn = await connect();
    const result = await conn.query<RowDataPacket[]>(
      "SELECT u.*, a.url FROM funsiba.user u , avatar a  WHERE u.avatar_id = a.avatar_id AND user_id = ?;",
      [user_id]
    );
    res.status(200).json(result[0][0]);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "error", msg: e });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.body;
  try {
    const conn = await connect();
    await conn.query("delete from user where user_id = ?", [id]);
    res.status(200).json({ status: "success", msg: "User deleted" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: "error", msg: e });
  }
}

export async function login(req: Request, res: Response) {
  const { username, avatar_id } = req.body;

  try {
    const conn = await connect();
    const result = await conn.query<RowDataPacket[]>(
      "SELECT * FROM funsiba.user u, avatar a WHERE u.avatar_id = a.avatar_id AND u.username = ? AND u.avatar_id = ?;",
      [username, avatar_id]
    );
    if (result[0].length === 0) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    } else {
      const user = result[0][0];
      const token = jwt.sign(
        {
          user_id: user.user_id,
          username: user.username,
          avatar_id: user.avatar_id,
          score: user.score,
        },
        "secret",
        { expiresIn: "1h" }
      );
      res.status(200).json({ status: true, token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error });
  }
}
