function generate8DigitAlphanumericHash() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let hash = "";
  for (let i = 0; i < 8; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
}

module.exports = generate8DigitAlphanumericHash;
