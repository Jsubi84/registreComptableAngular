import { inject } from "@angular/core";
import { CookieManagerService } from "../service/cookies-manager-service.service";
CookieManagerService

export const loginGuard = () => {
    const cookiesServices = inject(CookieManagerService);
    return (cookiesServices.checkSessionToken())? true: false;
}