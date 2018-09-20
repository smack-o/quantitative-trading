import { isMobile } from './uaParser'

const reactChildren = children => (Array.isArray(children) ? children : [children]);
const loginRouters = ['/signup', '/signin', '/reset']
export {
  isMobile,
  reactChildren,
  loginRouters
};
