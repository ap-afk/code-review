import { generateText } from "../services/ai.service.js";

export const getResponse = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("Code is required");
  }

  const response = await generateText(code);
  res.send(response);
};
