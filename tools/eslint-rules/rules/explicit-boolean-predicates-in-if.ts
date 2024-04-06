import { ESLintUtils, TSESTree } from '@typescript-eslint/experimental-utils';

export const RULE_NAME = 'explicit-boolean-predicates-in-if';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce explicit boolean predicates in if statements',
      recommended: 'warn',
    },
    fixable: 'code',
    schema: [],
    messages: {
      nonExplicitPredicate:
        'Use an explicit boolean predicate in if statements.',
    },
  },
  defaultOptions: [],
  create: (context) => {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();

    return {
      IfStatement: (node: TSESTree.IfStatement) => {
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.test);
        const type = typeChecker.getTypeAtLocation(tsNode);

        if (typeChecker.typeToString(type) !== 'boolean') {
          const { test } = node;

          context.report({
            node: test,
            messageId: 'nonExplicitPredicate',
          });
        }
      },
    };
  },
});

export default rule;
