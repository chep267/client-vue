/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { UserInfo } from 'firebase/auth';

declare global {
    namespace App {
        namespace ModuleUser {
            namespace Data {
                type User = UserInfo;
            }
        }
    }
}
