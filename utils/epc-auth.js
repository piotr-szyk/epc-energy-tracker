const encodeAPIKey = () => {
  const email = process.env.EPC_API_EMAIL;
  const key = process.env.EPC_API_KEY;
  
  // Basic error checking to help you debug later
  if (!email || !key) {
    console.warn('⚠️  Warning: EPC_API_EMAIL or EPC_API_KEY is missing from your .env file!');
  }

  // Encodes the string "email:key" into Base64 format
  return Buffer.from(`${email}:${key}`).toString('base64');
};

module.exports = encodeAPIKey;