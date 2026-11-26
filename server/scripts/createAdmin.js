require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("../config/db");

(async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
    throw new Error("Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (minimum 12 characters) in the environment.");
  }
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await db.execute(
    `INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash)`,
    [ADMIN_NAME.trim(), ADMIN_EMAIL.trim().toLowerCase(), hash]
  );
  console.log(`Admin account provisioned for ${ADMIN_EMAIL}.`);
  await db.end();
})().catch(async (error) => {
  console.error(error.message);
  try { await db.end(); } catch {}
  process.exit(1);
});
