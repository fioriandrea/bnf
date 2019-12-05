//Rules and non-terminals go always between #
//(e.g "#rule#": "#rule# terminal",)

const rules = {
  "#phrase#": ["#comp-noun# #is-stat#", "#phrase# #that-clause# #is-stat#"],
  "#comp-noun#": "#art# #noun#",
  "#is-stat#": "#be# #comp-noun#",
  "#be#": ["is", "is not", "isn't"],
  "#that-clause#": ["that", ", which"],
  "#art#": "a",
  "#noun#": ["cat", "dog", "monkey", "mouse", "computer", "human"],

  /*"#assign#": "#id# = #expr#",
  "#expr#": ["#id# + #expr#", "#id# * #expr#", "#id# / #expr#", "#id# - #expr#", "#id#", "(#expr#)"],
  "#id#": ["a", "b", "c", "d", "e", "f", "g"],*/
};

const nonTerminalRegex = /#([^#]*)#/g;

const randomElem = array => array[Math.floor(Math.random()*array.length)];

const randomPhrase = axiom => {
  const callback = nonTerminal => {
    return randomPhrase(nonTerminal);
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
