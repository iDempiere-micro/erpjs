import { max } from './max';
import { min } from './min';

export function between(val: any, args: any) {
    return min(val, [args[0]]) && max(val, [args[1]]);
}
