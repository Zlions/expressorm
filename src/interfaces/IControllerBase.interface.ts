import { Router } from 'express';

interface IControllerBase {
    router: Router;
    path: string;
}

export default IControllerBase;
