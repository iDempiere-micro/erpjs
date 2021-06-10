import { min } from './min';
import { max } from './max';

export function between(val: any, args: any) {
    return min(val, [args[0]]) && max(val, [args[1]]);
}
