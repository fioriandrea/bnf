const nonTerminalRegex = /(#[^#]*#)/g;

const randomElem = array => array[Math.floor(Math.random()*array.length)];

class Grammar {
  constructor(rules = {}) {
    this.rules = rules;
  }

  addRule(nonTerminal, rule) {
    this.rules[nonTerminal] = rule;
  }

  addRules(ruleSet) {
    this.rules = {...this.rules, ...ruleSet};
  }

  removeRule(nonTerminal) {
    delete this.data[nonTerminal];
  }

  removeRules(ruleList) {
    ruleList.forEach(e => this.removeRule(e));
  }

  reset() {
    this.rules = {};
  }

  expand(axiom) {
    let phrase = axiom;

    let splitted = phrase.split(nonTerminalRegex);
    while(splitted.length > 1) {
      splitted = splitted.map(e => {
        if(nonTerminalRegex.test(e)) {
          let subRule = this.rules[e];
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
  }
}
