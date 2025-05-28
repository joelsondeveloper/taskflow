// let user = {
//   name: "Joelson",
//   email: "joelson@taskflow.com",
//   theme: "dark", // pra salvar preferências tipo dark mode
//   board: {
//     name: "school project",
//     columnActive: "toDo",
//     columns: [
//       {
//         id: "toDo",
//         title: "A Fazer",
//         cards: [
//           {
//             id: `card-${Date.now() + 1}`,
//             title: "Planejar roteiro de vídeo institucional",
//             description:
//               "Definir os principais tópicos e a estrutura do vídeo institucional da empresa.",
//             tags: ["Média", "Vídeo", "Planejamento"],
//             date: "2025-06-10T09:00:00Z",
//             profile: "images/profile.svg", // Ex: Alice
//           },
//           {
//             id: `card-${Date.now() + 2}`,
//             title: "Implementar novo design da página de contato",
//             description:
//               "Codificar o novo layout da página 'Fale Conosco' seguindo o protótipo.",
//             tags: ["Alta", "Desenvolvimento", "Front-end"],
//             date: "2025-05-28T14:30:00Z",
//             profile: "images/profile.svg", // Ex: Bob
//           },
//           {
//             id: `card-${Date.now() + 3}`,
//             title: "Revisar métricas de engajamento do último mês",
//             description:
//               "Analisar os dados de interação dos usuários nas redes sociais e no site.",
//             tags: ["Baixa", "Análise", "Marketing"],
//             date: "2025-07-05T16:00:00Z",
//             profile: "images/profile.svg", // Ex: Carol
//           },
//           {
//             id: `card-${Date.now() + 4}`,
//             title: "Pesquisar fornecedores para brindes",
//             description:
//               "Buscar e cotar opções de fornecedores para os brindes do evento de fim de ano.",
//             tags: ["Média", "Compras", "Evento"],
//             date: "2025-08-15T10:00:00Z",
//             profile: "images/profile.svg", // Ex: David
//           },
//         ],
//       },
//       {
//         id: "inProgress",
//         title: "Em Andamento",
//         cards: [
//           {
//             id: `card-${Date.now() + 5}`,
//             title: "Desenvolver API de autenticação",
//             description:
//               "Criar os endpoints e a lógica para o sistema de autenticação de usuários.",
//             tags: ["Alta", "Desenvolvimento", "Back-end"],
//             date: "2025-06-15T10:00:00Z",
//             profile: "images/profile.svg", // Bob
//           },
//           {
//             id: `card-${Date.now() + 6}`,
//             title: "Gravar narração para vídeo tutorial",
//             description:
//               "Realizar a gravação da voz para o novo vídeo tutorial do produto XYZ.",
//             tags: ["Média", "Conteúdo", "Produção"],
//             date: "2025-06-05T11:00:00Z",
//             profile: "images/profile.svg", // Alice
//           },
//           {
//             id: `card-${Date.now() + 7}`,
//             title: "Testar responsividade do novo checkout",
//             description:
//               "Verificar e ajustar o layout do novo processo de checkout em diferentes dispositivos.",
//             tags: ["Alta", "QA", "Mobile"],
//             date: "2025-06-01T09:30:00Z",
//             profile: "images/profile.svg", // Ex: Eve
//           },
//         ],
//       },
//       {
//         id: "done",
//         title: "Concluído",
//         cards: [
//           {
//             id: `card-${Date.now() + 8}`,
//             title: "Publicar post sobre novas funcionalidades",
//             description:
//               "Artigo sobre as atualizações da versão 2.5 publicado no blog e redes sociais.",
//             tags: ["Baixa", "Marketing", "Conteúdo"],
//             date: "2025-05-20T17:00:00Z",
//             profile: "images/profile.svg", // Carol
//           },
//           {
//             id: `card-${Date.now() + 9}`,
//             title: "Corrigir bug de login em dispositivos móveis",
//             description:
//               "Bug #1721, reportado pela equipe de QA, foi investigado e corrigido na v2.4.1.",
//             tags: ["Alta", "Correção", "Mobile"],
//             date: "2025-05-10T12:00:00Z",
//             profile: "images/profile.svg", // Bob
//           },
//           {
//             id: `card-${Date.now() + 10}`,
//             title: "Treinamento da equipe de suporte",
//             description:
//               "Sessão de treinamento sobre as novas ferramentas de CRM concluída com a equipe.",
//             tags: ["Média", "Treinamento", "Interno"],
//             date: "2025-04-28T15:00:00Z",
//             profile: "images/profile.svg", // David
//           },
//           {
//             id: `card-${Date.now() + 11}`,
//             title: "Configurar ambiente de homologação",
//             description:
//               "Servidores e bancos de dados para o ambiente de HML foram provisionados e testados.",
//             tags: ["Alta", "Infraestrutura", "DevOps"],
//             date: "2025-03-15T18:00:00Z",
//             profile: "images/profile.svg", // Ex: Frank
//           },
//         ],
//       },
//     ],
//   },
// };
const defaultBoardData = {
  name: "school project",
  columnActive: "toDo",
  columns: [
    {
      id: "toDo",
      title: "A Fazer",
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
      ],
    },
    {
      id: "inProgress",
      title: "Em Andamento",
      cards: [
        {
          id: `card-${Date.now() + 2}`,
          title: "Desenvolver API de autenticação",
          description:
            "Criar os endpoints e a lógica para o sistema de autenticação de usuários.",
          tags: ["Alta", "Desenvolvimento", "Back-end"],
          date: "2025-06-15T10:00:00Z",
          profile: "images/profile.svg",
        },
      ],
    },
    {
      id: "done",
      title: "Concluído",
      cards: [
        {
          id: `card-${Date.now() + 3}`,
          title: "Publicar post sobre novas funcionalidades",
          description:
            "Artigo sobre as atualizações da versão 2.5 publicado no blog e redes sociais.",
          tags: ["Baixa", "Marketing", "Conteúdo"],
          date: "2025-05-20T17:00:00Z",
          profile: "images/profile.svg",
        },
      ],
    },
  ],
};

class User {
  constructor(name) {
    this.name = name;
    this.email = null;
    this.theme = "dark";

    const saveBoard = JSON.parse(localStorage.getItem("board")) || defaultBoardData;
    this.board = saveBoard;
    
  }

  addCardToColumn(columnId, card, index) {
    if (index === undefined) index = 0;
    const column = this.board.columns.find((column) => column.id === columnId);
    if (column) column.cards.splice(index, 0, card);
  }

  removeCardFromColumn(columnId, cardId) {
    const column = this.board.columns.find((column) => column.id === columnId);
    if (column)
      column.cards = column.cards.filter((card) => card.id !== cardId);
  }

  editCardToColumn(columnId, card) {
    // console.log(card);
    const column = this.board.columns.find((column) => column.id === columnId);
    if (column) {
      const cardIndex = column.cards.findIndex((c) => c.id === card.id);
      if (cardIndex !== -1) column.cards[cardIndex] = card;
      console.log(column.cards[cardIndex]);
    }
  }

  addColumn(name) {
    this.board.columns.push({
      id: `column-${Date.now()}`,
      title: name,
      cards: [],
    });
  }

  saveToLocalStorage() {
    localStorage.setItem("board", JSON.stringify(this.board));
  }

  loadFromLocalStorage() {
    const board = JSON.parse(localStorage.getItem("board"));
    if (board) this.board = board;
  }
}

class Card {
  constructor(title, description, tags, id, date) {
    this.id = id || `card-${Date.now()}`;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.date = date || new Date().toISOString();
    this.profile = "images/profile.svg";
  }

  getFormatDate() {
    return new Date(this.date).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}
