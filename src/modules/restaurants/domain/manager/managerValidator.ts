import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

export const managerValidator = (props: any) => {
  const validation = Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.String(),
    email: Type.String(),
    phone: Type.String(),
    role: Type.Literal('manager'),
    createdAt: Type.Optional(Type.Date()),
    updatedAt: Type.Optional(Type.Date())
  });
  return Value.Parse(validation, props);
};
