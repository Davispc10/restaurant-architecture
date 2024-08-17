import { Value } from '@sinclair/typebox/value';
import { Type } from '@sinclair/typebox';

export const restaurantValidator = (props: any) => {
  const validation = Type.Object({
    id: Type.Optional(Type.String()),
    name: Type.String(),
    description: Type.Optional(Type.String()),
    managerId: Type.Optional(Type.String()),
    createdAt: Type.Optional(Type.Date()),
    updatedAt: Type.Optional(Type.Date())
  });
  return Value.Parse(validation, props);
};
