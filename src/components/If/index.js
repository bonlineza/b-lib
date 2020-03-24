type IfProps = {
  condition: boolean,
  children: any,
};

/**
 * Checks if condition passes and renders React children
 */
export default ({ condition, children }: IfProps) =>
  condition ? children : null;
