# BNF Phrase Generator

This is a simple piece of code which generates random phrases of a given context-free grammar. bnf.js contains functions which accomplish what stated above.
grammar.js contains a class that does the same thing.

## Grammar Specification

The grammar is specified through a JavaScript object.
Non-Terminals are strings in between #'s (e.g. "#axiom#", "#expr#" etc.).
Terminals are represented by strings (also, they cannot be in between #'s) (e.g. +, /, "hello", "1", "2", "123.234" etc.).
Choice is indicated with an array (e.g. axiom -> expr | 'hello' is represented with "#axiom#": ["#expr#", "hello"]).
A simple grammar is given below:

```js
/*
    phrase -> comp-noun is-stat | phrase that-clause is-stat
    comp-noun -> art noun
    is-stat -> be comp-noun
    be -> 'is' | 'is not'
    that-clause -> 'that' | 'which'
    art -> 'a'
    noun -> 'cat' | 'dog' | 'monkey' | 'mouse' | 'computer' | 'human'

    (Terminals in-between '')
*/
const rules = {
    "#phrase#": ["#comp-noun# #is-stat#", "#phrase# #that-clause# #is-stat#"],
    "#comp-noun#": "#art# #noun#",
    "#is-stat#": "#be# #comp-noun#",
    "#be#": ["is", "is not", "isn't"],
    "#that-clause#": ["that", ", which"],
    "#art#": "a",
    "#noun#": ["cat", "dog", "monkey", "mouse", "computer", "human"],
};
```

## Usage example

Usage of the class:

```js
// An Haskell-like list comprehension grammar
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

const grammar = new Grammar(rules);
console.log(grammar.expand("#axiom#"));
console.log(grammar.expand("#member#"));
```

Usage of the functions:

```js
const rules = {
    "#phrase#": ["#comp-noun# #is-stat#", "#phrase# #that-clause# #is-stat#"],
    "#comp-noun#": "#art# #noun#",
    "#is-stat#": "#be# #comp-noun#",
    "#be#": ["is", "is not", "isn't"],
    "#that-clause#": ["that", ", which"],
    "#art#": "a",
    "#noun#": ["cat", "dog", "monkey", "mouse", "computer", "human"],
};

console.log(expand(rules, "#axiom#"));
console.log(recursiveExpand(rules, "#axiom#"));
```
