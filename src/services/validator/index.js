const checkForCloseMatch = (longString, shortString) => {
  // too many false positives with very short strings
  if (shortString.length < 3) return "";

  // test if the shortString is in the string (so everything is fine)
  if (longString.includes(shortString)) return "";

  // split the shortString string into two at each postion e.g. g|mail gm|ail gma|il gmai|l
  // and test that each half exists with one gap
  for (let i = 1; i < shortString.length; i++) {
    const firstPart = shortString.substring(0, i);
    const secondPart = shortString.substring(i);

    // test for wrong letter
    const wrongLetterRegEx = new RegExp(
      `${firstPart}.${secondPart.substring(1)}`
    );
    if (wrongLetterRegEx.test(longString)) {
      return longString.replace(wrongLetterRegEx, shortString);
    }

    // test for extra letter
    const extraLetterRegEx = new RegExp(`${firstPart}.${secondPart}`);
    if (extraLetterRegEx.test(longString)) {
      return longString.replace(extraLetterRegEx, shortString);
    }

    // test for missing letter
    if (secondPart !== "mail") {
      const missingLetterRegEx = new RegExp(`${firstPart}{0}${secondPart}`);
      if (missingLetterRegEx.test(longString)) {
        return longString.replace(missingLetterRegEx, shortString);
      }
    }

    // test for switched letters
    const switchedLetters = [
      shortString.substring(0, i - 1),
      shortString.charAt(i),
      shortString.charAt(i - 1),
      shortString.substring(i + 1),
    ].join("");

    if (longString.includes(switchedLetters)) {
      return longString.replace(switchedLetters, shortString);
    }
  }

  // if nothing was close, then there wasn't a typo
  return "";
};

const checkForDomainTypo = (email) => {
  const domains = [
    "gmail",
    "hotmail",
    "outlook",
    "yahoo",
    "icloud",
    "mail",
    "zoho",
  ];
  const [leftPart, rightPart] = email.split("@");

  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i];

    const result = checkForCloseMatch(rightPart, domain);

    if (result) return `${leftPart}@${result}`;
  }

  return "";
};

const checkForCommonTypos = (input) => {
  const commonTypos = [
    {
      pattern: /,com$/,
      fix: (str) => str.replace(/,com$/, ".com"),
    },
    {
      pattern: /,co\.\w{2}$/,
      fix: (str) => str.replace(/,(co\.\w{2}$)/, ".$1"),
    },
    {
      pattern: /@\w*$/,
      fix: (str) => str + ".com",
    },
  ];

  typo = commonTypos.find((typo) => typo.pattern.test(input));

  if (typo) return typo.fix(input);

  return "";
};

const checkTypo = (input) => {
  const email = input.email.trim().toLowerCase();

  return checkForCommonTypos(email) || checkForDomainTypo(email);
};

const MailValidator = (opts) => {
  if (opts !== {}) {
    let suggestedEmail = checkTypo(opts);
    return suggestedEmail;
  }
};

export default MailValidator;
