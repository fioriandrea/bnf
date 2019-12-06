//Rules and non-terminals go always between #
//(e.g "#rule#": "#rule# terminal",)

const rules = {
  "#axiom#": "[#expr# | #member-list#, #compare-list#]",

  "#expr#": ["#operand# #operation# #expr#", "#operand#", "(#expr#)"],
  "#operand#": ["#id#", "#num#"],
  "#operation#": ["+", "*", "-", "/"],
  "#char#": ["a", "b", "c", "d", "e", "f", "g"],
  "#id#": ["#char##id#", "#char#"],
  "#num#": ["#non-zero##num#", "0", "#non-zero#"],
  "#non-zero#": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],

  "#member-list#": ["#member#, #member-list#", "#member#"],
  "#member#": "(#id-list#) <- #id#",
  "#id-list#": ["#id#, #id-list#", "#id#"],
  "#compare-list#": ["#compare#, #compare-list#", "#compare#"],
  "#compare#": "#expr# #comp-op# #expr#",
  "#comp-op#": ["==", ">=", "<=", "/="],
};


  /*"#phrase#": ["#comp-noun# #is-stat#", "#phrase# #that-clause# #is-stat#"],
  "#comp-noun#": "#art# #noun#",
  "#is-stat#": "#be# #comp-noun#",
  "#be#": ["is", "is not", "isn't"],
  "#that-clause#": ["that", ", which"],
  "#art#": "a",
  "#noun#": ["cat", "dog", "monkey", "mouse", "computer", "human"],*/

const nonTerminalRegex = /(#[^#]*#)/g;

const randomElem = array => array[Math.floor(Math.random()*array.length)];

const expand = axiom => {
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

const recursiveExpand = axiom => {
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
