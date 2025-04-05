import { pool } from "../../database/db.js";

// Logout controller
export const signOut = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(204); // No content
  }

  const connection = await pool.getConnection();
  try {
    // Remove refresh token from database
    await connection.query("DELETE FROM refresh_tokens WHERE token = ?", [
      refreshToken,
    ]);

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
};
