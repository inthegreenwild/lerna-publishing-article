export default function randomPhrase() {
  const phrases = [
    "You are very lucky today",
    "Yikes...Let's get that will sorted out soon!",
    "The air is still..."
  ];
  const randomNumber = Math.floor(Math.random() * 3);

  return phrases[randomNumber];
}
