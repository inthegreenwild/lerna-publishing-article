import randomNumber from "../../spc-random-number/lib/";
import randomPhrase from "../../spc-random-phrase/lib/";

export default function fortuneTeller() {
  let luckyNumbers = [];
  for (let i = 0; i < 5; i++) {
    luckyNumbers.push(randomNumber());
  }

  console.log("Your fortune: \n" + randomPhrase() + "\n");
  console.log("Your winning lottery numbers: \n" + luckyNumbers);
}

fortuneTeller();
