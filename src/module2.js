// 1.
import {name,sayHello} from 'module1';
console.log(name);
sayHello();
// 2
import course from 'module1';
console.log(course());
// 3
import * as mod1 from 'module1';//把所有的引用过来
console.log(mod1);

