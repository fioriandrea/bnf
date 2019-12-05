const rules = {
  "assign": "#id# = #expr#",
  "expr": ["#id# + #expr#", "#id# * #expr#", "#id# / #expr#", "#id# - #expr#", "#id#", "(#expr#)"],
  "id": ["a", "b", "c", "d", "e", "f", "g"],
};

const nonTerminalRegex = /#([^#]*)#/g;

const maxCalls = 10000;

const randomElem = array => array[Math.floor(Math.random()*array.length)];

const randomPhrase = (axiom, n = 0) => {
  if(n > maxCalls) return axiom.replace(/#.*#/g, "");

  const callback = match => {
    const nonTerminal = match.replace(/#/g, "");
    return randomPhrase(nonTerminal, n + 1);
  };

  if(!rules[axiom]) {
    return axiom.replace(nonTerminalRegex, callback);
  }

  const rule = rules[axiom];
  if(Array.isArray(rule)) {
    const subRule = randomElem(rule);
    return randomPhrase(subRule, n + 1);
  }
  else {
    return rule.replace(nonTerminalRegex, callback);
  }
}
