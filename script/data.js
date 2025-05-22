let user = {
  name: "Joelson",
  email: "joelson@taskflow.com",
  theme: "dark", // pra salvar preferências tipo dark mode
  board: {
    name: "school project",
    columnActive: "toDo",
    columns: [
      {
        id: "toDo",
        title: "To Do",
        cards: [
          {
            id: `card-${Date.now() + 1}`,
            title: "Planejar roteiro de vídeo institucional",
            description:
              "Definir os principais tópicos e a estrutura do vídeo institucional da empresa.",
            tags: ["Média", "Vídeo", "Planejamento"],
            date: "2025-06-10T09:00:00Z",
            profile: "images/profile.svg",
          },
          {
            id: `card-${Date.now() + 2}`,
            title: "Implementar novo design da página de contato",
            description:
              "Codificar o novo layout da página 'Fale Conosco' seguindo o protótipo.",
            tags: ["Alta", "Desenvolvimento", "Front-end"],
            date: "2025-05-28T14:30:00Z",
            profile: "images/profile.svg",
          },
          {
            id: `card-${Date.now() + 3}`,
            title: "Revisar métricas de engajamento do último mês",
            description:
              "Analisar os dados de interação dos usuários nas redes sociais e no site.",
            tags: ["Baixa", "Análise", "Marketing"],
            date: "2025-07-05T16:00:00Z",
            profile: "images/profile.svg",
          },
        ],
      },
    ],
  },
};
