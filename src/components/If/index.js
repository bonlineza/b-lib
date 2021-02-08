/** @format */

type IfProps = {
  /** evaluate this expression */
  condition: boolean,
  /** the jsx children to render if the condition evaluates to TRUE */
  children: any,
};

/**
 * Checks if condition passes and renders React children
 */
const If = ({ condition, children }: IfProps) => (condition ? children : null);

export default If;
