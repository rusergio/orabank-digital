
import { GoogleGenAI } from "@google/genai";
import { Transaction, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getFinancialAdvice = async (user: User, transactions: Transaction[], prompt: string) => {
  try {
    const context = `
      Você é o "OraAssistant", o assistente financeiro virtual do banco Orabank.
      Dados do usuário:
      - Nome: ${user.name}
      - Saldo Atual: ${user.balance} FCFA (Franco CFA - Comunidade Económica dos Estados da África Ocidental)
      - Tipo de conta: ${user.accountType}
      
      Histórico recente:
      ${transactions.map(t => `- ${t.date}: ${t.type} de ${t.amount} (${t.description})`).join('\n')}

      Responda de forma profissional, cordial e segura. Nunca peça senhas. 
      Ajude o usuário com dúvidas sobre transferências, economia ou análise de gastos.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-latest",
      contents: [
        { role: 'user', parts: [{ text: context }] },
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, tive um problema ao processar sua solicitação. Tente novamente em breve.";
  }
};
