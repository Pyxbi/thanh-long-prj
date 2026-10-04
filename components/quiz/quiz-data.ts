export type AnswerColor = "red" | "white" | "yellow";

// Using strings instead of imports for easy asset replacement later
const heroImg = "/images/quiz-hero-bg.png";
const redImg = "/images/result-red.jpg";
const whiteImg = "/images/result-white.jpg";
const yellowImg = "/images/result-yellow.jpg";

const redMascot = { url: "/images/mascot-red.png" };
const whiteMascot = { url: "/images/mascot-white.png" };
const yellowMascot = { url: "/images/mascot-yellow.png" };
const redChart = { url: "/images/chart-red.png" };
const whiteChart = { url: "/images/chart-white.png" };
const yellowChart = { url: "/images/chart-yellow.png" };

// TODO: Replace all images with final Long Gia quiz artwork
export const images = { hero: heroImg, red: redImg, white: whiteImg, yellow: yellowImg };

export const questions: {
  q: string;
  image: string;
  imageAlt: string;
  answers: Record<AnswerColor, string>;
}[] = [
  {
    q: "Buổi sáng của bạn bắt đầu thế nào?",
    image: heroImg,
    imageAlt: "Vườn thanh long lúc bình minh",
    answers: {
      red: "Bật dậy, tràn năng lượng, làm liền một mạch",
      white: "Từ từ, một tách trà/nước ấm, tĩnh tâm trước khi vào việc",
      yellow: "Ngủ nướng thêm chút, rồi tận hưởng bữa sáng thật ngon",
    },
  },
  {
    q: "Giữa một ngày bận rộn, bạn ‘sạc pin’ bằng cách nào?",
    image: redImg,
    imageAlt: "Nước ép thanh long đỏ tươi mát",
    answers: {
      red: "Vận động, ra ngoài, đổi không khí",
      white: "Vài phút yên tĩnh một mình, hít thở sâu",
      yellow: "Một món ngọt/ngon nho nhỏ tự thưởng cho mình",
    },
  },
  {
    q: "Với bạn, một ngày ‘trọn vẹn’ nghĩa là gì?",
    image: whiteImg,
    imageAlt: "Thanh long trắng và tách trà",
    answers: {
      red: "Làm được nhiều việc, chinh phục mục tiêu",
      white: "Cân bằng, không có gì phải hối tiếc",
      yellow: "Có khoảnh khắc thật vui, thật đáng nhớ",
    },
  },
  {
    q: "Cuối ngày, bạn thường...",
    image: yellowImg,
    imageAlt: "Bạn bè quây quần bên thanh long vàng",
    answers: {
      red: "Vẫn còn năng lượng, lên kế hoạch cho ngày mai",
      white: "Ngồi lại, tổng kết nhẹ nhàng những gì đã qua",
      yellow: "Quây quần cùng người thân/bạn bè, cười thật nhiều",
    },
  },
  {
    q: "Nếu ví bản thân là một ly nước ép thanh long, bạn muốn nó...",
    image: redImg,
    imageAlt: "Ly nước ép thanh long",
    answers: {
      red: "Đậm đà, rực rỡ, ai nhìn cũng ấn tượng",
      white: "Thanh mát, nhẹ nhàng, dễ chịu",
      yellow: "Ngọt ngào, hiếm có, khiến người ta nhớ mãi",
    },
  },
];

export const results: Record<
  AnswerColor,
  { title: string; desc: string; image: string }
> = {
  red: {
    title: "LONG ĐỎ — NGƯỜI SỐNG RỰC RỠ",
    desc: "Bạn luôn tràn đầy năng lượng, yêu đời và không ngại thử thách. Một trái thanh long đỏ ngọt ngào là người bạn đồng hành lý tưởng giúp bạn giữ vững tinh thần và lan toả năng lượng tích cực mỗi ngày.",
    image: redImg,
  },
  yellow: {
    title: "LONG VÀNG — NGƯỜI SỐNG ẤM ÁP",
    desc: "Bạn mang nguồn năng lượng ấm áp, lạc quan và luôn biết cách tận hưởng những điều nhỏ bé trong cuộc sống. Một trái thanh long vàng nhỏ nhắn dễ mang theo hàng ngày sẽ giúp bạn lan toả sự vui vẻ đến mọi người xung quanh.",
    image: yellowImg,
  },
  white: {
    title: "LONG TRẮNG — NGƯỜI SỐNG CHILL",
    desc: "Bạn yêu sự bình yên, tinh tế và luôn biết cách cân bằng giữa những bộn bề thường ngày. Một trái thanh long trắng sẽ giúp bạn tìm lại khoảng lặng, nạp đầy năng lượng và tận hưởng từng khoảnh khắc theo cách riêng.",
    image: whiteImg,
  },
};

export const colorLabel: Record<AnswerColor, string> = {
  red: "Đỏ",
  white: "Trắng",
  yellow: "Vàng",
};

/** Assets and copy for the reusable, square result share card. */
export const shareCards: Record<AnswerColor, {
  mascot: string;
  chart: string;
  name: string;
  subtitle: string;
  tags: string[];
  archetype: string;
  initials: string;
  percentage: string;
  metric: string;
  luckyItem: string;
}> = {
  red: {
    mascot: redMascot.url, chart: redChart.url,
    name: "LONG ĐỎ", subtitle: "Người Sống Rực Rỡ",
    tags: ["#SốngRựcRỡ", "#DámThửThách"],
    archetype: "Người Bứt Phá", initials: "N-T-K",
    percentage: "95%", metric: "Mức năng lượng rực rỡ",
    luckyItem: "Giày chạy bộ",
  },
  white: {
    mascot: whiteMascot.url, chart: whiteChart.url,
    name: "LONG TRẮNG", subtitle: "Người Sống Chill",
    tags: ["#SốngChill", "#BìnhYênTinhTế"],
    archetype: "Người Tĩnh Tâm", initials: "B-T-C",
    percentage: "90%", metric: "Mức thư thái mỗi ngày",
    luckyItem: "Tách trà ấm",
  },
  yellow: {
    mascot: yellowMascot.url, chart: yellowChart.url,
    name: "LONG VÀNG", subtitle: "Người Sống Ấm Áp",
    tags: ["#SốngẤmÁp", "#TậnHưởngĐiềuNhỏ"],
    archetype: "Mặt trời nhỏ", initials: "A-L-V",
    percentage: "99%", metric: "Mức vui vẻ mỗi ngày",
    luckyItem: "Hộp bánh nhỏ",
  },
};

/** Most-picked color wins; ties resolved by question 5's answer. */
export function calcResult(answers: AnswerColor[]): AnswerColor {
  const counts = { red: 0, white: 0, yellow: 0 };
  answers.forEach((a) => counts[a]++);
  const max = Math.max(...Object.values(counts));
  const top = (Object.keys(counts) as AnswerColor[]).filter((c) => counts[c] === max);
  return top.length === 1 ? (top[0] ?? "red") : (answers[4] ?? "red");
}
