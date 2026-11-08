export const categories = [
  { id: "academia", label: "Academia", index: "01", icon: "activity", note: "Movimento, ritmo e energia." },
  { id: "desenho", label: "Materiais de desenho", index: "02", icon: "pencil", note: "Um convite para criar sem pressa." },
  { id: "relogios", label: "Relógios", index: "03", icon: "clock", note: "Pequenos objetos que marcam o tempo." },
  { id: "perfumes", label: "Perfumes", index: "04", icon: "sparkles", note: "Memórias que começam no ar." },
];

export const products = [
  {
    id: "01", category: "academia", title: "Termogênico Abelhinha", description: "Também faz parte do combo que eu gostaria de receber junto do Diuretik Black.",
    image: "./images/products/abelhinha.jpg", alt: "Frasco do Termogênico Abelhinha 120 cápsulas", tone: "lime", imageFit: "contain", note: "parte do combo",
    url: "https://www.oficialfarma.com.br/termogenico-abelhinha-120-capsulas",
  },
  {
    id: "02", category: "academia", title: "Diuretik Black", description: "Um presente que eu gostaria de receber junto do Abelhinha, formando um combo.",
    image: "./images/products/diuretik-black.jpg", alt: "Frasco do Diuretik Black, 60 cápsulas", tone: "charcoal", imageFit: "contain", note: "parte do combo",
    url: "https://www.oficialfarma.com.br/diuretik-black",
  },
  {
    id: "03", category: "desenho", title: "Kit de desenho Faber-Castell 9000", description: "Parte do combo de desenho, junto da borracha Tombow Mono Zero e das canetas Sakura Pigma Micron.",
    image: "./images/products/kit-lapis-faber-castell.webp", alt: "Kit de desenho com lápis Faber-Castell 9000 e borrachas", tone: "paper", imageFit: "contain", note: "parte do combo",
    url: "https://www.mercadolivre.com.br/up/MLBU793545513?pdp_filters=item_id:MLB1981641218&matt_tool=38524122#origin=share&sid=share&wid=MLB1981641218&action=copy",
  },
  {
    id: "04", category: "desenho", title: "Borracha de precisão Tombow Mono Zero", description: "Parte do combo de desenho, junto do kit Faber-Castell 9000 e das canetas Sakura Pigma Micron.",
    image: "./images/products/borracha-tombow-mono-zero.jpg", alt: "Borracha Tombow Mono Zero de precisão com ponta de 2,3 milímetros", tone: "ink", imageFit: "contain", note: "parte do combo",
    url: "https://www.mercadolivre.com.br/up/MLBU733030908?pdp_filters=item_id:MLB1530736113&matt_tool=38524122#origin=share&sid=share&wid=MLB1530736113&action=copy",
  },
  {
    id: "05", category: "desenho", title: "Canetas Sakura Pigma Micron", description: "Parte do combo de desenho, junto do kit Faber-Castell 9000 e da borracha Tombow Mono Zero.",
    image: "./images/products/canetas-sakura-pigma-micron.webp", alt: "Conjunto de seis canetas Sakura Pigma Micron em diferentes espessuras", tone: "ink", imageFit: "contain", note: "parte do combo",
    url: "https://produto.mercadolivre.com.br/MLB-5478668758-canetas-fineliner-sakura-pigma-micron-02-pontos-tamanho-6-_JM",
  },
  {
    id: "06", category: "relogios", title: "Casio F-94WA-8DG", description: "Um relógio digital leve, de visual clássico.",
    image: "./images/products/casio-f94wa.png", alt: "Relógio digital preto Casio F-94WA-8DG", tone: "steel", imageFit: "contain", note: "para o agora",
    url: "https://a.co/d/05wCtIDM",
  },
  {
    id: "07", category: "relogios", title: "Timex Weekender 38 mm", description: "Mostrador simples com pulseira de tecido preta.",
    image: "./images/products/timex-weekender.png", alt: "Relógio Timex Weekender de 38 milímetros com pulseira preta", tone: "olive", imageFit: "contain", note: "para cada momento",
    url: "https://a.co/d/0gvs2mfU",
  },
  {
    id: "08", category: "relogios", title: "Casio MQ-24B-1BDF", description: "Um analógico minimalista para usar todos os dias.",
    image: "./images/products/casio-mq24b.png", alt: "Relógio analógico Casio MQ-24B-1B, com mostrador e pulseira pretos", tone: "charcoal", imageFit: "contain", note: "para guardar o tempo",
    url: "https://www.zattini.com.br/p/relogio-casio-mq24b1bdf-112-3030-006?utm_source=chatgpt.com",
  },
  {
    id: "09", category: "perfumes", title: "Egeo Blue · 90 ml", description: "Uma fragrância amadeirada e especiada.",
    image: "./images/products/egeo-blue.webp", alt: "Frasco do desodorante colônia Egeo Blue 90 ml", tone: "amber", imageFit: "contain", note: "para deixar lembrança",
    url: "https://www.boticario.com.br/produto/egeo-blue-desodorante-colonia-90ml-v2/",
  },
  {
    id: "10", category: "perfumes", title: "Kaiak Masculino · 100 ml", description: "Uma fragrância fresca e aquática.",
    image: "./images/products/kaiak-masculino.jpg", alt: "Frasco do desodorante colônia Kaiak Masculino 100 ml", tone: "blue", imageFit: "contain", note: "para começar de novo",
    url: "https://www.natura.com.br/p/desodorante-colonia-kaiak-masculino-100-ml/NATBRA-108400",
  },
  {
    id: "11", category: "perfumes", title: "Gin Tonic · Maison Viegas", description: "Uma interpretação inspirada em GNTonic, de M. Micallef.",
    image: "./images/products/gin-tonic.webp", alt: "Frasco do perfume Gin Tonic da Maison Viegas", tone: "green", imageFit: "cover", note: "para os sentidos",
    url: "https://maisonviegas.com.br/produtos/gin-tonic-inspirado-em-gntonic-m-micallef/?entry_path=category",
  },
  {
    id: "12", category: "perfumes", title: "Corsário · Maison Viegas", description: "Uma interpretação inspirada em Le Male.",
    image: "./images/products/corsario.webp", alt: "Frasco do perfume Corsário da Maison Viegas", tone: "plum", imageFit: "cover", note: "para deixar marca",
    url: "https://maisonviegas.com.br/produtos/corsario-inspirado-em-le-male/?entry_path=category",
  },
];
