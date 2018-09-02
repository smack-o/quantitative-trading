import { isMobile } from './uaParser'

const reactChildren = children => (Array.isArray(children) ? children : [children]);

export {
  isMobile,
  reactChildren
}
