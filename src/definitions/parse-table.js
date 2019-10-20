module.exports = {
  EXP: {
    var: ['DECL', ';', '$EXP'],
    if: ['IF_STMT', '$EXP'],
    while: ['LOOP', '$EXP'],
    id: ['ATTR', ';', '$EXP'],
    print: ['PRINT_FN', ';', '$EXP'],
  },
  $EXP: {
    var: ['EXP'],
    if: ['EXP'],
    while: ['EXP'],
    id: ['EXP'],
    print: ['EXP'],
    '}': 'ɛ',
    $: 'ɛ',
  },
  DECL: {
    var: ['var', 'ATTR'],
  },
  ATTR: {
    id: ['id', '=', 'VALUE_EXP'],
  },
  VALUE_EXP: {
    '(': ['VALUE', 'ADD_OP'],
    null: ['VALUE', 'ADD_OP'],
    bool: ['VALUE', 'ADD_OP'],
    string: ['VALUE', 'ADD_OP'],
    num: ['VALUE', 'ADD_OP'],
    id: ['VALUE', 'ADD_OP'],
  },
  ADD_OP: {
    mat_op: ['mat_op', 'VALUE_EXP'],
    comp_op: ['comp_op', 'VALUE_EXP'],
    log_op: ['log_op', 'VALUE_EXP'],
    ';': 'ɛ',
    ')': 'ɛ',
  },
  VALUE: {
    '(': ['(', 'VALUE_EXP', ')'],
    null: ['null'],
    bool: ['bool'],
    string: ['string'],
    num: ['num'],
    id: ['id'],
  },
  IF_STMT: {
    if: ['if', '(', 'VALUE_EXP', ')', '{', 'EXP', '}', 'ELSE_STMT'],
  },
  ELSE_STMT: {
    else: ['else', '$ELSE_STMT'],
    var: 'ɛ',
    '}': 'ɛ',
    if: 'ɛ',
    while: 'ɛ',
    print: 'ɛ',
    $: 'ɛ',
  },
  $ELSE_STMT: {
    '{': ['{', 'EXP', '}'],
    if: ['IF_STMT'],
  },
  LOOP: {
    while: ['while', '(', 'VALUE_EXP', ')', '{', 'EXP', '}'],
  },
  PRINT_FN: {
    print: ['print', '(', 'VALUE_EXP', ')'],
  },
};
