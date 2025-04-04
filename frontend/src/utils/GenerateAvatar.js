// const generateDiceBearAvataaars = (seed) =>
//   `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;

// const generateDiceBearBottts = (seed) =>
//   `https://avatars.dicebear.com/api/bottts/${seed}.svg`;

// const generateDiceBearGridy = (seed) =>
//   `https://avatars.dicebear.com/api/gridy/${seed}.svg`;

// export const generateAvatar = () => {
//   const data = [];

//   for (let i = 0; i < 2; i++) {
//     const res = generateDiceBearAvataaars(Math.random());
//     data.push(res);
//   }
//   for (let i = 0; i < 2; i++) {
//     const res = generateDiceBearBottts(Math.random());
//     data.push(res);
//   }
//   for (let i = 0; i < 2; i++) {
//     const res = generateDiceBearGridy(Math.random());
//     data.push(res);
//   }
//   return data;
// };
export const generateAvatar = () => {
  return [
    "/avatars/avatar1.jpeg",
    "/avatars/avatar2.jpeg"
  ];
};

// export const generateAvatar = () => {
//   const data = [];

//   // You want to push 6 avatars just like before
//   for (let i = 0; i < 6; i++) {
//     // Randomly choose img1 or img2
//     const randomImage = Math.random() < 0.5 ? img1 : img2;
//     data.push(randomImage);
//   }

//   return data;
// };
