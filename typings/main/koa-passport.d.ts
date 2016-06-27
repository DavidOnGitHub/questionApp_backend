declare module "koa-passport" {
  
  namespace passport {
    export interface IPassport {
        initialize(): any
    }
  }
  
  const passport;
  export = passport;
}