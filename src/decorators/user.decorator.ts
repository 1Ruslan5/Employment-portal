import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export  const User = createParamDecorator((data: any, ctx: ExecutionContext) =>{
  const request = ctx.switchToHttp().getRequest();

  if(!request.data.user) {
    return null
  }

  if(data) {
    return request.data.user[data]
  }
  console.log(request.data);
  return request.data.user
})