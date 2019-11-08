import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLScalarType, Kind } from 'graphql';

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: string): Date {
    return new Date(value); // value from the client
  }

  serialize(value: any): string {
    function toISO(d: Date) {
      return d.toISOString().substring(0,10);
    }
    if (value.toISOString) {
      return toISO(value); // value sent to the client
    } else {
      return toISO(new Date(value));
    }
  }

  parseLiteral(ast: any): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
}

export const DateTimeScalarType = new GraphQLScalarType({
  name: 'DateTime',
  parseValue(value: number): Date {
    return new Date(value); // value from the client
  },

  serialize(value: any): number {
    function toNumber(d: Date) {
      return d.getTime();
    }

    if (value.getTime) {
      return toNumber(value); // value sent to the client
    } else {
      return toNumber(new Date(value));
    }
  },

  parseLiteral(ast: any): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
});
