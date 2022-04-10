
import { parse } from 'regexparam';

import routes from './routes.mjs';

const routeMatchers = new Map();
for (const [routeName, expressRoute] of routes) {
    const regExp = parse(expressRoute).pattern;
    const matcher = ({ url }) => regExp.exec(url.pathname);
    routeMatchers.set(routeName, matcher);
}

export default routeMatchers;