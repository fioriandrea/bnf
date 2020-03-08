//Rules and non-terminals go always between #
//(e.g "#rule#": "#rule# terminal",)

const nonTerminalRegex = /(#[^#]*#)/g;

const randomElem = array => array[Math.floor(Math.random()*array.length)];

const expand = (rules, axiom) => {
  let phrase = axiom;

  let splitted = phrase.split(nonTerminalRegex);
  while(splitted.length > 1) {
    splitted = splitted.map(e => {
      if(nonTerminalRegex.test(e)) {
        let subRule = rules[e];
        if(Array.isArray(subRule)) {
          subRule = randomElem(subRule);
        }
        return subRule;
      }
      else {
        return e;
      }
    });

    phrase = splitted.join("");
    splitted = phrase.split(nonTerminalRegex);
  }

  return phrase;
};

const recursiveExpand = (rules, axiom) => {
  const callback = nonTerminal => {
    return recursiveExpand(nonTerminal);
  };

  if(!rules[axiom]) { // phrase with nonterminal in or terminal phrase
    return axiom.replace(nonTerminalRegex, callback);
  }

  const rule = rules[axiom];
  if(Array.isArray(rule)) {
    const subRule = randomElem(rule);
    return subRule.replace(nonTerminalRegex, callback);
  }
  else {
    return rule.replace(nonTerminalRegex, callback);
  }
}
