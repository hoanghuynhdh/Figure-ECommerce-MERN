import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Huy Hoang",
      email: "admin@asd.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Hoang Huy",
      email: "user@asd.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Action Figure 01",
      category: "Action Figure",
      pathCategory: "ActionFigure",
      image: [
        "/template/images/actionfigure/kirito1.jpg",
        "/template/images/actionfigure/kirito2.jpg",
        "/template/images/actionfigure/kirito3.jpg",
      ],
      price: 1200000,
      countInStock: 10,
      rating: 4.5,
      description: "high quality product",
    },
    {
      name: "Action Figure 02",
      category: "Action Figure",
      pathCategory: "ActionFigure",
      image: [
        "/template/images/actionfigure/shiro1.jpg",
        "/template/images/actionfigure/shiro2.jpg",
        "/template/images/actionfigure/shiro3.jpg",
      ],
      price: 1000000,
      countInStock: 20,
      rating: 4.0,
      description: "high quality product",
    },
    {
      name: "Action Figure 03",
      category: "Action Figure",
      pathCategory: "ActionFigure",
      image: [
        "/template/images/actionfigure/natsu1.jpg",
        "/template/images/actionfigure/natsu2.jpg",
        "/template/images/actionfigure/natsu3.jpg",
      ],
      price: 2200000,
      countInStock: 0,
      rating: 4.8,
      description: "high quality product",
    },
    {
      name: "Chibi Figure 01",
      category: "Chibi Figure",
      pathCategory: "ChibiFigure",
      image: [
        "/template/images/chibifigure/aqua1.jpg",
        "/template/images/chibifigure/aqua2.jpg",
        "/template/images/chibifigure/aqua3.jpg",
      ],
      price: 780000,
      countInStock: 15,
      rating: 4.5,
      description: "high quality product",
    },
    {
      name: "Chibi Figure 02",
      category: "Chibi Figure",
      pathCategory: "ChibiFigure",
      image: [
        "/template/images/chibifigure/sasuke1.jpg",
        "/template/images/chibifigure/sasuke2.jpg",
        "/template/images/chibifigure/sasuke3.jpg",
      ],
      price: 650000,
      countInStock: 5,
      rating: 4.5,
      description: "high quality product",
    },
    {
      name: "Chibi Figure 03",
      category: "Chibi Figure",
      pathCategory: "ChibiFigure",
      image: [
        "/template/images/chibifigure/miku1.jpg",
        "/template/images/chibifigure/miku2.jpg",
        "/template/images/chibifigure/miku3.jpg",
      ],
      price: 1390000,
      countInStock: 12,
      rating: 4.5,
      description: "high quality product",
    },
    {
      name: "Manga 01",
      category: "Manga",
      pathCategory: "Manga",
      image: [
        "/template/images/manga/m1.jpg",
        "/template/images/manga/m1.jpg",
        "/template/images/manga/m1.jpg",
      ],
      price: 1390000,
      countInStock: 6,
      rating: 4.5,
      description: "high quality product",
    },
    {
      name: "Manga 02",
      category: "Manga",
      pathCategory: "Manga",
      image: [
        "/template/images/manga/m2.jpg",
        "/template/images/manga/m3.jpg",
        "/template/images/manga/m4.jpg",
      ],
      price: 139000,
      countInStock: 11,
      rating: 4.5,
      description: "high quality product",
    },
    {
      name: "Manga 03",
      category: "Manga",
      pathCategory: "Manga",
      image: ["/template/images/manga/m5.jpg", "/template/images/manga/m6.jpg"],
      price: 139000,
      countInStock: 9,
      rating: 4.5,
      description: "high quality product",
    },
  ],
  categories: [
    {
      name: "Action Figure",
    },
    {
      name: "Chibi Figure",
    },
    {
      name: "Manga",
    },
  ],
};
export default data;
